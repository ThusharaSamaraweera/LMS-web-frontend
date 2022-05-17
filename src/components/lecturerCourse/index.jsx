import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddGradeTable from "./AddGradeTable";
import StudentService from '../../services/student.service'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AnnouncementSection from "./AnnouncementSection";

const LecturerCourse = () => {
  const { courseId } = useParams();
  const [isGradeTableVisible, setGradeTableVisible] = useState(false);
  const [courseDetails, setCourseDetails] = useState({})
  const [isAnnoucementSectionOpen, setAnnouncementOpen] = useState(false);

  const handleOnAddGradeBtnClick = () => {
    setGradeTableVisible(!isGradeTableVisible);
  };

  const fetchCourseDetail = async () => {
    await StudentService.getCourseDetails(courseId).then((res) => {
      setCourseDetails(res)
    });
  };

  const handleOnToggleAnnoucementBtn = () => {
    setAnnouncementOpen(!isAnnoucementSectionOpen);
  };


  useEffect(() => {
    fetchCourseDetail();
  }, [courseId]);

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "end", marginY: 2 }}>
        <Button variant="outlined" onClick={handleOnAddGradeBtnClick}>
          { isGradeTableVisible ?  "Collapse table" : "Add grades"}
        </Button>
      </Box>
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

        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            textAlign: "end",
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Button
            variant="outlined"
            // onClick={handleOnClickUnenroll}
            sx={{
              margin: 1,
            }}
            size="small"
            startIcon={<ExitToAppIcon/>}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={handleOnToggleAnnoucementBtn}
            sx={{
              margin: 1,
            }}
            size="small"
            startIcon={<AnnouncementIcon/>}
          >
            {isAnnoucementSectionOpen ? "Close Announcement" : "Announcement"}
          </Button>
        </Grid>
      </Grid>

      {isAnnoucementSectionOpen && (
        <AnnouncementSection/>
      )}
      <Box>{isGradeTableVisible && <AddGradeTable courseId={courseId} />}</Box>

    </Container>
  );
};

export default LecturerCourse;
