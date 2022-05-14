import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import CourseCard from "./CourseCard";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { ROLES } from "../../constants/roles";

const CourseOverview = () => {
  const currentUserRole = useSelector(
    (state) => state.authReducer.authUser.role[0].roleName
  );
  const lecturerCourse = useSelector((state) => state.lecturerReducer.courses);
  const studentCourse = useSelector(
    (state) => state.studentReducer.enrollCourses
  );
  const allCourses = useSelector((state) => state.courseReducer.courses);

  let courses = [];

  if (currentUserRole === ROLES.STUDENT) {
    const course_ids = studentCourse.map((course) =>
      course.enrolled_course_id.toLowerCase()
    );

    const getDetailsOfCourse = () => {
      allCourses.forEach((detailCourse) => {
        if (course_ids.includes(detailCourse.course_id.toLowerCase())) {
          courses.push(detailCourse);
        }
      });
    };
    getDetailsOfCourse();
  } else if (currentUserRole === ROLES.LECTURER) {
    courses = courses.concat(lecturerCourse);
  }

  const renderLecturerCourses = courses.map((course, index) => {
    return <CourseCard course={course} key={index} />;
  });

  return (
    <Container>
      <Typography variant="h5" gutterBottom component="div">
        Course overview
      </Typography>
      {renderLecturerCourses}
    </Container>
  );
};

export default CourseOverview;
