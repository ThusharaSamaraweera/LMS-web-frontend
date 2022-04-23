import React from 'react'
import { Carousel } from 'antd';
import { Box } from '@mui/material';
import img1 from '../../assets/images/img1.jpg'
import img2 from '../../assets/images/img2.jpg'
import { height } from '@mui/material/node_modules/@mui/system';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const CarouselImages = () => {
  return (
    <Box>
      <Carousel autoplay>
        <div>
          <Box
            component='img'
            sx={{
              width: '100vw',
              height: "80vh"
            }}
            src={img1}
          >

          </Box>
        </div>
        <div>
          <Box
            component='img'
            sx={{
              width: '100vw',
              height: "80vh"
            }}
            src={img2}
          >

          </Box>
        </div>
    </Carousel>
    </Box>
  )
}

export default CarouselImages
