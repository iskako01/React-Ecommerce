import { Box, Typography, useMediaQuery } from "@mui/material";
import { shades } from "../../theme";
import FooterMenu from "./FooterMenu";

const Footer = () => {
  const isNonMobile = useMediaQuery("(min-width: 1200px)");

  return (
    <Box mt="70px" p="40px 0" width="100%">
      <Box
        padding="0 20px"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        gap="30px"
        flexDirection={isNonMobile ? "row" : "column"}
      >
        <Box
          maxWidth={isNonMobile ? "350px" : "100%"}
          textAlign={isNonMobile ? "left" : "center"}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            ECOMMER
          </Typography>
          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
            obcaecati quibusdam nihil modi architecto! In necessitatibus
            molestias quidem pariatur? Eos cupiditate nam ipsam architecto
            similique magni, ad autem placeat. Repudiandae, dolores consequuntur
            at nostrum amet similique voluptates porro maxime officiis?
          </Typography>
        </Box>
        <FooterMenu />
      </Box>
    </Box>
  );
};

export default Footer;
