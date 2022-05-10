import { Box, Typography } from "@mui/material";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
// submenu keys of first level
const openedMenu = [];

const CoursesMenu = (props) => {
  const { courses } = props;

  // categorize courses by level
  const level1Courses = courses.filter((course) => course.course_id[4] === "1");
  const level2Courses = courses.filter((course) => course.course_id[4] === "2");
  const level3Courses = courses.filter((course) => course.course_id[4] === "3");
  const level4Courses = courses.filter((course) => course.course_id[4] === "4");

  const [openKeys, setOpenKeys] = useState([]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (openedMenu.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const renderCourses = (courses) => {
    if (courses.length === 0) {
      return (
        <Box
          sx={{
            height: 20,
          }}
          textAlign="center"
        >
          <Typography
            variant="overline"
            sx={{
              fontSize: 10,
              color: "red",
            }}
          >
            No courses
          </Typography>
        </Box>
      );
    }

    return courses.map((course, index) => {
      return (
        <Box key={course.course_id} sx={{marginLeft: 2}}>
          <Link to={`course/${course.course_id}`} >
            <Menu.Item style={{ color: "gray" }}>
              {course.course_name}
            </Menu.Item>
          </Link>
        </Box>
      );
    });
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
    >
      <SubMenu key="level1" title={`Level 1`}>
        {renderCourses(level1Courses)}
      </SubMenu>

      <SubMenu key="level2" title={`Level 2`}>
        {renderCourses(level2Courses)}
      </SubMenu>

      <SubMenu key="level3" title={`Level 3`}>
        {renderCourses(level3Courses)}
      </SubMenu>

      <SubMenu key="level4" title={`Level 4`}>
        {renderCourses(level4Courses)}
      </SubMenu>
    </Menu>
  );
};

export default CoursesMenu;
