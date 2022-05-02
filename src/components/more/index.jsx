import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'
const faculties = [
  "commerce and Management Studies",
  "science",
]

const More = () => {

  const renderLinkList = faculties.map( faculty => {
    return <Link to={`faculty/${faculty}`} key={faculty}>
      <Typography>{faculty}</Typography>
    </Link>
  })

  return (
    <Container>
      <Box>
        <Typography variant='h5'>Faculties</Typography>
        {renderLinkList}
      </Box>
    </Container>
  )
}

export default More
