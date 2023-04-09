import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { Close, Add, Remove } from "@mui/icons-material";
import styled from "@emotion/styled";
import { shades } from "../theme";
import {
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} from "../state/cartSlice";
import { useAppDispatch } from "../composables/useAppDispatch";
import { useAppSelector } from "../composables/useAppSelector";

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      sx={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      position="fixed"
      zIndex={1000}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box position="fixed" right="0" bottom="0"></Box>
    </Box>
  );
};

export default CartMenu;
