import { Box, Container, Stack, Typography, Button } from "@mui/material";
import React from "react";
import CourseCreationForm from "./CourseCreationForm";

const CourseManagement = () => {

  return (
    <Container>
      <Typography>Course Management</Typography>
      <Stack>      
        <Stack
          spacing={2}
          sx={{
            direction: "row",
            marginY: 2,
          }}
        >
          <Button variant="outlined" size="large">
            Add course
          </Button>
        </Stack>

        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <CourseCreationForm />
        </Box>
      </Stack>
    </Container>
  );
};

export default CourseManagement;
