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
  import React ,{useEffect}from "react";
  import { useState} from "react";
  import { useSelector } from "react-redux";
  import LecturerService from "../../servers/lecturer.service";
  import ConfirmationDialog from "../utilsComponents/ConfirmationDialog";
  import Alert from "../utilsComponents/Alert";
  
  
  const department = ["SE", "PS", "PE"];
  
  const UpdateForm = () => {
  
    const userEmail = useSelector(state=>state.authReducer.authUser.username)
  
    const [initialValues,setInitialValues] = useState({
      firstName: "",
      lastName: "",
      email: userEmail,
      department: "",
    });

    const [formValues, setFormValues] = useState(initialValues);
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [departmentError, setDepartmentError] = useState("");
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    

    const handleOnGetProfile = async () => {
      // get lecturer details from backend
      await LecturerService.getProfile().then((res) => {
        setInitialValues({
          firstName: res.first_name ? res.first_name : "",
          lastName: res.last_name ? res.last_name : "",
          email: userEmail,
          department: res.department ? res.department : "",
        });
      });
    };

    useEffect(() => {
      setDisabled(false);
      handleOnGetProfile();
    }, []);
  
    useEffect(() => {
      setFormValues(initialValues);
    }, [initialValues]);
  
    const handleReset = (e) => {
      setFormValues(initialValues);
      setDepartmentError("");
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
      if (formValues.department === "") {
        setDepartmentError("Department is required");
      }
      if (firstNameError || lastNameError || departmentError) {
        return;
      }
      setConfirmationDialogOpen(true);
      
    };

    const handleOnSave = async () =>{
      setConfirmationDialogOpen(false);
    const lecturerProfile = {
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      lecturer_email: formValues.email,
      department: formValues.department,
      profile_pic: "",
    };
    await LecturerService.updateLecturer(lecturerProfile)
      .then((res) => {
        Alert({
          message: "Update profile succefully",
          type: "success",
        });
        handleOnGetProfile();
      })
      .catch((err) => {
        Alert({
          message: err.message,
          type: "error",
        });
      });

    }

    const handleOnCancel = async () =>{
      setConfirmationDialogOpen(false);
    }

    
  
    const handleOnFirstNameChange = (e) => {
      const { value } = e.target;
      if (value) {
        setFirstNameError("");
      }else {
        setFirstNameError("Firstname is required");
      }
      setFormValues({ ...formValues, firstName: value });
    };
  
    const handleOnLastNameChange = (e) => {
      const { value } = e.target;
      if (value) {
        setLastNameError("");
      }else {
        setLastNameError("Lastname is required");
      }
      setFormValues({ ...formValues, lastName: value });
    };
  
  
    const handleOnDepartmentChange = (e) => {
      const { value } = e.target;
      if (value) {
        setDepartmentError("");
      }else {
        setDepartmentError("Department is required");
      }
      setFormValues({ ...formValues, department: value });
    };
  
    const renderDepartment = department.map((department) => {
      return <MenuItem key={department} value={department}>{department}</MenuItem>;
    });
  
    return (
    <>
      {isConfirmationDialogOpen && (
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
          Lecturer - Profile
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
                    disabled={isDisabled}
                    variant="standard"
                    fullWidth
                  />
                </Grid>
  

                <Grid xs={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="department-select-label" variant="standard">Department</InputLabel>
                    <Select
                      labelId="department-select-label"
                      id="department-select"
                      value={formValues.department}
                      label="Department"
                      name="department"
                      onChange={handleOnDepartmentChange}
                      variant="standard"
                      error={Boolean(departmentError)}
                    >
                      {renderDepartment}
                    </Select>
                    <FormHelperText id="department-error">
                      {departmentError && "Department is required"}
                    </FormHelperText>
                  </FormControl>
                </Grid>
  
                <Grid xs={12} sm={12} item
                  sx={{
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isDisabled}
                    sx={{
                      marginX: 2
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
                      marginX: 2
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