import { CardContent, Typography, Card, TextField, Grid, Button } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import validation from './validation';


const UpdateForm = () => {

  const initialValues = { fName: "", lName: "", email: "", studentId: "", department: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleReset = (e) => {
    setFormValues(initialValues);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validation(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);


  return (
    <div>
      <Typography gutterBottom varient="h3" fontWeight="fontWeightBold" align="center">
        Student - Profile
      </Typography>

      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div>Profile Updated successfully</div>
      ) : (<div>Update your profile</div>)}

      <Card>
        <CardContent>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  label="First Name"
                  name="fName"
                  placeholder="Enter first name"
                  value={formValues.fName}
                  onChange={handleChange}
                  varient="outlined"
                  fullWidth
                  required />
              </Grid>

              <Grid xs={12} sm={6} item>
                <TextField
                  label="Last Name"
                  name="lName"
                  placeholder="Enter last name"
                  value={formValues.lName}
                  onChange={handleChange}
                  varient="outlined"
                  fullWidth
                  required />
              </Grid>


              <Grid xs={12} item>
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter email"
                  value={formValues.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth required />
              </Grid>


              <Grid xs={12} item>
                <TextField
                  label="Student ID"
                  name="studentId"
                  placeholder="Enter Student ID"
                  value={formValues.studentId}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth required />
              </Grid>


              <Grid xs={12} item>
                <TextField
                  label="Department"
                  name="department"
                  placeholder="Enter department"
                  value={formValues.department}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required />
              </Grid>


              <Grid xs={12} sm={6} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={Object.keys(formErrors).length === 0 && isSubmit}
                >
                  Submit
                </Button>
              </Grid>

              <Grid xs={12} sm={6} item>
                <Button
                  type="reset"
                  variant="contained"
                  color="primary"
                  disabled={Object.keys(formErrors).length === 0 && isSubmit}
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
