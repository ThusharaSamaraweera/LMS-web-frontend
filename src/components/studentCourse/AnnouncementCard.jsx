import { Typography } from "@mui/material";
import { Collapse } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StudentService from "../../services/student.service";

const AnnouncementCard = () => {
  const { Panel } = Collapse;
  const { courseId } = useParams();

  const courses = useSelector((state) => state.courseReducer.courses);

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

  const [notificationValues, setNotificationValues] = useState([]);

  const fetchNotificationDetails = async () => {
    await StudentService.getNotfications(course).then((res) => {
      setNotificationValues(res);
    });
  };

  useEffect(() => {
    fetchNotificationDetails();
  }, []);

  return (
    <Collapse ghost>
      {notificationValues?.length === 0 && (
        <Typography
          sx={{
            padding: 2,
            color: "red",
            fontSize: '15px'
          }}
        >
          No annoucement yet
        </Typography>
      )}
      {notificationValues.map((values, index) => (
        <Panel header={values.title} key={index} panelKey={index}>
          {values.body}
        </Panel>
      ))}
    </Collapse>
  );
};

export default AnnouncementCard;
