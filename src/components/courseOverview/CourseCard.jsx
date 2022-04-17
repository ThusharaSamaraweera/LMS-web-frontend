import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import ArticleIcon from '@mui/icons-material/Article';

const CourseCard = (props) => {
  const {details} = props;
  const {code, name} = details;

  return (
    <Card sx={{ 
      padding: 0.8,
      cursor: 'pointer'
      
    }}>
      <Box sx={{ 
        display: 'flex',
      }}>
        <ArticleIcon sx={{ fontSize: 60}}/>
        <Box sx={{paddingY: 0.8, display: ''}}>
          <Typography variant="body1" gutterBottom component="div">
            Year {code[5]}
          </Typography>

          <Typography variant="body1" gutterBottom component="div">
            {name}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default CourseCard
