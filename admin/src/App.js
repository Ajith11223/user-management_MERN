import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import Home from '../src/Pages/User/Home'
import LoginPage from '../src/Pages/User/LoginPage'
import SignupPage from '../src/Pages/User/SignupPage'
import AdminRoute from './Pages/AdminRoute';
import Errror from './component/404/Errror';
import { AuthContext } from './context/AuthContext'
import { useContext, useEffect } from 'react';


function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user) {
      return <Navigate to="/" />;
    }

    return children;
  };
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={
        <ProtectedRoute>
          <LoginPage />
        </ProtectedRoute>
      } />
      <Route path='/signup' element={
        <ProtectedRoute>
          <SignupPage />
        </ProtectedRoute>
      } />
      <Route path='/admin/*' element={<AdminRoute />} />
      <Route path='/*' element={<Errror />} />
    </Routes>
  );
}

export default App;
