import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {
  PersonOutlined,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../theme";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        backgroundColor: "#fef4f4",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "60px",
        color: "#000000",
        top: "0",
        left: "0",
        zIndex: "800",
      }}
    >
      <Box
        sx={{
          width: "80%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          color={shades.secondary[500]}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          ECOMMER
        </Box>
        <Box>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <PersonOutlined />
          </IconButton>
          <IconButton>
            <ShoppingBagOutlined />
          </IconButton>
          <IconButton>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
