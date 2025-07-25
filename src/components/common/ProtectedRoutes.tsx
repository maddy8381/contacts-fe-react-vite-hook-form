import React, { type JSX } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../context/auth/useAuth';
import { ROUTES } from '../../constants';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
