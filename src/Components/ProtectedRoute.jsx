import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useApp } from '../Context/AppContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

