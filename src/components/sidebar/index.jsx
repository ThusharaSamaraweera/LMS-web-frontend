import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Dashboard } from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import CoursesMenu from "./CoursesMenu";
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useNavigate, Outlet } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { ROLES } from "../../constants/roles";
import {useSelector} from 'react-redux';
import GradingIcon from '@mui/icons-material/Grading';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProtectedComponent from '../utilsComponents/ProtectedComponent'

const drawerWidth = 256;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = (props) => {
  const { isDrawerOpen, toggleDrawer } = props;
  const theme = useTheme();
  const navigate = useNavigate()
  const currentUserRole = useSelector(state => state.authReducer.authUser.role[0].roleName);
  // const courses = useSelector(state => state.lecturerReducer.courses);

  const handleDrawerClose = () => {
    toggleDrawer();
  };

  const sidebarItems = [
    {
      text: "Home",
      type: 'main',
      icon: <HomeIcon/>,
      path: '/',
    },
    {
      text: "Dashboard",
      type: "main",
      icon: <Dashboard />,
      path: '/dashboard'
    },
    {
      text: "Courses",
      type: "main",
      icon: <SchoolIcon />,
    },
  ];

  // courses those are being taught by lecturer logged in
  const lecturerCourse = useSelector((state) => state.lecturerReducer.courses);

  // courses those had been enrolled by the student logged in
  const studentCourse = useSelector(
    (state) => state.studentReducer.enrollCourseIds
  );

  // all course in university
  const allCourses = useSelector((state) => state.courseReducer.courses);

  let courses = [];

  if (currentUserRole === ROLES.STUDENT) {
    const course_ids = studentCourse.map((course) =>
      course.enrolled_course_id.toLowerCase()
    );

    const getDetailsOfCourse = () => {
      allCourses.forEach((detailCourse) => {
        if (course_ids.includes(detailCourse.course_id.toLowerCase())) {
          courses.push(detailCourse);
        }
      });
    };
    getDetailsOfCourse();

  } else if (currentUserRole === ROLES.LECTURER) {
    courses = courses.concat(lecturerCourse);
  }

  return (
    <StyledDrawer variant="permanent" open={isDrawerOpen}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <MoreVertIcon />
          ) : (
            <MoreVertIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <List
        sx={{
          top: '10px'
        }}
      >
        {sidebarItems.map((item, index) => (
          <React.Fragment key={index}>
            <Link to={item?.path || ''}>
              <Tooltip title={item.text} placement="right-start">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isDrawerOpen ? "initial" : "center",
                    pl: 2.5,
                    color: 'gray'
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
              </Tooltip>
            </Link>

            {item.text === "Courses" && isDrawerOpen && (
              <CoursesMenu courses={courses} />
            )}
            <Outlet/>
          </React.Fragment>
        ))}

        <ProtectedComponent allowedRoles={[ROLES.STUDENT]}>
        <>
          <Link to='/dashboard/grades'>
            <Tooltip title="Grades" placement="right-start">
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isDrawerOpen ? "initial" : "center",
                  pl: 2.5,
                  color: 'gray'
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isDrawerOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GradingIcon/>
                </ListItemIcon>
                <ListItemText
                  primary='Grades'
                  sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </Link>
        </>
        </ProtectedComponent>        

        <ProtectedComponent allowedRoles={[ROLES.LECTURER]}>
          <Link to='/dashboard/courses-management'>
              <Tooltip title="Course management" placement="right-start">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isDrawerOpen ? "initial" : "center",
                    pl: 2.5,
                    color: 'gray'
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isDrawerOpen ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <SettingsIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary='Course management'
                    sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
          </Link>
        </ProtectedComponent>

        <Link to='/dashboard/more'>
          <Tooltip title="More" placement="right-start">
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? "initial" : "center",
                pl: 2.5,
                color: 'gray'
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isDrawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <InfoIcon/>
              </ListItemIcon>
              <ListItemText
                primary='More'
                sx={{ opacity: isDrawerOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </Tooltip>
        </Link>
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
