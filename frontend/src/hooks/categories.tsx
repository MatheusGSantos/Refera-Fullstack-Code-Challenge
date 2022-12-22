import React, { createContext, useCallback, useState, useContext, useMemo } from 'react';
import { toast } from 'react-toastify';
import { ApiService } from '~/services/ApiService';
import { ICategory } from '~/utils/Category/CategoryDTOS';
import { useAppLoading } from './appLoading';

interface CategoriesContextData {
  categories: ICategory[];
  fetchCategories: () => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextData>({} as CategoriesContextData);

const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { appLoading, markAsLoaded } = useAppLoading();
  const api = useMemo(() => new ApiService(), []);

  const fetchCategories = useCallback(async () => {
    const id = toast.loading('Fetching categories...');
    try {
      const { results } = await api.getCategories();

      setCategories((prev) => {
        appLoading && markAsLoaded('CategoryList');
        return [...prev, ...results];
      });
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
  }, [api, appLoading, markAsLoaded]);

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
