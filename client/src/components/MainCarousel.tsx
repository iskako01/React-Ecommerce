import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { shades } from "../theme";
import { heroTextureImports } from "../composables/heroTextureImports";

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  console.log(heroTextureImports);

  return (
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
      <div>
        <img src="assets/1.jpeg" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="assets/2.jpeg" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="assets/3.jpeg" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default MainCarousel;
