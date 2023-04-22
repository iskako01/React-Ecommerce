import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const FooterMenu = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box
      width="100%"
      maxWidth="900px"
      margin="auto"
      display="grid"
      gridTemplateColumns="repeat(auto-fill, 250px)"
      justifyContent="space-between"
      gap="20px"
    >
      <Box display="flex" justifyContent="space-between" flexDirection="column">
        <Typography variant="h4" fontWeight="bold" mb="35px">
          About us
        </Typography>
        <Link to="/careers" className="link">
          Careers
        </Link>
        <Link to="/our-stores" className="link">
          Our Stores
        </Link>
        <Link to="/terms-and-conditions" className="link">
          Terms & Conditions
        </Link>
        <Link to="/privacy-policy" className="link">
          Privacy Policy
        </Link>
      </Box>
      <Box display="flex" justifyContent="space-between" flexDirection="column">
        <Typography variant="h4" fontWeight="bold" mb="35px">
          Customer Care
        </Typography>
        <Link to="/help-center" className="link">
          Help Center
        </Link>
        <Link to="/track-order" className="link">
          Track Your Order
        </Link>
        <Link to="/purchasing" className="link">
          Corporate & Bulk Purchasing
        </Link>
        <Link to="/refunds" className="link">
          Returns & Refunds
        </Link>
      </Box>
      <Box display="flex" justifyContent="space-between" flexDirection="column">
        <Typography variant="h4" fontWeight="bold" mb="35px">
          Contact Us
        </Typography>
        <Typography mb="35px">Address Lorem ipsum dolor sit amet.</Typography>
        <Link to="mailto:ecommer.info@gmail.com" className="link">
          E-mail: ecommer.info@gmail.com
        </Link>
        <Link to="tel:+420727782323" className="link">
          +420 727782323
        </Link>
      </Box>
    </Box>
  );
};

export default FooterMenu;
