import React from 'react'
import { useParams } from 'react-router-dom'

const Course = () => {
  const {course} = useParams();
  console.log(course)

  return (
    <div>
      course - {course}
    </div>
  )
}

export default Course
