import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Collapse } from "antd";
import AnnouncementCard from "./AnnouncementCard";
import StudentService from "../../services/student.service";
import AnnouncementForm from "./AnnouncementForm";
import ProtectComponent from '../utilsComponents/ProtectedComponent'
import {ROLES} from '../../constants/roles'

const AnnouncementSection = (props) => {
  const { courseId } = props;
  const [announcements, setAnnouncement] = useState([]);
  // get all courses in university
  const courses = useSelector((state) => state.courseReducer.courses);
  const [loading, setLoading] = useState(false);
  const [isAnnouncementFormVisible, setAnnouncemntFormVisible] =
    useState(false);
  const [academicYear, setAcademinYear] = useState("");

  useEffect(() => {
    let tempAcademicYear = "";
    courses.map((course) => {
      if (course.course_id === courseId) {
        tempAcademicYear = course.academic_year;
      }
    });
    setAcademinYear(tempAcademicYear);
    const course = {
      category: courseId,
      academicYear: tempAcademicYear,
    };

    fetchAnnouncements(course);
  }, []);

  // fetch all annoucements corresponding course
  const fetchAnnouncements = async (course) => {
    setLoading(true);
    await StudentService.getNotfications(course).then((res) => {
      setAnnouncement(res);
    });
    setLoading(false);
  };

  const handleOnAddAnnouncementBtnClick = () => {
    setAnnouncemntFormVisible(!isAnnouncementFormVisible);
  };

  return (
    <Box
      sx={{
        marginY: 5,
        border: 2,
        padding: 2,
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: 2,
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
            }}
          >
            Announcements
          </Typography>
        </Grid>

        <ProtectComponent allowedRoles={[ROLES.LECTURER]}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: "16px",
              textAlign: "end",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={handleOnAddAnnouncementBtnClick}
            >
              {isAnnouncementFormVisible ? "Collapse form" : "Add Announcement"}
            </Button>
          </Grid>
        </ProtectComponent>
      </Grid>

      {isAnnouncementFormVisible && (
        <AnnouncementForm
          courseId={courseId}
          academicYear={academicYear}
          fetchAnnouncements={fetchAnnouncements}
        />
      )}

      {/* annoucements goes here */}

      {!loading &&
        (announcements.length === 0 ? (
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
          <>
            <Typography
              sx={{
                paddingX: 2,
                paddingTop: 2,
                fontSize: "15px",
              }}
            >
              Past annoucements
            </Typography>
            <Collapse ghost>
              <AnnouncementCard announcements={announcements} />
            </Collapse>
          </>
        ))}
    </Box>
  );
};

export default AnnouncementSection;
