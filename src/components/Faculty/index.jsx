import { Container, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

const departments = [
  "Department of Chemistry",
  "Software Engineering Teaching Unit"
]

const Faculty = () => {
  const {title} = useParams();

  return (
    <Container>
      <Typography variant='h4'>{title}</Typography>
    </Container>
  )
}

export default Faculty
