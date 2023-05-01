import { FC, useState } from "react";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";
import { ProductInterface } from "../../interfaces/product/ProductInterface";
import { useAppDispatch } from "../../composables/useAppDispatch";
import { ThemeOptionInterface } from "../../interfaces/theme/ThemeOptionInterface";

interface PropsInterface {
  item: ProductInterface;
  width: string;
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

  const imageUrl = `http://localhost:1337${url}`;
  const categoryTitle = category
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          src={imageUrl}
          alt={item.attributes.name}
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
              onClick={() => dispatch(addToCart({ ...item, count }))}
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
        <Typography variant="subtitle2" sx={{ color: shades.neutral[700] }}>
          {categoryTitle}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );
};

export default ProductPreview;
