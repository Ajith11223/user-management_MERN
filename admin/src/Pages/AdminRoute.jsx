import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './Admin/LoginPage'
import HomePage from './Admin/HomePage'
import Errror from '../component/404/Errror'
import { AdminAuthContext } from '../context/AdminAuthContext'



const AdminRoute = () => {
  const { admin } = useContext(AdminAuthContext)
  const PublicRoute = ({ children }) => { 
    if (admin) {
      return <Navigate to="/admin/home" />;
    }

    return children;
  };

  const ProtectedRoute = ({ children }) => {
    if (!admin) {
      return <Navigate to="/admin" />;
    }

    return children;
  };
  return (
    <Routes>
      <Route path='/' element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>

      } />

      <Route path='/home' element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />

      <Route path='/*' element={<Errror />} />
    </Routes>
  )
}

export default AdminRoute
