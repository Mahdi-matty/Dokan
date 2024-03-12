import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import HomePage from './pages/HomePage.jsx';
import ProductPage from './components/UI/ProductPage.jsx'
import Login from './pages/Login.jsx';
import Basket from './components/UI/Basket.jsx';
import ProfilePage from './pages/ProfilePage.jsx'
import MerchantLogin from './merchants/MerchantLogin.jsx';
import MerProfile from './merchants/MerProfile.jsx';
import CategoryPart from './components/UI/CategoryPart.jsx';
import CategoryName from './components/UI/CategoryName.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/products/:id',
        element: <ProductPage />,
      },
      {
        path: '/category/:id',
        element: <CategoryPart />,
      },
      {
        path: '/categorysub/:categoryName',
        element: <CategoryName />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/merchantlogin',
        element: <MerchantLogin />,
      },
      {
        path: '/merchantprofile',
        element: <MerProfile />,
      },
      {
        path: '/basket',
        element: <Basket />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);