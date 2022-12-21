import React, { useState, useEffect } from 'react';

// import { ApiService } from '../../services/ApiService';

import { Container } from './styles';
import EnhancedTable from '~/components/Table';
// import EnhancedTable from '~/components/Table/table2';
import { OrderData, orderHeadCells } from '~/utils/Order/OrderTableDetails';
import { Button } from '@mui/material';
import { ApiService } from '~/services/ApiService';

// const cardContentList = [
//   {
//     id: '1',
//     description: 'bla',
//     image: 'vasd',
//     price: 'fafdas',
//     title: 'aaa',
//     seller: 'asdfas',
//   },
//   {
//     id: '2',
//     description: 'bla',
//     image: 'vasd',
//     price: 'fafdas',
//     title: 'aaa',
//     seller: 'asdfas',
//   },
//   {
//     id: '3',
//     description: 'bla',
//     image: 'vasd',
//     price: 'fafdas',
//     title: 'aaa',
//     seller: 'asdfas',
//   },
// ];

const rows = [
  {
    id: 20,
    category: 'category',
    contact: 'contact',
    agency: 'agency',
    company: 'company',
    deadline: '2021-12-12',
  },
  {
    id: 21,
    category: 'category',
    contact: 'contact',
    agency: 'agency',
    company: 'company',
    deadline: '2021-12-12',
  },
  {
    id: 22,
    category: 'category',
    contact: 'contact',
    agency: 'agency',
    company: 'company',
    deadline: '2021-12-12',
  },
];

export function Home() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState<OrderData[]>([]);

  const api = new ApiService();

  useEffect(() => {
    const fetchOrders = async (): Promise<void> => {
      const getOrdersResult = await api.getOrders();

      if (getOrdersResult) {
        console.info(getOrdersResult);
        setOrders(getOrdersResult.results);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container>
      <section>
        <Button variant='contained' size='small'>
          Open New Order
        </Button>
        <EnhancedTable />
      </section>
    </Container>
  );
}
