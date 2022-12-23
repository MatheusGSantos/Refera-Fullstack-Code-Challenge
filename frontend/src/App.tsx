import { BrowserRouter as Router } from 'react-router-dom';
import { RoutesIndexer } from './routes';
import { AppProvider } from './hooks';
// import { GlobalStyle } from './styles/global';
import CssBaseline from '@mui/material/CssBaseline';
// import 'core-js/es6/promise';
// import 'core-js/es6/set';
// import 'core-js/es6/map';

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
