import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { Wrapper } from '../pages/Wrapper';
// import LogIn from '../pages/LogIn';
// import RedirectHandler from './RedirectHandler';

export function RoutesIndexer() {
  return (
    <Routes>
      <Route path='/' element={<Wrapper />}>
        <Route index element={<Home />} />
        {/* <Route
          path='login'
          element={
            <RedirectHandler handlerType='logged'>
              <LogIn />
            </RedirectHandler>
          }
        />
        <Route
          path='signup'
          element={
            <RedirectHandler handlerType='logged'>
              <SignUp />
            </RedirectHandler>
          }
        /> */}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
