import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './admin/AdminApp';
import BarberDashboard from './barber/BarberApp';
import CustomerDashboard from './customer/CustomerApp';
import PrivateRoute from './guard/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/staff" element={<PrivateRoute role="staff"><BarberDashboard /></PrivateRoute>} />
        <Route path="/consumer" element={<PrivateRoute role="customer"><CustomerDashboard /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
