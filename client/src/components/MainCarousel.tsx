import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { shades } from "../theme";

import carouselImgUrl1 from "../assets/images/carousel/1.jpeg";
import carouselImgUrl2 from "../assets/images/carousel/2.jpeg";
import carouselImgUrl3 from "../assets/images/carousel/3.jpeg";
import carouselImgUrl4 from "../assets/images/carousel/4.jpeg";
import carouselImgUrl5 from "../assets/images/carousel/5.jpeg";

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  //   TODO Impove it
  const carouselImgUrlList = [
    carouselImgUrl1,
    carouselImgUrl2,
    carouselImgUrl3,
    carouselImgUrl4,
    carouselImgUrl5,
  ];

  return (
    <div>
      <Carousel
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) => {
          return (
            <IconButton
              onClick={onClickHandler}
              sx={{
                position: "absolute",
                top: "50%",
                left: "0",
                color: "#ffffff",
                padding: "5px",
                zIndex: "10",
              }}
            >
              <NavigateBefore sx={{ fontSize: 40 }} />
            </IconButton>
          );
        }}
        renderArrowNext={(onClickHandler, hasNext, label) => {
          return (
            <IconButton
              onClick={onClickHandler}
              sx={{
                position: "absolute",
                top: "50%",
                right: "0",
                color: "#ffffff",
                padding: "5px",
                zIndex: "10",
              }}
            >
              <NavigateNext sx={{ fontSize: 40 }} />
            </IconButton>
          );
        }}
      >
        {carouselImgUrlList.map((imgUrl, index) => (
          <Box key={`carousel-image-${index}`}>
            <img
              src={imgUrl}
              alt={`carousel-${index}`}
              style={{
                width: "100%",
                height: "700px",
                objectFit: "cover",
                backgroundAttachment: "fixed",
              }}
            />
            <Box
              position="absolute"
              color="#ffffff"
              padding="20px"
              borderRadius="1px"
              textAlign="left"
              sx={{
                backgroundColor: "rgb(0, 0, 0, 0.4)",
              }}
              top="40%"
              left={isNonMobile ? "50px" : "0"}
              right={isNonMobile ? "" : "0"}
              margin={isNonMobile ? "" : "auto"}
              maxWidth={isNonMobile ? "none" : "240px"}
            >
              <Typography color={shades.secondary[200]}>--NEW ITEMS</Typography>
              <Typography variant="h1">Summer Sale</Typography>
              <Typography
                color={shades.secondary[300]}
                fontWeight="bold"
                sx={{ textDecoration: "underline" }}
              >
                Discover more
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>
    </div>
  );
};

export default MainCarousel;
