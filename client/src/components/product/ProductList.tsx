import { useEffect, useState } from "react";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import ProductPreview from "./ProductPreview";
import { useAppDispatch } from "../../composables/useAppDispatch";
import { useAppSelector } from "../../composables/useAppSelector";
import { setItems } from "../../state/cartSlice";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const [value, setValue] = useState("all");
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  //   TODO Remove any
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  //   TODO Move it
  const getItems = async () => {
    const response = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );

    const items = await response.json();

    dispatch(setItems(items.data));
  };

  const categoryFilter = () => {
    if (value === "all") {
      return items;
    }

    const filteredItems = items.filter(
      (item) => item.attributes.category === value
    );

    return filteredItems;
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{ m: "26px", "& .MuiTabs-flexContainer": { flexWrap: "wrap" } }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        sx={{ rowGap: "20px", colomnGap: "1.5%" }}
      >
        {categoryFilter().map((item, index) => (
          <ProductPreview
            item={item}
            width="270px"
            key={`product-preview-${item.name}-${index}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;
