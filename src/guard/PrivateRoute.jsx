import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ role, children }) => {
  const userRole = localStorage.getItem('user');
  const userSession = sessionStorage.getItem('user');

  const userData = userRole? JSON.parse(userRole) : JSON.parse(userSession);


  if (userData?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
