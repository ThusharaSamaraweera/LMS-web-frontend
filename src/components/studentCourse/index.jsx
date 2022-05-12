import { Box, Button } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'

const Course = () => {
  const {course} = useParams();

  return (
    <Box>
      course - {course}

    </Box>
  )
}

export default Course
