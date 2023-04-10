import { FC } from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import { Close, Add, Remove } from "@mui/icons-material";
import { ProductInterface } from "../../interfaces/product/ProductInterface";
import { useAppDispatch } from "../../composables/useAppDispatch";
import {
  decreaseCount,
  removeFromCart,
  increaseCount,
} from "../../state/cartSlice";
import { shades } from "../../theme";

interface PropsInterface {
  item: ProductInterface;
}

const CartItem: FC<PropsInterface> = ({ item }) => {
  const dispatch = useAppDispatch();
  const imageUrl = `http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`;

  return (
    <Box
      p="15px 0"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box flex="1 1 40%">
        <img src={imageUrl} alt={item?.name} width="123px" height="164px" />
      </Box>

      <Box flex="1 1 60%">
        <Box
          mb="5px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight="bold">{item.attributes.name}</Typography>
          <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
            <Close />
          </IconButton>
        </Box>
        <Typography>{item.attributes.shortDescription}</Typography>
        <Box
          m="15px 0"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            display="flex"
            alignItems="center"
            border={`1px solid ${shades.neutral[500]}`}
          >
            <IconButton
              onClick={() => dispatch(decreaseCount({ id: item.id }))}
            >
              <Remove />
            </IconButton>
            <Typography>{item.count}</Typography>
            <IconButton
              onClick={() => dispatch(increaseCount({ id: item.id }))}
            >
              <Add />
            </IconButton>
          </Box>
        </Box>
        <Typography fontWeight="bold">{item.attributes.price}</Typography>
      </Box>
      <Divider />
    </Box>
  );
};

export default CartItem;
