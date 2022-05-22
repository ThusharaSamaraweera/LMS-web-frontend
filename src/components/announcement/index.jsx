import React from 'react'
import { Box, Container, Stack, Typography, Button } from "@mui/material";
import { useState } from "react";
import AnnouncementForm from './AnnouncementForm'

const AnnouncementManagement = () => {
  const [isAnnouncementFormVisible, setAnnouncemntFormVisible] = useState(false);

  const handleOnAddAnnouncementBtnClick = () => {
    setAnnouncemntFormVisible(!isAnnouncementFormVisible)
  }
  return (
    <Container>
      <Typography variant="h5" >Announcement</Typography>
      <Stack>      
        <Stack
          spacing={2}
          sx={{
            direction: "row",
            marginY: 2,
          }}
        >
          <Button variant="outlined" size="large" onClick={handleOnAddAnnouncementBtnClick}>
            {isAnnouncementFormVisible ? "Collapse form" : "Add Announcement"}
          </Button>
        </Stack>

        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginY: 2,
          }}
        >
          { isAnnouncementFormVisible && <AnnouncementForm />}
        </Box>
      </Stack>
    </Container>
  );
}

export default AnnouncementManagement
