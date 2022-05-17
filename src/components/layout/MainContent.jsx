import React from 'react'
import { styled } from '@mui/material/styles';

import CourseOverview from '../courseOverview'
import { Route, Routes, Outlet } from 'react-router-dom';
import CourseManagement from '../courseManagement';
import { useSelector } from 'react-redux';
import { ROLES } from '../../constants/roles';
import LecturerCourse from '../lecturerCourse';
import Grades from '../courseGrades';
import More from '../more/routes';
import StudentProfile from '../studentProfile';
import LecturerProfile from '../lecturerProfile';
import AnnouncementManagement from '../announcement';
import StudentCourse from '../studentCourse';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const drawerWidth = 256;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `50px`,
    minHeight: '95vh',
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,

    }),
  }),
);

const MainContent = (props) => {
  const {isDrawerOpen} = props;
  const currentUserRole = useSelector(state => state.authReducer.authUser.role[0].roleName);

  return (
    <Main open={isDrawerOpen}>
      <DrawerHeader />
      <Routes>
        <Route index element={<CourseOverview/>} />
        <Route path='courses-management' element={<CourseManagement/>} />

        {
          currentUserRole === ROLES.STUDENT && (
            <>
              <Route path="course/:courseId" element={<StudentCourse />} />
              <Route path="grades" element={<Grades />} />
              <Route path='profile' element={<StudentProfile/>}/>
            </>
          )
        }

        {
          currentUserRole === ROLES.LECTURER && (
            <>
              <Route path='course/:courseId' element={<LecturerCourse />} />
              <Route path='profile' element={<LecturerProfile/>}/>
              <Route path='announcement' element={<AnnouncementManagement />}/>
            </>
          )
        }

        <Route path='more/*' element={<More/>}/>
      </Routes>
      <Outlet />
      
    </Main>
  )
}

export default MainContent
