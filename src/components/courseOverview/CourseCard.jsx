import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';

const CourseCard = (props) => {
  const navigate = useNavigate()
  const {course} = props;

  const handleOnNavigate = () => {
    navigate(`course/${course.course_id}`)
  }

  return (
    <Card sx={{ 
      padding: 0.8,
      cursor: 'pointer',
      marginY: 1,
      "&:hover": {
            boxShadow: '10px 10px #ffc252'
      },
    }}
      onClick={() => handleOnNavigate()}
    >
      <Box sx={{ 
        display: 'flex',
      }}>
        <ArticleIcon sx={{ fontSize: 60}}/>
        <Box sx={{paddingY: 0.8, display: ''}}>
          <Typography variant="body2" gutterBottom component="div">
            Year {course.course_id[4]}
          </Typography>

          <Box sx={{display: 'flex'}}>
            <Typography variant="body2" gutterBottom component="div" sx={{marginRight: 1}}>
              {course.course_id}
            </Typography>
            <Typography variant="body2" gutterBottom component="div">
              {course.course_name}
            </Typography>
          </Box>

        </Box>
      </Box>
    </Card>
  )
}

export default CourseCard
