import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminApp from './admin/AdminApp';
import BarberApp from './barber/BarberApp';
import CustomerApp from './customer/CustomerApp';
import PrivateRoute from './guard/PrivateRoute';
import NotFound from './customer/pages/NotFound';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/*" element={ <CustomerApp /> } /> 
        <Route path="/admin/*" element={<PrivateRoute role="ADMIN"><AdminApp /></PrivateRoute>} />
        <Route path="/staff/*" element={<PrivateRoute role="STAFF"><BarberApp /></PrivateRoute>} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
