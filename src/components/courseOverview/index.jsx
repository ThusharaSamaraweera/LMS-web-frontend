import React from 'react'
import Typography from '@mui/material/Typography';
import CourseCard from './CourseCard';
import { Box, Container } from '@mui/material';
import {useSelector} from 'react-redux'
import { ROLES } from '../../constants/roles';

const CourseOverview = () => {
  const currentUserRole = useSelector((state) => state.authReducer.authUser.role[0].roleName);
  const lecturerCourse = useSelector(state => state.lecturerReducer.courses);
  const studentCourse = useSelector((state) => state.studentReducer.enrollCourses)
  const allCourses = useSelector((state) => state.courseReducer.courses)

  let courses = lecturerCourse;
  // if(currentUserRole === ROLES.STUDENT){
  //   courses = studentCourse
  // }else if(currentUserRole === ROLES.LECTURER) {
  //   courses = lecturerCourse
  // }

  const renderLecturerCourses = courses?.map((course, index) => {
    return <CourseCard course={course} key={index}/>
  })

  return (
    <Container>
      <Typography variant="h5" gutterBottom component="div">
        Course overview
      </Typography>
      {renderLecturerCourses}

    </Container>
  )
}

export default CourseOverview
