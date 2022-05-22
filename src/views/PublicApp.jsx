import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../components/home'
import Login from '../components/login/Login'
import Signup from '../components/signup/Signup'

const PublicApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='*' element={<Navigate to='/' replace/>} />
      </Routes>
    </div>
  )
}

export default PublicApp
