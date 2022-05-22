import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseService from "../../services/course.service";
import CourseNoteCard from "./CourseNoteCard";

const CourseContent = (props) => {
  const { courseName, academicYear } = props;
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetchCourseContent();
  }, [courseName, academicYear]);

  const fetchCourseContent = async () => {
    await CourseService.getCourseContent(courseName, academicYear)
      .then((res) => {
        setNotes(res)
      })
  };

  const renderContent = notes?.map((note, index) => {
    return <CourseNoteCard key={index} note={note} />
  })

  return (
    <Stack>
      {renderContent}
    </Stack>
  );
};

export default CourseContent;
