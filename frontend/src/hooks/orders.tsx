import React, { createContext, useCallback, useState, useContext, useMemo } from 'react';
import { toast } from 'react-toastify';
import { ApiService } from '~/services/ApiService';
import { IOrder } from '~/utils/Order/OrderDTOS';

interface OrdersContextData {
  orders: IOrder[];
  fetchOrders: () => Promise<void>;
}

const OrdersContext = createContext<OrdersContextData>({} as OrdersContextData);

const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const api = new ApiService();

  const fetchOrders = useCallback(async () => {
    const id = toast.loading('Fetching orders...');
    try {
      const { results } = await api.getOrders();

      setOrders(results);
      toast.update(id, {
        render: 'Orders fetched successfully',
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
    <OrdersContext.Provider value={useMemo(() => ({ orders, fetchOrders }), [orders, fetchOrders])}>
      {children}
    </OrdersContext.Provider>
  );
};

function useOrders(): OrdersContextData {
  const context = useContext(OrdersContext);

  return context;
}

export { OrdersProvider, useOrders };
