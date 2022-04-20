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
import { Link } from "react-router-dom";
import Appbar from "../home/Appbar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useDispatch} from 'react-redux'
import { login } from "../../store/actions/authAction";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isUsernameHasError, setUsernameHasError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const handleOnUsernameChanged = (inputUsername) => {
    setUsername(inputUsername);
  };

  const handleOnPasswordChanged = (inputPassword) => {
    setPassword(inputPassword);
  };

  const handleOnPasswordVisible = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault()

    dispatch(login({username, password}))
  }

  return (
    <>
      <Appbar />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
          height: '80vh',
        }}
      >
        <Stack
          sx={{
            border: 1,
            width: "400px",
            marginY: 'auto',
            marginX: 2,
            paddingTop: 2,
            paddingBottom: 5,
            paddingX: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AccountCircleIcon sx={{marginX: 'auto', fontSize: 60}} />
          <TextField
            error={isUsernameHasError}
            id="standard-error-helper-text"
            label="Username"
            helperText={usernameError}
            variant="standard"
            type={"email"}
            placeholder="university email"
            sx={{
              marginY: 2,
            }}
            onChange={(e) => handleOnUsernameChanged(e.target.value)}
          />

          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
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
          <Button variant="contained" sx={{marginY: 2, width: '100px', marginX: 'auto'}}
            onClick={(e) => handleOnSubmit(e)}
          >
            Login
          </Button>

          <Link to={'/signup'}>
            Do you haven't account? 
          </Link>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
