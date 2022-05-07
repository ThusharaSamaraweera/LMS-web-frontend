import React from 'react'
import Typography from '@mui/material/Typography';
import CourseCard from './CourseCard';
import { Box, Container } from '@mui/material';
import {useSelector} from 'react-redux'

const CourseOverview = () => {
  const courses = useSelector(state => state.lecturerReducer.courses);
  console.log(courses)

  const renderEnrollCourses = courses.map((course, index) => {
    return <CourseCard course={course} key={index}/>
  })

  return (
    <Container>
      <Typography variant="h5" gutterBottom component="div">
        Course overview
      </Typography>
      {renderEnrollCourses}

    </Container>
  )
}

export default CourseOverview
