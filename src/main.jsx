import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HomePage from './pages/HomePage.jsx';
import ProductPage from './components/UI/ProductPage.jsx'
import Login from './pages/Login.jsx';
import Basket from './components/UI/Basket.jsx';


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
        path: '/login',
        element: <Login />,
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