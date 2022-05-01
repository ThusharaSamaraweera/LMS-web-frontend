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
    title: "department of Chemistry",
    academyYears: [
      "academic Year 2019-2020",
    ]
  },
  {
    title: "software Engineering Teaching Unit",
    academyYears: [
      "academic Year 2019-2020",
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
            backgroundColor: '#ffdca8'
          }}
        >
          <Typography>{item.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Link to={`${item.academyYears[0]}`}>
              {item.academyYears[0]}
            </Link>
          </Typography>
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
