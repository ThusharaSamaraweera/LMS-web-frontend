import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentService from "../../services/student.service";
import CourseNoteCard from "../CourseNoteCard";
import Alert from "../utilsComponents/Alert";
import ConfirmationDialog from "../utilsComponents/ConfirmationDialog";
import { useSelector, useDispatch } from "react-redux";
import { getStudentEnrollCourses } from "../../store/actions/studentAction";

const StudentCourse = () => {
  const userEmail = useSelector((state) => state.authReducer.authUser.username);
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState("");
  const [lecturer, setLecturerName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [isUnenrollConfirmationDialogOpen, setUnerollConfirmationDialogOpen] =
    useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchCourseDetail = async () => {
    await StudentService.getCourseDetails(courseId).then((res) => {
      setCourseName(res.course_name);
      setLecturerName(res.lecturer);
      setCourseDescription(res.course_description);
    });
  };

  useEffect(() => {
    fetchCourseDetail();
  }, []);

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
    dispatch(getStudentEnrollCourses());
    navigate(-1);
  };

  const handleOnCancel = () => {
    setUnerollConfirmationDialogOpen(false);
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
        <Grid item xs={12} sm={10}>
          <Box>
            <Typography>Course code : {courseId}</Typography>
            <Typography>Course name : {courseName}</Typography>
            <Typography>Lecturer : {lecturer}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="outlined" onClick={handleOnClickUnenroll}>
            Unenroll
          </Button>
        </Grid>
      </Grid>

      <Box>
        <Typography>{courseDescription}</Typography>
      </Box>
      <Stack>
        <CourseNoteCard />
        <CourseNoteCard />
        <CourseNoteCard />
      </Stack>
    </Container>
  );
};

export default StudentCourse;
