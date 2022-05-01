import { Box, Button } from "@mui/material";
import React from "react";
import Appbar from "./Appbar";
import CarouselImages from "./CarouselImages";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

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
          marginY: 2,
          height: 40,
        }}
      >
        <Button
          color="secondary"
          onClick={() => handleOnClickLogin()}
          variant={"outlined"}
          sx={{
            marginX: 1,
          }}
        >
          Login
        </Button>
        <Button
          color="secondary"
          onClick={() => handleOnClickSignup()}
          variant={"outlined"}
          sx={{
            marginX: 1,
          }}
        >
          Signup
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
