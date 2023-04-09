import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface } from "../interfaces/product/ProductInterface";

export interface CartStateInterface {
  isCartOpen: boolean;
  cart: ProductInterface[];
  items: ProductInterface[];
}

const initialState: CartStateInterface = {
  isCartOpen: false,
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ProductInterface[]>) => {
      state.items = action.payload;
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart: (state, action: PayloadAction<ProductInterface>) => {
      state.cart.push(action.payload.item);
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
    },
    increaseCount: (state, action: PayloadAction<any>) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },
    decreaseCount: (state, action: PayloadAction<any>) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
