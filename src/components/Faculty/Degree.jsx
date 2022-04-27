import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const Degree = () => {
  const allCourses = [
    "GNCT 13212 - Personal Progress and Development I (2019/2020)",
    "SENG 11232 - Engineering Foundation (2019/2020)",
    "SENG 11223 - Programming Concepts (2019/2020)",
  ];

  const handleOnClickEnrollMe = () => {
    
  }

  const renderCourses = allCourses.map((course) => {
    return (
      <Grid
        container
        sx={{
          marginY: 1,
        }}
      >
        <Grid item xs={12} sm={9}>
          <Typography>{course}</Typography>
        </Grid>
        <Grid item xs={12} sm={3} >
          <Button variant="outlined" size="small">Enroll me</Button>
        </Grid>
      </Grid>
    );
  });

  return (
    <Box>
      Courses
      <Stack>{renderCourses}</Stack>
    </Box>
  );
};

export default Degree;
