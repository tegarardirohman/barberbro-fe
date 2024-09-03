import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminMain from './components/main/AdminMain'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from '../barber/pages/NotFound'
import AdminTransaction from './pages/AdminTransaction'
import AdminWithdraw from './pages/AdminWithdraw'
import AdminBarber from './pages/AdminBarber'
import AdminUser from './pages/AdminUser'

const AdminApp = () => {
  return (
    <Routes>  
    <Route path="/" element={<AdminMain page={ AdminDashboard } />} />
    <Route path="/transaction" element={<AdminMain page={ AdminTransaction } />} />
    <Route path="/withdraw" element={<AdminMain page={ AdminWithdraw } />} />
    <Route path="/barbershop" element={<AdminMain page={ AdminBarber } />} />
    <Route path="/customer" element={<AdminMain page={ AdminUser } />} />
    <Route path="*" element={<AdminMain page={ NotFound } />} />
  </Routes>
  )
}

export default AdminApp