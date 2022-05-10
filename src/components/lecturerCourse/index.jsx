import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddGradeTable from "./AddGradeTable";

const LecturerCourse = () => {
  const { course } = useParams();
  const [isGradeTableVisible, setGradeTableVisible] = useState(false);

  const handleOnAddGradeBtnClick = () => {
    setGradeTableVisible(!isGradeTableVisible);
  };

  return (
    <div>
      Lecturer Course - {course}
      <Box sx={{ display: "flex", justifyContent: "end", marginY: 2 }}>
        <Button variant="outlined" onClick={handleOnAddGradeBtnClick}>
          { isGradeTableVisible ?  "Collapse table" : "Add grades"}
        </Button>
      </Box>
      <Box>{isGradeTableVisible && <AddGradeTable courseId={course} />}</Box>
    </div>
  );
};

export default LecturerCourse;
