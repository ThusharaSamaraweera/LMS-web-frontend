import { Box, Container, Stack, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import CourseCreationForm from "./CourseCreationForm";

const CourseManagement = () => {
  const [isCourseCreationFormVisible, setCourseCreationFormVisible] = useState(false)

  const handleOnAddCourseBtnClick = () => {
    setCourseCreationFormVisible(!isCourseCreationFormVisible)
  }

  return (
    <Container>
      <Typography variant="h5" >Course Management</Typography>
      <Stack>      
        <Stack
          spacing={2}
          sx={{
            direction: "row",
            marginY: 2,
          }}
        >
          <Button variant="outlined" size="large" onClick={handleOnAddCourseBtnClick}>
            {isCourseCreationFormVisible ? "Collapse form" : "Add course"}
          </Button>
        </Stack>

        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginY: 2,
          }}
        >
          { isCourseCreationFormVisible && <CourseCreationForm />}
        </Box>
      </Stack>
    </Container>
  );
};

export default CourseManagement;
