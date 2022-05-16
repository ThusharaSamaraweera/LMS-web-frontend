import { Box,Typography } from '@mui/material'
import React from 'react'
import AnnouncementCard from './AnnoucementCard'
const AnnouncementSection = () => {

  

  return (
    <Box
      sx={{
        marginY: 5,
        border: 2,
        padding: 2,
      }}
    >
      <Typography sx={{
        padding: 2,
        fontWeight:"bold"
      }}>
      Announcements
      </Typography>
        {/* annoucements goes here */ }
        <AnnouncementCard/>
    </Box>
  )
}

export default AnnouncementSection