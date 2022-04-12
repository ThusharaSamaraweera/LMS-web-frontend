import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Dashboard } from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import CoursesMenu from "./CoursesMenu";

const drawerWidth = 256;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Sidebar = (props) => {
  const {isDrawerOpen, toggleDrawer} =  props;
  const theme = useTheme();

  const handleDrawerClose = () => {
    toggleDrawer()
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
    {
      level: 3,
      courses: [

      ]
    },
  ]

  return (
    <StyledDrawer variant="permanent" open={isDrawerOpen}>
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
                sx={{ opacity: isDrawerOpen ? 1 : 0 }}
              />
            </ListItemButton>

            {item.text === "Courses" && isDrawerOpen && (
              <CoursesMenu enrollCourses={enrollCourses}/>
            )}
          </React.Fragment>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;