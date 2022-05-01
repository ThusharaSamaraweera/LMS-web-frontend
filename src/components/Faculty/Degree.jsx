import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Alert from "../utilsComponents/Alert";
import ConfirmationDialog from "../utilsComponents/ConfirmationDialog";

const Degree = () => {
  const allCourses = [
    "GNCT 13212 - Personal Progress and Development I (2019/2020)",
    "SENG 11232 - Engineering Foundation (2019/2020)",
    "SENG 11223 - Programming Concepts (2019/2020)",
  ];

  const [isDialogOpen, setDialopOpen] = useState(false);

  const handleOnClickEnrollMe = () => {
    setDialopOpen(true);
  };

  const handleOnAccept = () => {
    console.log("accept");
    setDialopOpen(false);
    setTimeout(() => {
      
      Alert({ message: "Enrolled", type: "success" });
    }, 800);
  };

  const handleOnCancel = () => {
    console.log("cancel");
    setDialopOpen(false);
  };

  // if (isDialogOpen) {
  //   return (
  //     <ConfirmationDialog
  //       title={"Do you want to enroll?"}
  //       handleOnAccept={handleOnAccept}
  //       handleOnCancel={handleOnCancel}
  //     />
  //   );
  // }

  const renderCourses = allCourses.map((course) => {
    return (
      <Grid
        container
        sx={{
          marginY: 1,
        }}
        key={course}
      >
        <Grid item xs={12} sm={9}>
          <Typography>{course}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleOnClickEnrollMe}
          >
            Enroll me
          </Button>
        </Grid>
      </Grid>
    );
  });

  return (
    <>
      {isDialogOpen && (
        <ConfirmationDialog
          title={"Do you want to enroll?"}
          handleOnAccept={handleOnAccept}
          handleOnCancel={handleOnCancel}
        />
      )}
      <Box>
        Courses
        <Stack>{renderCourses}</Stack>
      </Box>
    </>
  );
};

export default Degree;
