import React from 'react';
import { AuthProvider } from './auth';
import { ScrollProvider } from './scroll';
import { CategoriesProvider } from './categories';
import { OrdersProvider } from './orders';
import { AppLoadingProvider } from './appLoading';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AppLoadingProvider>
      <CategoriesProvider>
        <OrdersProvider>
          <AuthProvider>
            <ScrollProvider>{children}</ScrollProvider>
          </AuthProvider>
        </OrdersProvider>
      </CategoriesProvider>
    </AppLoadingProvider>
  );
}
