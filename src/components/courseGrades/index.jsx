import { Box, Container, Typography } from "@mui/material";
import React from "react";
import GradeTable from "./GradeTable";

const Grades = () => {
  return (
    <Container>
      <Typography variant="h5" gutterBottom component="div">
        Course grades
      </Typography>
      <GradeTable />
      <Box
        sx={{
          height: 50
        }}
      >

      </Box>
    </Container>
  );
};

export default Grades;
