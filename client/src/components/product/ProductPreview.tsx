import { FC, useState } from "react";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../state/cartSlice";
import { ProductInterface } from "../../interfaces/product/ProductInterface";
import { useAppDispatch } from "../../composables/useAppDispatch";
import { ThemeOptionInterface } from "../../interfaces/theme/ThemeOptionInterface";

interface PropsInterface {
  item: ProductInterface;
  width: number;
}

const ProductPreview: FC<PropsInterface> = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme<ThemeOptionInterface>();

  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          src={`http://localhost:1337${url}`}
          alt={item.name}
          width="300px"
          height="400px"
          onClick={() => navigate(`/product/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              sx={{ backgroundColor: shades.neutral[100] }}
              display="flex"
              alignItems="center"
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <Remove />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(Math.max(count + 1, 1))}>
                <Add />
              </IconButton>
            </Box>

            <Button
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
              sx={{
                backgroundColor: shades.primary[400],
                color: "#ffffff",
                ":hover": { backgroundColor: shades.primary[300] },
              }}
            >
              ADD TO CART
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="5px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, "1$")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );
};

export default ProductPreview;
