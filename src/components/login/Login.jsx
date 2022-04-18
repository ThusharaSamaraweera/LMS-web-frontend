import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Appbar from "../home/Appbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const handleOnUsernameChanged = (inputUsername) => {
    setUsername(inputUsername);
  };

  const handleOnPasswordChanged = (inputPassword) => {
    setPassword(inputPassword);
  };

  const handleOnPasswordVisible = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <Appbar />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            border: 1,
            width: "400px",
            margin: 2,
            padding: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            error={usernameError}
            id="standard-error-helper-text"
            label="Username"
            helperText="Incorrect entry."
            variant="standard"
            type={"email"}
            placeholder="university email"
            sx={{
              marginY: 1,
            }}
          />

          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={() => handleOnPasswordChanged("password")}
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
          <Button variant="contained" sx={{marginY: 1, width: '100px', marginX: 'auto'}}>
            Login
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
