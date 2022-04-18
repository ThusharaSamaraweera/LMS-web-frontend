import { Box, Button } from "@mui/material";
import React from "react";
import Appbar from "./Appbar";
import CarouselImages from "./CarouselImages";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleOnClickLogin = () => {
    navigate("/login");
  };

  const handleOnClickSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <Appbar />
      <CarouselImages />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginY: 3,
        }}
      >
        <Button color="secondary" onClick={() => handleOnClickLogin()}>
          Login
        </Button>
        <Button color="secondary">Signup</Button>
      </Box>
    </>
  );
};

export default Home;
