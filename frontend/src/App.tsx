import { BrowserRouter as Router } from 'react-router-dom';
import { RoutesIndexer } from './routes';
import { AppProvider } from './hooks';
// import { GlobalStyle } from './styles/global';
import CssBaseline from '@mui/material/CssBaseline';

export function App() {
  return (
    <Router>
      <AppProvider>
        <RoutesIndexer />
      </AppProvider>

      <CssBaseline />
    </Router>
  );
}
