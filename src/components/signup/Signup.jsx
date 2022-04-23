import { Box, Button, FormControl, IconButton, Input, InputAdornment, Stack, TextField, Typography } from "@mui/material";
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
    setPassword(password)
  }

  const handleOnPasswordVisible = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  
  const handleOnSubmit = (e) => {
    e.preventDefault()

  }

  return (
    <>
      <Appbar />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Stack
          sx={{
            border: 1,
            width: "400px",
            marginY: "auto",
            marginX: 2,
            paddingTop: 2,
            paddingBottom: 5,
            paddingX: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AccountCircleIcon sx={{ marginX: "auto", fontSize: 60 }} />
          <Typography align="center" variant="h4" sx={{marginY: 2}}>
            Signup
          </Typography>

          <Box flexDirection="row" sx={{display: 'flex', justifyContent: 'start', marginY: 1}}>
            <Typography
              variant="body1"
              component="label"
              sx={{
                paddingY: 1,
                width: "130px",
              }}
            >
              University email
            </Typography>
            <Input
              id="university-email"
              type="text"
              value={universityEmail}
              onChange={(e) => handleOnUnversityEmailChanged(e.target.value)}
              sx={{
                marginX: 0,
              }}
            ></Input>
          </Box>

          <Box flexDirection="row" sx={{display: 'flex', justifyContent: 'start'}}>
            <Typography
              variant="body1"
              component="label"
              sx={{
                paddingY: 1,
                width: "130px",
              }}
            >
              Password
            </Typography>
            <FormControl variant="standard">
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
              />
          </FormControl>
          </Box>
          <Button variant="contained" sx={{marginY: 2, width: '100px', marginX: 'auto'}}
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
