import React from 'react'
import Typography from '@mui/material/Typography';
import CourseCard from './CourseCard';

const CourseOverview = () => {
  const enrollCourses = [
    {
      code: "SENG 22212",
      name: "Software Architecture and Design",
    },
    {
      code: "SENG 22212",
      name: "Software Architecture and Design",
    },
    {
      code: "SENG 22212",
      name: "Software Architecture and Design",
    },
  ]

  return (
    <>
      <Typography variant="h5" gutterBottom component="div">
        Course overview
      </Typography>
      <CourseCard details={enrollCourses[0]} />
    </>
  )
}

export default CourseOverview
