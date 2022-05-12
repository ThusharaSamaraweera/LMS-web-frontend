import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

const Faculty = () => {
  const { title } = useParams();
  const courses = useSelector((state) => state.courseReducer.courses);

  const getDegreesForDepartment = (department) => {
    return courses.filter(
      (course) =>
        course.department_name.toLowerCase() === department.toLowerCase() &&
        course.faculty_name.toLowerCase() === title.toLowerCase()
    );
  };
  const departments = [
    {
      title: "SE",
      degrees: getDegreesForDepartment("SE"),
    },
    {
      title: "Software Engineering Teaching Unit",
      degrees: getDegreesForDepartment("Software Engineering Teaching Unit"),
    },
  ];

  const renderItem = departments.map((item) => {
    return (
      <Accordion
        sx={{
          border: 1,
          marginY: 1,
        }}
        key={item.title}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: "#ffdca8",
            border: 1,
          }}
        >
          <Typography key={item.title}>{item.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {item.degrees.map((degree) => {
            return (
              <Typography key={degree.course_name}>
                <Link to={`${degree.course_name}`}>{degree.course_name}</Link>
              </Typography>
            );
          })}
        </AccordionDetails>
      </Accordion>
    );
  });

  return (
    <Container>
      <Typography variant="h4">{title}</Typography>

      <Box
        sx={{
          marginY: 2,
        }}
      >
        {renderItem}
      </Box>
    </Container>
  );
};

export default Faculty;
