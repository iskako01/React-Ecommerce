import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api/" }),
  reducerPath: "mainApi",
  tagTypes: ["Products", "Product", "Orders"],
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "items?populate=image",
      providesTags: ["Products"],
    }),
    getProduct: build.query({
      query: (productId: string) => `items/${productId}?populate=image`,
      providesTags: ["Product"],
    }),
    createOrders: build.mutation({
      query: (payload) => ({
        url: "orders",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateOrdersMutation,
} = api;
