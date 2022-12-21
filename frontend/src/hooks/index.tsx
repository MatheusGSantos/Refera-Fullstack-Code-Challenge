import React from 'react';
import { AuthProvider } from './auth';
import { ScrollProvider } from './scroll';
import { CategoriesProvider } from './categories';
import { OrdersProvider } from './orders';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <OrdersProvider>
      <CategoriesProvider>
        <AuthProvider>
          <ScrollProvider>{children}</ScrollProvider>
        </AuthProvider>
      </CategoriesProvider>
    </OrdersProvider>
  );
}
