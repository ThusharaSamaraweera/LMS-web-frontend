import { Stack } from '@mui/material'
import React from 'react'
import CourseNoteCard from './CourseNoteCard'

const CourseContent = () => {
  return (
    <Stack>
      <CourseNoteCard/>
      <CourseNoteCard/>
      <CourseNoteCard/>
    </Stack>
  )
}

export default CourseContent