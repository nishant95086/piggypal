import { useState } from 'react'
import './App.css'
import Dashboard from './page/dashbord';
import Login from './page/login';
import Signup from './page/signup';
import { Route,Routes } from 'react-router-dom';
import Home from './page/home';
import ProtectedRoute from './comp/ProtectedRoute';
import ChangePassword from './page/change_password';
function App() {
  return (
    <>
    <Routes>
       <Route path="/" element={<Home />}></Route>
       <Route path="/register" element={<Signup/> }></Route>
       <Route path='/login' element={<Login/> }></Route>
       <Route path='/change-password' element={<ChangePassword/> }></Route>
       <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App
