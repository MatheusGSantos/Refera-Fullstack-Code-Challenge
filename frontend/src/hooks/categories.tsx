import React, { createContext, useCallback, useState, useContext, useMemo } from 'react';
import { toast } from 'react-toastify';
import { ApiService } from '~/services/ApiService';
import { ICategory } from '~/utils/Category/CategoryDTOS';

interface CategoriesContextData {
  categories: ICategory[];
  fetchCategories: () => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextData>({} as CategoriesContextData);

const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const api = new ApiService();

  const fetchCategories = useCallback(async () => {
    const id = toast.loading('Fetching categories...');
    try {
      const { results } = await api.getCategories();

      setCategories(results);
      toast.update(id, {
        render: 'Categories fetched successfully',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err: any) {
      toast.update(id, {
        render: `Error: ${err?.response?.data?.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 4000,
        hideProgressBar: false,
      });
    }
  }, []);

  return (
    <CategoriesContext.Provider
      value={useMemo(() => ({ categories, fetchCategories }), [categories, fetchCategories])}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

function useCategories(): CategoriesContextData {
  const context = useContext(CategoriesContext);

  return context;
}

export { CategoriesProvider, useCategories };
