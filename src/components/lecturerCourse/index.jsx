import { Box, Button } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'
import AddGradeTable from './AddGradeTable';

const LecturerCourse = () => {
  const {course} = useParams();

  return (
    <div>
      Lecturer Course - {course}
      <Box sx={{display: "flex", justifyContent: 'end'}}>
        <Button variant='outlined'>Add grades</Button>
      </Box>
      <Box>
        <AddGradeTable/>
      </Box>
    </div>
  )
}

export default LecturerCourse
