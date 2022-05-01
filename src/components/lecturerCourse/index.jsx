import React from 'react'
import { useParams } from 'react-router-dom'

const LecturerCourse = () => {
  const {course} = useParams();

  return (
    <div>
      Lecturer Course - {course}
    </div>
  )
}

export default LecturerCourse
