import { useState } from "react";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useGetProductsQuery } from "../../store/api";
import ProductPreview from "./ProductPreview";
import { ProductInterface } from "../../interfaces/product/ProductInterface";

const ProductList = () => {
  const [value, setValue] = useState("all");
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const { data, isLoading } = useGetProductsQuery("");

  //   TODO Remove any
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const categoryFilter = () => {
    if (value === "all") {
      return data.data;
    }

    const filteredItems = data.data.filter(
      (item: ProductInterface) => item.attributes.category === value
    );

    return filteredItems;
  };

  return (
    <Box width="100%" margin="80px auto">
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
      {data || !isLoading ? (
        <Box
          margin="auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          gap="20px"
        >
          {categoryFilter().map((item: ProductInterface, index: number) => (
            <ProductPreview
              item={item}
              width="270px"
              key={`product-preview-${item.attributes.name}-${index}`}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default ProductList;
