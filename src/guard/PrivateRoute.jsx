import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ role, children }) => {
  const userRole = localStorage.getItem('user');

  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
