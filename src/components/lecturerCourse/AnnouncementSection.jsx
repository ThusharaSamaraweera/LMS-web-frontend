import React, {useState, useEffect} from 'react'
import { Box,Typography } from '@mui/material'
import { useSelector } from "react-redux";
import AnnouncementCard from './AnnouncementCard'
import StudentService from '../../services/student.service'

const AnnouncementSection = (props) => {
  const {courseId} = props;
  const [announcements, setAnnouncement] = useState([])
  // get all courses in university
  const courses = useSelector((state) => state.courseReducer.courses);

  var academicYear = "";

  // fetch all annoucements corresponding course
  const fetchNotificationDetails = async () => {
    await StudentService.getNotfications(course).then((res) => {
      console.log(res)
      setAnnouncement(res);
    });
  };

  courses.map((course) => {
    if (course.course_id === courseId) {
      academicYear = course.academic_year;
    }
  });

  const course = {
    category: courseId,
    academicYear: academicYear,
  }

  const renderAnnouncements = () => {

  }

  
  useEffect(() => {
    fetchNotificationDetails();
  }, [courseId]);

  return (
    <Box
      sx={{
        marginY: 5,
        border: 2,
        padding: 2,
      }}
    >
      <Typography sx={{
        padding: 2,
        fontWeight:"bold",
        fontSize: '1.5rem'
      }}>
        Announcements
      </Typography>
        {/* annoucements goes here */ }
        <AnnouncementCard/>
        <AnnouncementCard/>
        <AnnouncementCard/>
    </Box>
  )
}

export default AnnouncementSection