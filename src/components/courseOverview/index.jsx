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

  const renderEnrollCourses = enrollCourses.map((course, index) => {
    return <CourseCard details={enrollCourses[index]} key={index}/>
  })

  return (
    <>
      <Typography variant="h5" gutterBottom component="div">
        Course overview
      </Typography>
      {renderEnrollCourses}
    </>
  )
}

export default CourseOverview
