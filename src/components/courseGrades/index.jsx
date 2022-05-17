import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StudentService from "../../services/student.service";
import GradeTable from "./GradeTable";

const Grades = () => {
  const [grades, setGrades] = useState([])
  
  const fetchGrades = async () => {
    await StudentService.getGradesForStudent()
      .then((res) => {
        setGrades(res)
      }).catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    fetchGrades()
  }, [])

  return (
    <Container>
      <Typography variant="h5" gutterBottom component="div">
        Course grades
      </Typography>
      <GradeTable grades={grades} />
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
