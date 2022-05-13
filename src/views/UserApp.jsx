import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../components/layout/Dashboard'
import { useDispatch } from 'react-redux'
import { getAllLecturerCourses } from '../store/actions/lecturerAction'
import { getStudentEnrollCourses } from '../store/actions/studentAction'
import { getAllCourse, getAllDepartment } from '../store/actions/courseAction'
import CourseService from '../servers/course.service'

const UserApp = () => {
  const dispatch =  useDispatch()  
  
  useEffect(() => {
    dispatch(getAllLecturerCourses());
    dispatch(getStudentEnrollCourses())
    dispatch(getAllCourse())  
    dispatch(getAllDepartment())
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
