import { Collapse } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import StudentService from '../../services/student.service';

const AnnouncementCard = () => {
  const { Panel } = Collapse;
  const { courseId } = useParams();

  

  const course = {
    category: courseId,
    academicYear: "2018/2019"
  }

  const [notificationValues, setNotificationValues] = useState([]);

  const fetchNotificationDetails = async () => {
    await StudentService.getNotfications(course).then((res) => {
      setNotificationValues(res);
    });
  }

  useEffect(() => {
    fetchNotificationDetails();
  }, [])


  return (
    <Collapse accordion>
     
    </Collapse>

  );
}

export default AnnouncementCard;