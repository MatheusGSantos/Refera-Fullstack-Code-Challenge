import { Route, Routes } from 'react-router-dom';
// import Chat from '../pages/Chat';
// import CreateAd from '../pages/CreateAd';
import { Home } from '../pages/Home';
// import LogIn from '../pages/LogIn';
// import MyAds from '../pages/MyAds';
import { NotFound } from '../pages/NotFound';
// import Product from '../pages/Product';
// import Search from '../pages/Search';
// import SignUp from '../pages/SignUp';
import { Wrapper } from '../pages/Wrapper';
// import RedirectHandler from './RedirectHandler';

export function RoutesIndexer() {
  return (
    <Routes>
      <Route path='/' element={<Wrapper />}>
        <Route index element={<Home />} />
        {/* <Route path='search' element={<Search />} />
        <Route
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
        />
        <Route path='product/:id' element={<Product />} />
        <Route
          path='chat/:seller'
          element={
            <RedirectHandler handlerType='security'>
              <Chat />
            </RedirectHandler>
          }
        />
        <Route
          path='my-ads'
          element={
            <RedirectHandler handlerType='security'>
              <MyAds />
            </RedirectHandler>
          }
        />
        <Route
          path='create-ad'
          element={
            <RedirectHandler handlerType='security'>
              <CreateAd />
            </RedirectHandler>
          }
        /> */}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
