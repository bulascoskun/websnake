import { createBrowserRouter, Navigate } from 'react-router';
// Pages
import { Domains, Login, Register, Home, Account } from './pages';
import { AuthLayout, DashboardLayout } from './layouts';
import ProtectedRoute from '@/components/ProtectedRoute';

export default createBrowserRouter([
  {
    Component: ProtectedRoute,
    children: [
      {
        path: '/',
        Component: DashboardLayout,
        children: [
          { index: true, Component: Home },
          {
            path: 'domains',
            Component: Domains,
            children: [{ path: ':id', Component: Domains }],
          },
          { path: 'insights', Component: Domains },
          { path: 'account', Component: Account },
        ],
      },
    ],
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
    ],
  },
]);
