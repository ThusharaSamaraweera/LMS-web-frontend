import { Box, Container, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../navbar";
import Sidebar from "../sidebar";

const Dashboard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box>
      <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <CssBaseline />
      <Sidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </Box>
  );
};

export default Dashboard;
