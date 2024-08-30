import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import StaffDashboard from './pages/StaffDashboard'
import PrivateRoute from '../guard/PrivateRoute'
import StaffMain from './pages/StaffMain'
import StaffWithDraw from './pages/StaffWithDraw'
import StaffProfile from './pages/StaffProfile'
import StaffTransaction from './pages/StaffTransaction'
import NotFound from './pages/NotFound'
import StaffOpsService from './pages/StaffOpsService'

const BarberApp = () => {
  return (
      <Routes>  
        <Route path="/" element={<StaffMain page={ StaffDashboard } />} />
        <Route path="/transaction" element={<StaffMain page={ StaffTransaction } />} />
        <Route path="/withdraw" element={<StaffMain page={ StaffWithDraw } />} />
        <Route path="/profile" element={<StaffMain page={ StaffProfile } />} />
        <Route path="/schedule" element={<StaffMain page={ StaffOpsService } />} />
        <Route path="*" element={<StaffMain page={ NotFound } />} />
      </Routes>
  )
}

export default BarberApp