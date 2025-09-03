import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { userInfo } = useAuth();

  // If user is logged in, show the page. Otherwise, redirect to login.
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;