import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddGradeTable from "./AddGradeTable";
import StudentService from '../../services/student.service'

const LecturerCourse = () => {
  const { courseId } = useParams();
  const [isGradeTableVisible, setGradeTableVisible] = useState(false);
  const [courseDetails, setCourseDetails] = useState({})

  const handleOnAddGradeBtnClick = () => {
    setGradeTableVisible(!isGradeTableVisible);
  };

  const fetchCourseDetail = async () => {
    await StudentService.getCourseDetails(courseId).then((res) => {
      setCourseDetails(res)
    });
  };

  useEffect(() => {
    fetchCourseDetail();
  }, [courseId]);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "end", marginY: 2 }}>
        <Button variant="outlined" onClick={handleOnAddGradeBtnClick}>
          { isGradeTableVisible ?  "Collapse table" : "Add grades"}
        </Button>
      </Box>
      <Box>{isGradeTableVisible && <AddGradeTable courseId={courseId} />}</Box>
      <Grid
        container
        sx={{
          marginY: 2,
        }}
      >
        <Grid item xs={12} sm={8}>
          <Box>
            <Typography>Course code : {courseDetails.course_id}</Typography>
            <Typography>Course name : {courseDetails.course_name}</Typography>
            <Typography>Lecturer : {courseDetails.lecturer}</Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default LecturerCourse;
