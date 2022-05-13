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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const departments = [
  {
    title: "SE",
    academyYears: [
      "2018-2019",
      "2019-2020",
    ]
  },
  {
    title: "Software Engineering Teaching Unit",
    academyYears: [
      "2019-2020",
    ]
  }
];



const Faculty = () => {
  const { title } = useParams();

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
            backgroundColor: '#ffdca8',
            border: 1,
          }}
        >
          <Typography>{item.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {item.academyYears.map((year) => {
              return (
                <Typography>
                  <Link to={`${year}`}>
                    {year}
                  </Link>
                </Typography>
              )
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
      >{renderItem}</Box>
    </Container>
  );
};

export default Faculty;
