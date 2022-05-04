import { CardContent, Typography, Card, TextField, Grid, Button } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import validation from './validation';


const UpdateForm = () => {

  const initialValues = { firstName: "", lastName: "", email: "radhushani@gmail.com", studentId: "", department: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isFirstNameHasError, setIsFirstNameHasError] = useState(false);
  const [isLastNameHasError, setIsLastNameHasError] = useState(false);
  const [isStudentIdHasError, setIsStudentIdHasError] = useState(false);
  const [isDepartmentHasError, setIsDepartmentHasError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleReset = (e) => {
    setFormValues(initialValues);

  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validation(formValues));

    setIsFirstNameHasError(false);
    setIsDepartmentHasError(false);
    setIsLastNameHasError(false);
    setIsStudentIdHasError(false);


    if (formValues.firstName === '') {
      setIsFirstNameHasError(true);
    } else if (formValues.lastName === '') {
      setIsLastNameHasError(true);
    } else if (formValues.studentId === '') {
      setIsStudentIdHasError(true);
    } else if (formValues.department === '') {
      setIsDepartmentHasError(true);
    }

    setIsSubmit(true);
  };
  const isDisabled = (Object.keys(formErrors).length === 0 && isSubmit);
  return (

    <div>
      <Typography
        fontWeight="fontWeightBold"
        align="center"
        sx={{
          fontSize: {
            xs: "1rem",
            sm: "2rem",
          }
        }}>
        Student - Profile
      </Typography>
      

      <Card>
        <CardContent>

          <form onSubmit={handleSubmit}>
            <Grid container sx={{width:"auto"}}spacing={3} >
            
              <Grid xs={12} sm={6} item>
                <TextField
                  error={isFirstNameHasError}
                  id="standard-error-helper-text"
                  helperText={formErrors.firstName}
                  label="First Name"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formValues.firstName}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: isDisabled,
                  }}
                  variant="standard"
                  fullWidth
                />
              </Grid>

              <Grid xs={12} sm={6} item>
                <TextField
                  error={isLastNameHasError}
                  id="standard-error-helper-text"
                  helperText={formErrors.lastName}
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formValues.lastName}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: isDisabled,
                  }}
                  variant="standard"
                  fullWidth />
              </Grid>

              <Grid xs={12} item>
                <TextField
                  type="email"
                  id="standard-read-only-input"
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                  value={formValues.email}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                  fullWidth
                />
              </Grid>


              <Grid xs={12} item>
                <TextField
                  error={isStudentIdHasError}
                  id="standard-error-helper-text"
                  helperText={formErrors.studentId}
                  label="Student ID"
                  name="studentId"
                  placeholder="Enter Student ID"
                  value={formValues.studentId}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: isDisabled,
                  }}
                  variant="standard"
                  fullWidth />
              </Grid>


              <Grid xs={12} item>
                <TextField
                  error={isDepartmentHasError}
                  id="standard-error-helper-text"
                  helperText={formErrors.department}
                  label="Department"
                  name="department"
                  placeholder="Enter department"
                  value={formValues.department}
                  onChange={handleChange}
                  variant="standard"
                  InputProps={{
                    readOnly: isDisabled,
                  }}

                  fullWidth
                />
              </Grid>

              <Grid xs={12} sm={6} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isDisabled}
                >
                  Submit
                </Button>
              </Grid>

              <Grid xs={12} sm={6} item>
                <Button
                  type="reset"
                  variant="contained"
                  color="primary"
                  disabled={isDisabled}
                  onClick={handleReset}
                >
                  Reset the form
                </Button>
              </Grid>
            </Grid>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default UpdateForm;
