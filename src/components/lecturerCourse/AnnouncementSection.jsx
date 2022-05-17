import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Collapse } from "antd";
import AnnouncementCard from "./AnnouncementCard";
import StudentService from "../../services/student.service";

const AnnouncementSection = (props) => {
  const { courseId } = props;
  const [announcements, setAnnouncement] = useState([]);
  // get all courses in university
  const courses = useSelector((state) => state.courseReducer.courses);
  const [loading, setLoading] = useState(false);

  var academicYear = "";

  courses.map((course) => {
    if (course.course_id === courseId) {
      academicYear = course.academic_year;
    }
  });

  const course = {
    category: courseId,
    academicYear: academicYear,
  };

    // fetch all annoucements corresponding course
    const fetchNotificationDetails = async () => {
      setLoading(true);
      await StudentService.getNotfications(course).then((res) => {
        setAnnouncement(res);
      });
      setLoading(false);
    };

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
      <Typography
        sx={{
          padding: 2,
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        Announcements
      </Typography>

      {/* annoucements goes here */}
  
      {
        !loading  && (
          announcements.length === 0 ? (
          <Typography
            sx={{
              paddingX: 2,
              paddingY: 1,
              color: "red",
              fontSize: "15px",
            }}
          >
            No annoucements yet
          </Typography>
        ) : (
          <Collapse ghost>
            <AnnouncementCard announcements={announcements} />
          </Collapse>
        ))
      }
    </Box>
  );
};

export default AnnouncementSection;
