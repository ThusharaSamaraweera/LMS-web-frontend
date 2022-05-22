import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const unitsAndCetres = [
  "Centre for Asian Studies",
  "Centre for Gender Studies",
  "Confucius Center",
  "English Language Teaching Unit",
  "ICT Centre",
  "Media unit",
  "Research Council",
  "Staff Development Unit",
  "Statistics and Data Monitoring",
];

const More = () => {
  const faculties = useSelector((state) => state.courseReducer.faculties)

  const renderFaculties = faculties.map((faculty) => {
    return (
      <Link to={`faculty/${faculty}`} key={faculty}>
        <Typography sx={{
            color: 'black',
            "&:hover": {
              color: '#ff7518'
            },
          }}>{faculty}</Typography>
      </Link>
    );
  });

  const renderUnitsAndCentres = unitsAndCetres.map((item) => {
    return <Typography key={item}>{item}</Typography>;
  });

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography
            variant="h5"
            sx={{
              color: "brown",
            }}
          >
            Faculties
          </Typography>
          {renderFaculties}
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h5"
            sx={{
              color: "brown",
            }}
          >
            Units & Centres
          </Typography>
          {renderUnitsAndCentres}
        </Grid>
      </Grid>
    </Container>
  );
};

export default More;
