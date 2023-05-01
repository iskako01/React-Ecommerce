import { ReactEventHandler, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import { Add, Remove, FavoriteBorderOutlined } from "@mui/icons-material";
import { shades } from "../theme";
import { addToCart } from "../store/cartSlice";
import { useAppDispatch } from "../composables/useAppDispatch";
import { ProductInterface } from "../interfaces/product/ProductInterface";
import { useGetProductQuery, useGetProductsQuery } from "../store/api";
import ProductPreview from "../components/product/ProductPreview";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const [count, setCount] = useState(1);
  const [tabsValue, settabsValue] = useState("description");
  const { data: product, isLoading: isProductLoad } = useGetProductQuery(
    productId as string
  );

  const { data: products, isLoading } = useGetProductsQuery("");

  const handleTabChange = (event: any, newValue: string) => {
    settabsValue(newValue);
  };

  return (
    <Box width="100%" m="80px auto" padding="20px">
      {product || !isProductLoad ? (
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          <Box flex="1 1 40%" mb="40px">
            <img
              alt={product.data?.attributes.name}
              src={`http://localhost:1337${product.data?.attributes.image.data.attributes.formats.medium.url}`}
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
              <Typography variant="h3">
                {product.data?.attributes.name}
              </Typography>
              <Typography>${product.data?.attributes.price}</Typography>
              <Typography sx={{ mt: "20px" }}>
                ${product.data?.attributes.longDescription}
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
                onClick={() => dispatch(addToCart({ ...product.data, count }))}
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
              <Typography>
                CATEGORIES: {product.data?.attributes.category}
              </Typography>
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
              <div>{product.data?.attributes.longDescription}</div>
            )}
            {tabsValue === "reviews" && <div>reviews</div>}
          </Box>

          <Box mt="50px" width="100%">
            <Typography variant="h3" fontWeight="bold">
              Related Products
            </Typography>
            {products || !isLoading ? (
              <Box
                mt="20px"
                display="flex"
                flexWrap="wrap"
                gap="20px"
                justifyContent="center"
              >
                {products.data
                  ?.slice(0, 4)
                  .map((product: ProductInterface, index: number) => (
                    <ProductPreview
                      key={`${product.attributes.name}-${index}`}
                      item={product}
                      width="300px"
                    />
                  ))}
              </Box>
            ) : (
              <>Loading...</>
            )}
          </Box>
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default ProductDetails;
