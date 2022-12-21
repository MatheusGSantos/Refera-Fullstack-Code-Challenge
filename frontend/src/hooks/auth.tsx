import React, { createContext, useCallback, useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '../utils/localStorageUtils';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials, rememberMe: boolean): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<AuthState>(() => {
    const token = getLocalStorageItem('token');
    const user = getLocalStorageItem('user');

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    removeLocalStorageItem('token');
    removeLocalStorageItem('user');

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials, rememberMe: boolean) => {
      const id = toast.loading('Submitting...');
      try {
        const response = await api.post('/login', {
          email,
          password,
        });

        const { user, token } = response.data;

        if (rememberMe) {
          setLocalStorageItem('token', token);
          setLocalStorageItem('user', user);
        }

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        setData({ token, user });
        toast.update(id, {
          render: 'Logged in successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        window.location.pathname === '/login' && navigate('/');
      } catch (err: any) {
        toast.update(id, {
          render: `Error: ${err?.response?.data?.message}`,
          type: 'error',
          isLoading: false,
          autoClose: 4000,
          hideProgressBar: false,
        });
      }
    },
    [navigate],
  );

  const updateUser = useCallback(
    (user: User) => {
      setLocalStorageItem('user', user);

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({ user: data.user, signIn, signOut, updateUser }),
        [data.user, signIn, signOut, updateUser],
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
