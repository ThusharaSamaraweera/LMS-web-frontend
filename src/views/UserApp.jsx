import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../components/home'
import Dashboard from '../components/layout/Dashboard'

const UserApp = () => {
  return (
    <div> 
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/dashboard/*' element={<Dashboard/>} />
        <Route path='*' element={<Navigate to='/dashboard/*' replace/>} />
      </Routes>
    </div>
  )
}

export default UserApp
