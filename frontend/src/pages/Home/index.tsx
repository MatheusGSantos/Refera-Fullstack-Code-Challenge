import { useEffect, useState } from 'react';
import { Container } from './styles';
import EnhancedTable from '~/components/Table';
import { Button } from '@mui/material';
import { useAppLoading } from '~/hooks/appLoading';
import { useCategories } from '~/hooks/categories';
import { useOrders } from '~/hooks/orders';
import { OpenNewOrderModal } from '~/components/Modal';

export function Home() {
  const { fetchCategories } = useCategories();
  const { fetchOrders } = useOrders();
  const { appLoading } = useAppLoading();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (appLoading) {
      fetchCategories();
      fetchOrders();
    }
  }, [appLoading, fetchCategories, fetchOrders]);

  return (
    <Container>
      <section>
        <Button variant='contained' size='medium' onClick={() => setModalOpen(true)}>
          Open New Order
        </Button>
        <EnhancedTable dataLoading={appLoading} />
        <OpenNewOrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </section>
    </Container>
  );
}
