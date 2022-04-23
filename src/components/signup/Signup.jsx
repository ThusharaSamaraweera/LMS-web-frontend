import {
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Appbar from "../home/Appbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
  const [universityEmail, setUniversityEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleOnUnversityEmailChanged = (email) => {
    setUniversityEmail(email);
  };

  const handleOnPasswordChanged = (password) => {
    setPassword(password);
  };

  const handleOnPasswordVisible = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Appbar />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
          marginX: 3,
        }}
      >
        <Stack
          sx={{
            border: 1,
            width: "500px",
            marginY: "auto",
            marginX: "auto",
            paddingTop: 2,
            paddingBottom: 5,
            paddingX: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AccountCircleIcon sx={{ marginX: "auto", fontSize: 60 }} />
          <Typography
            align="center"
            sx={{
              marginY: 2,
              fontSize: {
                xs: "1rem",
                sm: "2rem",
              },
            }}
          >
            Signup
          </Typography>

          <Box
            flexDirection="row"
            sx={{ display: "flex", justifyContent: "center", marginY: 1 }}
          >
            <Typography
              component="label"
              sx={{
                paddingY: 1,
                width: "12rem",
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                },
              }}
            >
              University email
            </Typography>
            <Input
              id="university-email"
              type="text"
              value={universityEmail}
              onChange={(e) => handleOnUnversityEmailChanged(e.target.value)}
              fullWidth={true}
              sx={{
                marginX: 0,
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                }
              }}
            ></Input>
          </Box>

          <Box
            flexDirection="row"
            sx={{ display: "flex", justifyContent: "center", marginY: 1 }}
          >
            <Typography
              variant="body1"
              component="label"
              sx={{
                paddingY: 1,
                width: "12rem",
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                },
              }}
            >
              Password
            </Typography>
            <Input
              id="standard-adornment-password"
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => handleOnPasswordChanged(e.target.value)}
              fullWidth={true}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleOnPasswordVisible()}
                  >
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                },
              }}
            />
          </Box>
          <Button
            variant="contained"
            sx={{
              marginY: 2,
              width: "100px",
              marginX: "auto",
              fontSize: {
                xs: "0.8rem",
                sm: "1rem",
              },

            }}
            onClick={(e) => handleOnSubmit(e)}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Signup;
