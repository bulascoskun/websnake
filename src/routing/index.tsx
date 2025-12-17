import { createBrowserRouter, Navigate } from 'react-router';
// Pages
import { About, Home, Login, Register } from './pages';
import { AuthLayout } from './layouts';

export default createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      {
        path: 'auth',
        Component: AuthLayout,
        children: [
          { index: true, element: <Navigate to="login" replace /> },
          { path: 'login', Component: Login },
          { path: 'register', Component: Register },
        ],
      },
      //   {
      //     path: 'dashboard',
      //     children: [
      //       { path: ':city', Component: ConcertsCity },
      //     ],
      //   },
    ],
  },
]);
