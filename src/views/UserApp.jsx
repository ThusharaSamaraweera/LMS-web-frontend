import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../components/layout/Dashboard'
import { useDispatch } from 'react-redux'
import { getAllLecturerCourses } from '../store/actions/lecturerAction'
import { getStudentEnrollCourses } from '../store/actions/studentAction'
import { getAllCourse } from '../store/actions/courseAction'

const UserApp = () => {
  const dispatch =  useDispatch()  
  
  useEffect(() => {
    dispatch(getAllLecturerCourses());
    dispatch(getStudentEnrollCourses())
    dispatch(getAllCourse())  
  }, [])
  
  return (
    <div> 
      <Routes>
        <Route path='/dashboard/*' element={<Dashboard/>} />
        <Route path='*' element={<Navigate to='/dashboard' replace/>} />
      </Routes>
    </div>
  )
}

export default UserApp
