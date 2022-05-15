import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Collapse } from "antd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../utilsComponents/Alert";
import ConfirmationDialog from "../utilsComponents/ConfirmationDialog";
import { useState } from "react";
import StudentService from "../../services/student.service";
import { getStudentEnrollCourses } from "../../store/actions/studentAction";

const { Panel } = Collapse;

const Courses = () => {
  const { department } = useParams();
  const allCourses = useSelector((state) => state.courseReducer.courses);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const userEmail = useSelector((state) => state.authReducer.authUser.username);
  const [enrollingCourseId, setEnrollingCourseId] = useState("");
  const dispatch = useDispatch()

  const categorizeCourses = (level, semester) => {
    return allCourses.filter(
      (course) =>
        parseInt(course.course_id[4]) === level &&
        parseInt(course.course_id[5]) === semester &&
        course.department_name.toLowerCase() === department.toLowerCase()
    );
  };

  const handleOnAccept = () => {
    console.log("accept");
    setConfirmationDialogOpen(false);

    const course = {
      enrolled_course_id: enrollingCourseId,
      student_email: userEmail,
    };

    StudentService.enrollToCourse(course)
      .then((res) => {
        Alert({ message: "Enrolled", type: "success" });
        dispatch(getStudentEnrollCourses())
      })
      .catch((err) => {
        Alert({ message: err.message, type: "error" });
      });
  };

  const handleOnCancel = () => {
    console.log("cancel");
    setConfirmationDialogOpen(false);
  };

  const handleOnClickEnroll = (courseId) => {
    setEnrollingCourseId(courseId);
    setConfirmationDialogOpen(true);
  };

  const renderCourses = (level, semester) => {
    const categorizedCourses = categorizeCourses(level, semester);
    return categorizedCourses.map((course) => {
      return (
        <Grid
          container
          sx={{
            marginY: 1,
          }}
          key={course.course_id}
        >
          <Grid item xs={12} sm={3}>
            <Typography>{course.course_id}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography>{course.course_name}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleOnClickEnroll(course.course_id)}
            >
              Enroll me
            </Button>
          </Grid>
        </Grid>
      );
    });
  };

  return (
    <>
      {isConfirmationDialogOpen && (
        <ConfirmationDialog
          title={"Do you want to enroll?"}
          handleOnAccept={handleOnAccept}
          handleOnCancel={handleOnCancel}
        />
      )}
      <Collapse defaultActiveKey={[1, 2, 3, 4]}>
        <Panel header="Level 1" key="1">
          <Collapse>
            <Panel header="Semester 1" key="1">
              <Box>
                <Stack>{renderCourses(1, 1)}</Stack>
              </Box>
            </Panel>
            <Panel header="Semester 1" key="2">
              <Box>
                <Stack>{renderCourses(1, 2)}</Stack>
              </Box>
            </Panel>
          </Collapse>
        </Panel>

        <Panel header="Level 2" key="2">
          <Collapse>
            <Panel header="Semester 1" key="1">
              <Box>
                <Stack>{renderCourses(2, 1)}</Stack>
              </Box>
            </Panel>
            <Panel header="Semester 1" key="2">
              <Box>
                <Stack>{renderCourses(2, 2)}</Stack>
              </Box>
            </Panel>
          </Collapse>
        </Panel>

        <Panel header="Level 3" key="3">
          <Collapse>
            <Panel header="Semester 1" key="1">
              <Box>
                <Stack>{renderCourses(3, 1)}</Stack>
              </Box>
            </Panel>
            <Panel header="Semester 1" key="2">
              <Box>
                <Stack>{renderCourses(3, 2)}</Stack>
              </Box>
            </Panel>
          </Collapse>
        </Panel>

        <Panel header="Level 4" key="4">
          <Collapse>
            <Panel header="Semester 1" key="1">
              <Box>
                <Stack>{renderCourses(4, 1)}</Stack>
              </Box>
            </Panel>
            <Panel header="Semester 1" key="2">
              <Box>
                <Stack>{renderCourses(4, 2)}</Stack>
              </Box>
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
    </>
  );
};

export default Courses;
