import { Box,Typography } from '@mui/material'
import React from 'react'
import AnnouncementCard from './AnnouncementCard'
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
        fontWeight:"bold",
        fontSize: '1.5rem'
      }}>
      Announcements
      </Typography>
        {/* annoucements goes here */ }
        <AnnouncementCard/>
    </Box>
  )
}

export default AnnouncementSection