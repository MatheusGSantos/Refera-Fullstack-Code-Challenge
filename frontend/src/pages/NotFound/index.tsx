import { Container } from './styles';
import NotFoundIcon from '../../assets/page-not-found.svg';

export function NotFound() {
  return (
    <Container>
      <img src={NotFoundIcon} alt='Page not found' />
      <h3>Seems like this page doesn&apos;t exist.</h3>
    </Container>
  );
}

export default NotFound;
