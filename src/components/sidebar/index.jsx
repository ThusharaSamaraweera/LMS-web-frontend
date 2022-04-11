import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Dashboard } from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import CoursesMenu from "./CoursesMenu";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Sidebar = () => {
  const theme = useTheme();
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const sidebarItems = [
    {
      text: "Dashboard",
      type: "main",
      icon: <Dashboard />,
    },
    {
      text: "Courses",
      type: "main",
      icon: <SchoolIcon />,
    },
  ];

  const enrollCourses = [
    {
      level: 1,
      courses: [
        "course1",
        "course2",
        "course3",
        "course4",
      ]
    },
    {
      level: 2,
      courses: [
        "course5",
        "course6",
        "course7",
        "course8",
      ]
    },

  ]

  return (
    <Drawer variant="permanent" open={isDrawerOpen}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <List>
        {sidebarItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton
              key={index}
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? "initial" : "center",
                pl: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isDrawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: isDrawerOpen ? 1 : 1 }}
              />
            </ListItemButton>

            {item.text === "Courses" && (
              <CoursesMenu enrollCourses={enrollCourses}/>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;