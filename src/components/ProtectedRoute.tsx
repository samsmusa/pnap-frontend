import React, {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth'; // Adjust the path as needed

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a proper loading indicator
    }

    if (!user) {
        return <Navigate to="/login"/>;
    }

    return <>{children}</>;
};
