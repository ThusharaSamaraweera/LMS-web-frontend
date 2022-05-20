import { Backdrop, Box, CircularProgress, CssBaseline} from "@mui/material";
import React, { useState } from "react";
import MainContent from "./MainContent";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import Footer from "./Footer";

const Dashboard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleOnLoading = () => {
    setLoading(false);
  };

  setTimeout(() => {
    handleOnLoading()
  }, 800);

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "blue", zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'white' }}
        open={isLoading}
        onClick={handleOnLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }
  return (
    <Box>
      <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <CssBaseline />
      <Sidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <MainContent isDrawerOpe={isDrawerOpen} />
      <Footer/>
    </Box>
  );
};

export default Dashboard;
