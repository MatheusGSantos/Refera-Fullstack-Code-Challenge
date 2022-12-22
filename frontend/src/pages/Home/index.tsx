import { useEffect } from 'react';
import { Container } from './styles';
import EnhancedTable from '~/components/Table';
import { Button } from '@mui/material';
import { useAppLoading } from '~/hooks/appLoading';
import { useCategories } from '~/hooks/categories';
import { useOrders } from '~/hooks/orders';

export function Home() {
  const { fetchCategories } = useCategories();
  const { fetchOrders } = useOrders();
  const { appLoading } = useAppLoading();

  useEffect(() => {
    if (appLoading) {
      fetchCategories();
      fetchOrders();
    }
  }, [appLoading, fetchCategories, fetchOrders]);

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
