import { Box, Typography } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'
const faculties = [
  "Commerce and Management Studies",
  "Science",
]

const More = () => {

  const renderLinkList = faculties.map( faculty => {
    return <Link to={`faculty/${faculty}`} key={faculty}>
      <Typography>{faculty}</Typography>
    </Link>
  })

  return (
    <Box>
      <Box>
        <Typography variant='h5'>Faculties</Typography>
        {renderLinkList}
      </Box>
    </Box>
  )
}

export default More
