import { CardContent, Typography, Card, TextField, Grid, Button } from '@mui/material'
import React from 'react'


const UpdateForm = () => {


  return (
    <div>
      <Typography gutterBottom varient="h3" fontWeight="fontWeightBold" align="center">
        Student - Profile
      </Typography>

      <Card>
        <CardContent>
          
          <form >
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField 
                label="First Name" 
                name="fName" 
                placeholder="Enter first name" 
                varient="outlined" 
                fullWidth 
                required />
              </Grid>

              <Grid xs={12} sm={6} item>
                <TextField 
                label="Last Name" 
                name="lName" 
                placeholder="Enter last name" 
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
                variant="outlined" 
                fullWidth required />
              </Grid>
              

              <Grid xs={12} item>
                <TextField 
                label="Student ID" 
                name="studentId"
                placeholder="Enter Student ID" 
                variant="outlined" 
                fullWidth required />
              </Grid>
              

              <Grid xs={12} item>
                <TextField 
                label="Department" 
                name="department" 
                placeholder="Enter department" 
                variant="outlined" 
                fullWidth 
                required />
              </Grid>
              

              <Grid xs={12} sm={6} item>
                <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                >  
                Submit
                </Button>
              </Grid>

              <Grid xs={12} sm={6} item>
                <Button 
                type="reset" 
                variant="contained" 
                color="primary">
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
