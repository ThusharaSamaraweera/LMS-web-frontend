import {
  CardContent,
  Typography,
  Card,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormHelperText,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import StudentService from "../../servers/student.service";
import ConfirmationDialog from "../utilsComponents/ConfirmationDialog";

const department = ["SE", "PS", "PE"];

const UpdateForm = () => {
  const userEmail = useSelector((state) => state.authReducer.authUser.username);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    department: "",
  });
  const [formValues, setFormValues] = useState(initialValues);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [studentIdError, setStudentIdError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  const [isConfirmatinDislogOpen, setConfirmationDialogOpen] = useState(false);

  useEffect(() => {
    // get student details from backend
    async function getProfile() {
      await StudentService.getProfile().then((res) => {
        setInitialValues({
          firstName: res.first_name ? res.first_name : "",
          lastName: res.last_name ? res.last_name : "",
          studentId: res.student_id ? res.student_id : "",
          email: userEmail,
          department: res.department ? res.department : "",
        });
      });
    }
    setDisabled(false);
    getProfile();
  }, []);

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleReset = (e) => {
    setFormValues(initialValues);
    setDepartmentError("");
    setStudentIdError("");
    setFirstNameError("");
    setLastNameError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValues.firstName === "") {
      setFirstNameError("First name is required");
    }
    if (formValues.lastName === "") {
      setLastNameError("Last name is required");
    }
    if (formValues.studentId === "") {
      setStudentIdError("Student id is required");
    }

    if (formValues.department === "") {
      setDepartmentError("Department is required");
    }

    if (firstNameError || lastNameError || studentIdError || departmentError) {
      return;
    }

    setConfirmationDialogOpen(true);
  };

  const handleOnSave = () => {
    setConfirmationDialogOpen(false);
    const studentProfile = {
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      student_email: formValues.email,
      student_id: formValues.studentId,
      department: formValues.department,
      profile_pic: ""
    }
    StudentService.updateStudent(studentProfile)
    console.log("save");
  };

  const handleOnCancel = () => {
    setConfirmationDialogOpen(false);
  };

  const handleOnFirstNameChange = (e) => {
    const { value } = e.target;
    if (value) {
      setFirstNameError("");
    } else {
      setFirstNameError("First name is required");
    }
    setFormValues({ ...formValues, firstName: value });
  };

  const handleOnLastNameChange = (e) => {
    const { value } = e.target;
    if (value) {
      setLastNameError("");
    } else {
      setLastNameError("Last name is required");
    }
    setFormValues({ ...formValues, lastName: value });
  };

  const handleOnStudentIDChange = (e) => {
    const { value } = e.target;

    const reg = /^[A-Z]{2,3}[/]201[0-9][/][0-9]{3,3}$/;
    if (reg.test(value) === false) {
      setStudentIdError("Student id is invaild");
    } else {
      setStudentIdError("");
    }

    setFormValues({ ...formValues, studentId: value });
  };

  const handleOnDepartmentChange = (e) => {
    const { value } = e.target;
    if (value) {
      setDepartmentError("");
    } else {
      setDepartmentError("Department is required");
    }
    setFormValues({ ...formValues, department: value });
  };

  const renderDepartment = department.map((department) => {
    return (
      <MenuItem key={department} value={department}>
        {department}
      </MenuItem>
    );
  });

  return (
    <>
      {isConfirmatinDislogOpen && (
        <ConfirmationDialog
          title={"Want to save changes ?"}
          handleOnAccept={handleOnSave}
          handleOnCancel={handleOnCancel}
        />
      )}
      <Box>
        <Typography
          fontWeight="fontWeightBold"
          align="center"
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "2rem",
            },
          }}
        >
          Student - Profile
        </Typography>

        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container sx={{ width: "auto" }} spacing={3}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    error={Boolean(firstNameError)}
                    id="standard-error-helper-text"
                    helperText={firstNameError}
                    label="First Name"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formValues.firstName}
                    onChange={handleOnFirstNameChange}
                    variant="standard"
                    fullWidth
                    disabled={isDisabled}
                  />
                </Grid>

                <Grid xs={12} sm={6} item>
                  <TextField
                    error={Boolean(lastNameError)}
                    id="standard-error-helper-text"
                    helperText={lastNameError}
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formValues.lastName}
                    onChange={handleOnLastNameChange}
                    disabled={isDisabled}
                    variant="standard"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} item>
                  <TextField
                    type="email"
                    id="standard-read-only-input"
                    label="Email"
                    name="email"
                    placeholder="Enter email"
                    value={formValues.email}
                    disabled={true}
                    variant="standard"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} item>
                  <TextField
                    error={Boolean(studentIdError)}
                    id="standard-error-helper-text"
                    helperText={studentIdError}
                    label="Student ID"
                    name="studentId"
                    placeholder="Enter Student ID"
                    value={formValues.studentId}
                    onChange={handleOnStudentIDChange}
                    disabled={isDisabled}
                    variant="standard"
                    fullWidth
                  />
                </Grid>

                <Grid xs={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="department-select-label" variant="standard">
                      Department
                    </InputLabel>
                    <Select
                      labelId="department-select-label"
                      id="department-select"
                      value={formValues.department}
                      label="department"
                      name="department"
                      onChange={handleOnDepartmentChange}
                      variant="standard"
                      placeholder="Enter department"
                      error={Boolean(departmentError)}
                      disabled={isDisabled}
                    >
                      {renderDepartment}
                    </Select>
                    <FormHelperText id="department-error">
                      {departmentError && "Department is required"}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid
                  xs={12}
                  sm={12}
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isDisabled}
                    sx={{
                      marginX: 2,
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    type="reset"
                    variant="contained"
                    color="primary"
                    disabled={isDisabled}
                    onClick={handleReset}
                    sx={{
                      marginX: 2,
                    }}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default UpdateForm;
