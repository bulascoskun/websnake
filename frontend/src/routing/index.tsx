import { createBrowserRouter, Navigate } from 'react-router';
// Pages
import { About, Login, Register } from './pages';
import { AuthLayout, DashboardLayout } from './layouts';

export default createBrowserRouter([
  {
    path: '/',
    Component: DashboardLayout,
    children: [{ index: true }, { path: 'about', Component: About }],
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
