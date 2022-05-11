import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Appbar from "../home/Appbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from '../utilsComponents/Alert'
import { Link } from "react-router-dom";

const Signup = () => {
  const [universityEmail, setUniversityEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isEmailDisabled, setEmailDisable] = useState(false)
  const [universityEmailError, setUniversityEmailError] =  useState("")
  const [otp, setOtp] = useState("1234")
  const [inputOtp, setInputOtp] = useState("")
  const [userType, setUserType] = useState("Student")

  const handleOnUnversityEmailChanged = (email) => {
    setUniversityEmail(email);
  };

  const handleOnOtpChange = (otp) => {
    setInputOtp(otp)
  }

  const handleOnPasswordChanged = (password) => {
    setPassword(password);
  };

  const handleOnPasswordVisible = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleOnSignClick = (e) => {
    e.preventDefault();
  };

  const handleOnVerifyEmail = (e) => {
    if(universityEmail === ""){
      setUniversityEmailError("required")
      return
    }
    setEmailValid("pending")
    setEmailDisable(true)
    setUniversityEmailError("")
  }

  const handleOnVerifyaOTP = () => {
    if(inputOtp === otp){
      setEmailValid(true)
    }else{
      Alert({
        message: "Invalid otp",
        type: 'error'
      })
    }
  }

  const handleOnSelectUserType = (e) => {
    setUserType(e.target.value)
  }

  const handleOnCancelOtp = () => {
    setUniversityEmail("")
    setEmailDisable(false)
    setEmailValid(false)
    setOtp("")
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

          {
            isEmailValid === true &&
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
                  User type
              </Typography>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userType}
                label="Age"
                onChange={handleOnSelectUserType}
                fullWidth
                variant="standard"
              >
                <MenuItem value={"Student"}>Student</MenuItem>
                <MenuItem value={"Lecturer"}>Lecturer</MenuItem>
              </Select>
            </Box>

          }

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

              <TextField
                id="university-email"
                type="email"
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
                variant="standard"
                disabled={isEmailDisabled}
                helperText={universityEmailError}
                error={Boolean(universityEmailError)}
              ></TextField>
          </Box>

          {
            isEmailValid === 'pending' &&
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
                OTP
              </Typography>
              <TextField
                id="otp"
                type="number"
                value={inputOtp}
                onChange={(e) => handleOnOtpChange(e.target.value)}
                fullWidth={true}
                sx={{
                  marginX: 0,
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  }
                }}
                variant="standard"
              ></TextField>
            </Box>

          }

          {
            isEmailValid === false &&
            <>
              <Button
                variant="contained"
                sx={{
                  marginY: 2,
                  width: "150px",
                  marginX: "auto",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },

                }}
                onClick={(e) => handleOnVerifyEmail(e)}
              >
                Send otp
              </Button>

            </>
          }
          
          {
            isEmailValid === "pending" &&
            <Box
              flexDirection="row"
              sx={{ display: "flex", justifyContent: "center", marginY: 1 }}
            >
              <Button
                variant="contained"
                sx={{
                  marginY: 2,
                  width: "150px",
                  marginX: "auto",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },

                }}
                onClick={(e) => handleOnVerifyaOTP(e)}
              >
                Verify OTP
              </Button>
              <Button
                variant="outlined"
                sx={{
                  marginY: 2,
                  width: "150px",
                  marginX: "auto",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },

                }}
                onClick={handleOnCancelOtp}
              >
                Cancel
              </Button>
            </Box>
          }

          {
            isEmailValid === true && 
            <>
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

              <Box
                flexDirection="row"
                sx={{ display: "flex", justifyContent: "center", marginY: 1 }}
              >
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
                  onClick={(e) => handleOnSignClick(e)}
                >
                  Signup
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    marginY: 2,
                    width: "100px",
                    marginX: "auto",
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                    },

                  }}
                  onClick={(e) => handleOnCancelOtp(e)}
                >
                  Cancel
                </Button>
              </Box>

            </>
          }
          <Link to='/login'>
            Have a account ? 
          </Link>
        </Stack>
      </Box>
    </>
  );
};

export default Signup;
