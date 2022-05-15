import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StudentService from '../../services/student.service'

const StudentCourse = () => {
  const {courseId} = useParams();
  const [courseName, setCourseName] = useState("")
  const [lecturer, setLecturerName] = useState("")
  const [courseDescription, setCourseDescription] = useState("")

  const fetchCourseDetail = async () => {
    await StudentService.getCourseDetails(courseId)
      .then((res) => {
        setCourseName(res.course_name)
        setLecturerName(res.lecturer)
        setCourseDescription(res.course_description)
      })

  }
  
  useEffect(() => {
    fetchCourseDetail()
  }, [])

  return (
    <Container>
      <Box
        sx={{
          marginY: 2
        }}
      >
        <Typography>Course code : {courseId}</Typography>
        <Typography>Course name : {courseName}</Typography>
        <Typography>Lecturer : {lecturer}</Typography>
      </Box>

      <Box>
        <Typography>{courseDescription}</Typography>
      </Box>
    </Container>
  )
}

export default StudentCourse
