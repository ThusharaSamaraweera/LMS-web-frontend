import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
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
import Alert from "../utilsComponents/Alert";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { ROLES } from "../../constants/roles";
import Footer from "../home/Footer";

const Signup = () => {
  const [universityEmail, setUniversityEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isEmailDisabled, setEmailDisable] = useState(false);
  const [universityEmailError, setUniversityEmailError] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [userType, setUserType] = useState("Student");
  const [otp, setOtp] = useState();
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentIdError, setStudentIdError] = useState("");

  const navigate = useNavigate()

  const handleOnUnversityEmailChanged = (email) => {
    setUniversityEmail(email);
  };

  const handleOnOtpChange = (otp) => {
    setInputOtp(parseInt(otp));
  };

  const handleOnPasswordChanged = (inputPassword) => {
    if (inputPassword) {
      setPasswordError("");
    } else {
      setPasswordError("Password required");
    }
    setPassword(inputPassword);
  };

  const handleOnPasswordVisible = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const validateForm = () => {
    let isFormValid = true;

    if (!firstName) {
      setFirstNameError("First name is required");
      isFormValid = false
    }
    if (!lastName) {
      setLastNameError("Last name is required");
      isFormValid = false
    }
    if (!studentId) {
      setStudentIdError("Student is Id required");
      isFormValid = false
    }
    if (!password) {
      setPasswordError("Password is required");
      isFormValid = false
    }

    return isFormValid;
  }

  const handleOnSignClick = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm()
    if(!isFormValid){  
      return;
    }
    
    const user = {
      email: universityEmail,
      role: userType,
      firstName: firstName,
      lastName: lastName,
      id: studentId,
      password: password,
    };

    await authService
      .signup(user)
      .then((res) => {
        Alert({
          message: "Signup successfully",
          type: "success",
        });
        navigate("/login")
      })
      .catch((err) => {
        Alert({
          message: err.message,
          type: "error",
        });
      });
  };

  const handleOnVerifyEmail = async (e) => {
    if (universityEmail === "") {
      setUniversityEmailError("required");
      return;
    }
    await authService
      .getOtp(universityEmail)
      .then((res) => {
        console.log(res);
        setOtp(res.otp);
        setEmailValid("pending");
        setEmailDisable(true);
        setUniversityEmailError("");
      })
      .catch((err) => {
        console.log(err.message);
        Alert({ message: err.message, type: "error" });
      });
  };

  const handleOnVerifyaOTP = () => {
    if (inputOtp === parseInt(otp)) {
      setEmailValid(true);
    } else {
      Alert({
        message: "Invalid otp",
        type: "error",
      });
    }
  };

  const handleOnSelectUserType = (e) => {
    setUserType(e.target.value);
  };

  const handleOnCancelOtp = () => {
    setUniversityEmail("");
    setEmailDisable(false);
    setEmailValid(false);
    setInputOtp("");
    setOtp("");
  };

  const handleOnFirstNameChange = (inputFirstName) => {
    if (inputFirstName) {
      setFirstNameError("");
    } else {
      setFirstNameError("First name required");
    }
    setFirstName(inputFirstName);
  };

  const handleOnLastNameChange = (inputLastName) => {
    if (inputLastName) {
      setLastNameError("");
    } else {
      setLastNameError("Last name required");
    }
    setLastName(inputLastName);
  };

  const handleOnStudentIdChange = (inputId) => {
    if (inputId) {
      setStudentIdError("");
    } else {
      setStudentIdError("Student id is required");
    }
    setStudentId(inputId);
  };

  return (
    <>
      <Appbar />
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginY: 2,
          marginTop: 12,
          marginBottom: 3,
          minHeight: "95vh",
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

          {isEmailValid === true && (
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
                  User type
                </Typography>

                <Select
                  labelId="user-type-label"
                  id="user-type"
                  value={userType}
                  label="Age"
                  onChange={handleOnSelectUserType}
                  fullWidth
                  variant="standard"
                >
                  <MenuItem value={ROLES.STUDENT}>Student</MenuItem>
                  <MenuItem value={ROLES.LECTURER}>Lecturer</MenuItem>
                </Select>
              </Box>

              {userType === ROLES.STUDENT && (
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
                    Student ID
                  </Typography>

                  <TextField
                    id="studentId"
                    type="text"
                    value={studentId}
                    onChange={(e) => handleOnStudentIdChange(e.target.value)}
                    fullWidth={true}
                    sx={{
                      marginX: 0,
                      fontSize: {
                        xs: "0.8rem",
                        sm: "1rem",
                      },
                    }}
                    variant="standard"
                    helperText={studentIdError}
                    error={Boolean(studentIdError)}
                  ></TextField>
                </Box>
              )}

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
                  First name
                </Typography>

                <TextField
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => handleOnFirstNameChange(e.target.value)}
                  fullWidth={true}
                  sx={{
                    marginX: 0,
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                    },
                  }}
                  variant="standard"
                  helperText={firstNameError}
                  error={Boolean(firstNameError)}
                ></TextField>
              </Box>

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
                  Last name
                </Typography>

                <TextField
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => handleOnLastNameChange(e.target.value)}
                  fullWidth={true}
                  sx={{
                    marginX: 0,
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                    },
                  }}
                  variant="standard"
                  helperText={lastNameError}
                  error={Boolean(lastNameError)}
                ></TextField>
              </Box>
            </>
          )}

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
                },
              }}
              variant="standard"
              disabled={isEmailDisabled}
              helperText={universityEmailError}
              error={Boolean(universityEmailError)}
            ></TextField>
          </Box>

          {isEmailValid === "pending" && (
            <>
              <Typography
                component="label"
                sx={{
                  paddingY: 1,
                  fontSize: {
                    xs: "0.7rem",
                    sm: "0.9rem",
                  },
                  color: "red",
                }}
                textAlign="center"
              >
                We sent otp to {universityEmail}
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
                  OTP
                </Typography>
                <TextField
                  id="otp"
                  type="number"
                  value={inputOtp.toString()}
                  onChange={(e) => handleOnOtpChange(e.target.value)}
                  fullWidth={true}
                  sx={{
                    marginX: 0,
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                    },
                  }}
                  variant="standard"
                ></TextField>
              </Box>
            </>
          )}

          {isEmailValid === false && (
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
          )}

          {isEmailValid === "pending" && (
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
          )}

          {isEmailValid === true && (
            <>
              <Box
                flexDirection="row"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginY: 1,
                  marginX: 0,
                }}
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
                  error={Boolean(passwordError)}
                />
              </Box>
              <FormHelperText
                sx={{
                  marginLeft: "11.3em",
                  color: "red",
                }}
              >
                {passwordError}
              </FormHelperText>

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
                  size="small"
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
                  size="small"
                >
                  Cancel
                </Button>
              </Box>
            </>
          )}
          <Link to="/login">Have a account ?</Link>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default Signup;
