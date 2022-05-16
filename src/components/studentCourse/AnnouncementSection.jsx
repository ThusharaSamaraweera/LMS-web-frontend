import { Box, Stack, Typography } from '@mui/material'
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
      <Typography>Announcements</Typography>
      <Stack>
        {/* annoucements goes here */ }
        <AnnouncementCard/>
      </Stack>
    </Box>
  )
}

export default AnnouncementSection