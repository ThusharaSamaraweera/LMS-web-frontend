import { Backdrop, Box, CircularProgress, CssBaseline} from "@mui/material";
import React, { useState } from "react";
import MainContent from "./MainContent";
import Navbar from "../navbar";
import Sidebar from "../sidebar";

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
  }, 2000);

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "red", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleOnLoading}
        onBlurCapture={false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <Box>
      <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <CssBaseline />
      <Sidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <MainContent isDrawerOpe={isDrawerOpen} />
    </Box>
  );
};

export default Dashboard;
