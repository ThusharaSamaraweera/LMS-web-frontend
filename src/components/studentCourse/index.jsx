import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentService from "../../services/student.service";
import CourseNoteCard from "../CourseNoteCard";
import Alert from "../utilsComponents/Alert";
import ConfirmationDialog from "../utilsComponents/ConfirmationDialog";
import { useSelector, useDispatch } from "react-redux";
import { getStudentEnrollCourseIds } from "../../store/actions/studentAction";
import AnnouncementSection from "./AnnouncementSection";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const StudentCourse = () => {
  const userEmail = useSelector((state) => state.authReducer.authUser.username);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isUnenrollConfirmationDialogOpen, setUnerollConfirmationDialogOpen] =
    useState("");
  const [isAnnoucementSectionOpen, setAnnouncementOpen] = useState(false);
  const [courseDetails, setCourseDetails] = useState({})

  const fetchCourseDetail = async () => {
    await StudentService.getCourseDetails(courseId).then((res) => {
      setCourseDetails(res)
    });
  };

  useEffect(() => {
    fetchCourseDetail();
  }, [courseId]);

  const handleOnClickUnenroll = () => {
    setUnerollConfirmationDialogOpen(true);
  };

  const handleOnAccept = async () => {
    setUnerollConfirmationDialogOpen(false);

    const unenrollCourse = {
      student_email: userEmail,
      enrolled_course_id: courseId,
    };

    await StudentService.unenrollFromCourse(unenrollCourse)
      .then((res) => {
        Alert({
          message: `Unenrolled from ${courseId} succefully`,
          type: "success",
        });
      })
      .catch((err) => {
        Alert({
          message: err.message,
          type: "error",
        });
      });
    dispatch(getStudentEnrollCourseIds());
    navigate(-1);
  };

  const handleOnCancel = () => {
    setUnerollConfirmationDialogOpen(false);
  };

  const handleOnToggleAnnoucementBtn = () => {
    setAnnouncementOpen(!isAnnoucementSectionOpen);
  };

  return (
    <Container>
      {isUnenrollConfirmationDialogOpen && (
        <ConfirmationDialog
          title={`Want to unenroll from ${courseId} ?`}
          handleOnAccept={handleOnAccept}
          handleOnCancel={handleOnCancel}
        />
      )}
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
            onClick={handleOnClickUnenroll}
            sx={{
              margin: 1,
            }}
            size="small"
            startIcon={<ExitToAppIcon/>}
          >
            Unenroll
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

      <Typography>{courseDetails.course_description}</Typography>

      <Stack>
        <CourseNoteCard />
        <CourseNoteCard />
        <CourseNoteCard />
      </Stack>
    </Container>
  );
};

export default StudentCourse;
