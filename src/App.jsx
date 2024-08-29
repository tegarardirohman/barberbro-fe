import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AdminApp from './admin/AdminApp';
import BarberApp from './barber/BarberApp';
import CustomerApp from './customer/CustomerApp';
import PrivateRoute from './guard/PrivateRoute';
import {AuthProvider} from './context/AuthContext';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<CustomerApp/>}/>
                    <Route path="/barbershop/*" element={<BarberApp/>}/>
                    <Route path="/admin/*" element={<AdminApp/>}/>
                    <Route path="/staff/*" element={<PrivateRoute role="staff"><BarberApp/></PrivateRoute>}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
