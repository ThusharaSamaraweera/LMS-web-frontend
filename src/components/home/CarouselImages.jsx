import React from "react";
import { Carousel } from "antd";
import { Box } from "@mui/material";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";

const CarouselImages = () => {
  return (
    <Box>
      <Carousel autoplay>
        <Box
          sx={{

          }}
          className='img-div'
        >
          <Box
            component="img"
            sx={{
              width: "80vw",
              // height: "75vh",
            }}
            src={img1}
            className="home-carousel-image"
          ></Box>
        </Box>
        <Box
          sx={{

          }}
          className='img-div'
        >
          <Box
            component="img"
            sx={{
              width: "80vw",
              // height: "75vh",
            }}
            src={img2}
            className="home-carousel-image"
          ></Box>
        </Box>
      </Carousel>
    </Box>
  );
};

export default CarouselImages;
