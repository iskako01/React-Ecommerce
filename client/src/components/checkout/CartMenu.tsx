import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import { setIsCartOpen } from "../../state/cartSlice";
import { useAppDispatch } from "../../composables/useAppDispatch";
import { useAppSelector } from "../../composables/useAppSelector";
import CartItem from "./CartItem";
import { shades } from "../../theme";

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);

  console.log(cart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  const navigateToCheckout = () => {
    dispatch(setIsCartOpen());
    navigate("/checkout");
  };

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
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        sx={{ backgroundColor: "#ffffff" }}
      >
        <Box padding="30px" overflow="auto" height="100%">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="15px"
          >
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen())}>
              <Close />
            </IconButton>
          </Box>

          <Box>
            {cart.map((item) => (
              <CartItem
                item={item}
                key={`${item.attributes.name}-${item.id}`}
              />
            ))}
          </Box>

          <Box m="20px 0">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              m="20px 0"
            >
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">{totalPrice}$</Typography>
            </Box>
            <Button
              sx={{
                display: "flex",
                backgroundColor: shades.primary[400],
                color: "#ffffff",
                borderRadius: 0,
                minWidth: "200px",
                maxWidth: "320px",
                padding: "20px 40px",
                m: "20px auto",
                ":hover": { backgroundColor: shades.primary[300] },
              }}
              onClick={navigateToCheckout}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
