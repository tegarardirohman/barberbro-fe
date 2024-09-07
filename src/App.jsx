import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AdminApp from './admin/AdminApp';
import BarberApp from './barber/BarberApp';
import CustomerApp from './customer/CustomerApp';
import PrivateRoute from './guard/PrivateRoute';
import {AuthProvider} from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
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
