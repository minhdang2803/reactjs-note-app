// components/PublicRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { type User } from 'firebase/auth';

interface PublicRouteProps {
    user: User | null;
    redirectPath?: string;
}

const PublicRoute = ({ user, redirectPath = '/home' }: PublicRouteProps) => {
    if (user) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

export default PublicRoute;