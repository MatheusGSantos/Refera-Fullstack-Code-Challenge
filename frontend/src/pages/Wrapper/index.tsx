import { Outlet } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import { useScroll } from '../../hooks/scroll';
import { Container, Content } from './styles';

export function Wrapper() {
  const { scroll } = useScroll();
  return (
    <Container>
      <Navbar />
      <Content scrollaActive={scroll}>
        <Outlet />
        <ToastContainer
          position='top-right'
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
          style={{ marginTop: '5rem' }}
        />
      </Content>
    </Container>
  );
}
