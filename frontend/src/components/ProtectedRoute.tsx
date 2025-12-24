import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/store/useAuthStore';

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  } else {
    return <Outlet />;
  }
};
export default ProtectedRoute;
