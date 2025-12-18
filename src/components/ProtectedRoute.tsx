// components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import type { User } from 'firebase/auth';

interface ProtectedRouteProps {
  user: User | null;
  redirectPath?: string;
}

const ProtectedRoute = ({ user, redirectPath = '/onboarding' }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  // Outlet renders the child route (e.g., HomeScreen)
  return <Outlet />;
};

export default ProtectedRoute;