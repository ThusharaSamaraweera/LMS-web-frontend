import { Container, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import CourseService from '../../servers/course.service'

const faculties = [
  "commerce and Management Studies",
  "Humanities",
  "Medicine",
  "Science",
  "Social Sciences",
  "Computing and Technology"
]

const unitsAndCetres = [
  "Centre for Asian Studies",
  "Centre for Gender Studies",
  "Confucius Center",
  "English Language Teaching Unit",
  "ICT Centre",
  "Media unit",
  "Research Council",
  "Staff Development Unit",
  "Statistics and Data Monitoring"
]

const More = () => {
  useEffect(() => {
    CourseService.getAllCourse()
  }, [])

  const renderFaculties = faculties.map( faculty => {
    return <Link to={`faculty/${faculty}`} key={faculty}>
      <Typography>{faculty}</Typography>
    </Link>
  })

  const renderUnitsAndCentres = unitsAndCetres.map(item => {
    return <Typography key={item}>{item}</Typography>
  })

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant='h5'>Faculties</Typography>
          {renderFaculties}
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h5'>Units & Centres</Typography>      
          {renderUnitsAndCentres}    
        </Grid>
      </Grid>
    </Container>
  )
}

export default More
