import { ReactEventHandler, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import { Add, Remove, FavoriteBorderOutlined } from "@mui/icons-material";
import { shades } from "../theme";
import { addToCart, removeFromCart } from "../state/cartSlice";
import { useAppDispatch } from "../composables/useAppDispatch";
import { ProductInterface } from "../interfaces/product/ProductInterface";
import ProductPreview from "../components/product/ProductPreview";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [count, setCount] = useState(1);
  const [tabsValue, settabsValue] = useState("description");
  const [products, setProducts] = useState<ProductInterface[] | null>([]);
  const imageUrl = `http://localhost:1337${product?.attributes.image.data.attributes.formats.medium.url}`;

  const handleTabChange = (event: any, newValue: string) => {
    settabsValue(newValue);
  };

  const getProduct = async () => {
    const response = await fetch(
      `http://localhost:1337/api/items/${productId}?populate=image`,
      { method: "GET" }
    );

    const product = await response.json();

    setProduct(product.data);
  };

  const getProducts = async () => {
    const response = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );

    const products = await response.json();

    setProducts(products.data);
  };

  useEffect(() => {
    getProduct();
    getProducts();
  }, [productId]);

  return (
    <Box width="100%" m="80px auto" padding="20px">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={product?.attributes.name}
            src={imageUrl}
            width="100%"
            height="100%"
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Link className="link" to="/">
              Home / Products
            </Link>
            <Link className="link" to="#">
              Prev Next
            </Link>
          </Box>

          <Box>
            <Typography variant="h3">{product?.attributes.name}</Typography>
            <Typography>${product?.attributes.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              ${product?.attributes.longDescription}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`2px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <Remove />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(Math.max(count + 1, 1))}>
                <Add />
              </IconButton>
            </Box>

            <Button
              onClick={() =>
                dispatch(addToCart({ item: { ...product, count } }))
              }
              sx={{
                backgroundColor: shades.primary[400],
                color: "#ffffff",
                ":hover": { backgroundColor: shades.primary[300] },
              }}
            >
              ADD TO CART
            </Button>
          </Box>

          <Box>
            <Box m="20px 5px" display="flex">
              <FavoriteBorderOutlined />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {product?.attributes.category}</Typography>
          </Box>
        </Box>

        <Box m="20px 0">
          <Tabs value={tabsValue} onChange={handleTabChange}>
            <Tab label="DESCRIPTION" value="description" />
            <Tab label="REVIEWS" value="reviews" />
          </Tabs>
        </Box>
        <Box display="flex" flexWrap="wrap" gap="15px">
          {tabsValue === "description" && (
            <div>{product?.attributes.longDescription}</div>
          )}
          {tabsValue === "reviews" && <div>reviews</div>}
        </Box>

        <Box mt="50px" width="100%">
          <Typography variant="h3" fontWeight="bold">
            Related Products
          </Typography>
          <Box
            mt="20px"
            display="flex"
            flexWrap="wrap"
            gap="20px"
            justifyContent="center"
          >
            {products?.slice(0, 4).map((product, index) => (
              <ProductPreview
                key={`${product.attributes.name}-${index}`}
                item={product}
                width="300px"
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
