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
  const departments = useSelector((state) => state.courseReducer.department)

  const departmentsForFaculty = departments.filter((department) => department.faculty.toLowerCase() === title.toLowerCase())

  const renderItem = departmentsForFaculty.map((item) => {
    return (
      <Accordion
        sx={{
          border: 1,
          marginY: 1,
          "&:hover": {
            color: 'white'
          },
        }}
        key={item.department}
      >
        <Link to={`${item.department}`}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: "#ffdca8",
              border: 1,
              "&:hover": {
                backgroundColor: '#ff8c69',
              },
            }}
          >
            <Typography
              key={item.department}
              sx={{
                color: "black",
              }}
            >
              {item.department}
            </Typography>
          </AccordionSummary>
        </Link>
        {/* <AccordionDetails>
          {item.degrees.map((degree) => {
            return (
              <Typography key={degree.course_name}>
                <Link to={`${degree.title}`}>{degree.course_name}</Link>
              </Typography>
            );
          })}
        </AccordionDetails> */}
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
