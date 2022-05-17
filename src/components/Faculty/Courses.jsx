import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Collapse } from "antd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../utilsComponents/Alert";
import ConfirmationDialog from "../utilsComponents/ConfirmationDialog";
import { useState } from "react";
import StudentService from "../../services/student.service";
import { getStudentEnrollCourseIds } from "../../store/actions/studentAction";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const { Panel } = Collapse;

const Courses = () => {
  const { department } = useParams();
  const dispatch = useDispatch();
  const allCourses = useSelector((state) => state.courseReducer.courses);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const userEmail = useSelector((state) => state.authReducer.authUser.username);
  const [enrollingCourseId, setEnrollingCourseId] = useState("");
  const enrollledCourses = useSelector(
    (state) => state.studentReducer.enrollCourseIds
  );
  const enrolledCourseIds = enrollledCourses.map(
    (course) => course.enrolled_course_id
  );

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

    // enroll to course
    StudentService.enrollToCourse(course)
      .then((res) => {
        Alert({ message: "Enrolled", type: "success" });
        dispatch(getStudentEnrollCourseIds());
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
    let enrolled = null;

    return categorizedCourses.map((course) => {
      // check whether the student has been enrolled or not in this course
      enrolled = enrolledCourseIds.includes(course.course_id);

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
            {enrolled ? (
              <Typography color={"brown"}>ENROLLED</Typography>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleOnClickEnroll(course.course_id)}
                startIcon={<ArrowCircleRightIcon />}
              >
                Enroll me
              </Button>
            )}
          </Grid>
        </Grid>
      );
    });
  };

  return (
    <>
      {isConfirmationDialogOpen && (
        <ConfirmationDialog
          title={`Do you want to enroll to ${enrollingCourseId}?`}
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
            <Panel header="Semester 2" key="2">
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
            <Panel header="Semester 2" key="2">
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
            <Panel header="Semester 2" key="2">
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
            <Panel header="Semester 2" key="2">
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
