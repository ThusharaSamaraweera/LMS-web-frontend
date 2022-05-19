import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'

import AddGradeTable from "./AddGradeTable";
import StudentService from "../../services/student.service";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import AnnouncementSection from "../announcement/AnnouncementSection";
import CourseContent from "./CourseContent";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddNotesSection from "./AddNotesSection";
import ConfirmationDialog from "../utilsComponents/ConfirmationDialog";
import Alert from "../utilsComponents/Alert";
import { getStudentEnrollCourseIds } from "../../store/actions/studentAction";
import ProtectedComponent from "../utilsComponents/ProtectedComponent";
import { ROLES } from "../../constants/roles";

const LecturerCourse = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmail = useSelector((state) => state.authReducer.authUser.username);
  const [isGradeTableVisible, setGradeTableVisible] = useState(false);
  const [courseDetails, setCourseDetails] = useState({});
  const [isAnnoucementSectionOpen, setAnnouncementOpen] = useState(false);
  const [isAddNoteSectionOpen, setAddNoteSection] = useState(false)
  const [isUnenrollConfirmationDialogOpen, setUnerollConfirmationDialogOpen] =
    useState("");

  useEffect(() => {
    fetchCourseDetail();
  }, [courseId]);

  const handleOnAddGradeBtnClick = () => {
    setGradeTableVisible(!isGradeTableVisible);
  };

  const fetchCourseDetail = async () => {
    await StudentService.getCourseDetails(courseId).then((res) => {
      setCourseDetails(res);
    });
  };

  const handleOnToggleAnnoucementBtn = () => {
    setAnnouncementOpen(!isAnnoucementSectionOpen);
  };

  const handleOnToggleAddNotes = () => {
    setAddNoteSection(!isAddNoteSectionOpen)
  }

  const handleOnClickUnenroll = () => {
    setUnerollConfirmationDialogOpen(true);
  };

  const handleOnAcceptUnenroll = async () => {
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
  }

  const handleOnCancelUnenroll = () => {
    setUnerollConfirmationDialogOpen(false);
  }

  return (
    <Container>
      {isUnenrollConfirmationDialogOpen && (
        <ConfirmationDialog
          title={`Want to unenroll from ${courseId} ?`}
          handleOnAccept={handleOnAcceptUnenroll}
          handleOnCancel={handleOnCancelUnenroll}
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
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ProtectedComponent allowedRoles={[ROLES.LECTURER]}>
            <Button
              variant="outlined"
              // onClick={handleOnClickUnenroll}
              sx={{
                margin: 1,
              }}
              size="small"
              startIcon={<ExitToAppIcon />}
            >
              Delete
            </Button>
          </ProtectedComponent>

          <ProtectedComponent allowedRoles={[ROLES.STUDENT]}>
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
          </ProtectedComponent>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "end", marginY: 2 }}>
      <ProtectedComponent allowedRoles={[ROLES.LECTURER]}>
        <Button
          variant="outlined"
          onClick={handleOnAddGradeBtnClick}
          size="small"
          sx={{
            margin: 1,
          }}
          startIcon={<AddCircleIcon/>}
        >
          {isGradeTableVisible ? "Collapse table" : "Add grades"}
        </Button>

        <Button
          variant="outlined"
          onClick={handleOnToggleAddNotes}
          sx={{
            margin: 1,
          }}
          size="small"
          startIcon={<NoteAddIcon />}
        >
          {isAddNoteSectionOpen ? "Close adding note" : "Add notes"}
        </Button>
      </ProtectedComponent>

        <Button
          variant="outlined"
          onClick={handleOnToggleAnnoucementBtn}
          sx={{
            margin: 1,
          }}
          size="small"
          startIcon={<AnnouncementIcon />}
        >
          {isAnnoucementSectionOpen ? "Close Announcement" : "Announcement"}
        </Button>


      </Box>

      <ProtectedComponent allowedRoles={[ROLES.LECTURER]}>
        {isGradeTableVisible && <AddGradeTable courseId={courseId} />}
        {isAddNoteSectionOpen && <AddNotesSection /> }
      </ProtectedComponent>

      {isAnnoucementSectionOpen && <AnnouncementSection courseId={courseId} />}


      <CourseContent />
    </Container>
  );
};

export default LecturerCourse;
