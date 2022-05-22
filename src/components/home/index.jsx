import { Box, Button, Container } from "@mui/material";
import React from "react";
import Appbar from "./Appbar";
import CarouselImages from "./CarouselImages";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer.authUser)

  const handleOnClickLogin = () => {
    navigate("/login");
  };

  const handleOnClickSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <Appbar />
      <Box
        sx={{
          minHeight: '100vh'
        }}
      >
        <CarouselImages />

      {
        !user &&
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginY: 5,
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
      }
      </Box>
      <Footer />
    </>
  );
};

export default Home;
