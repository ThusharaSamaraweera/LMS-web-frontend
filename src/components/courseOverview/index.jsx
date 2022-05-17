import React from "react";
import Typography from "@mui/material/Typography";
import CourseCard from "./CourseCard";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { ROLES } from "../../constants/roles";
import { Empty } from "antd";

const CourseOverview = () => {
  const currentUserRole = useSelector(
    (state) => state.authReducer.authUser.role[0].roleName
  );

  // courses those are being taught by lecturer logged in
  const lecturerCourse = useSelector((state) => state.lecturerReducer.courses);

  // courses those had been enrolled by the student logged in
  const studentCourse = useSelector(
    (state) => state.studentReducer.enrollCourseIds
  );

  // all course in university
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
      {courses.length > 0 ? (
        renderLecturerCourses
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No courses" />
      )}
    </Container>
  );
};

export default CourseOverview;
