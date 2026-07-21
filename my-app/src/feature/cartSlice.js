import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // Add Product
    addToCart: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item._id === action.payload._id,
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    // Remove Product Completely
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },

    // Increase Quantity
    increaseQuantity: (state, action) => {
      const product = state.items.find((item) => item._id === action.payload);

      if (product) {
        product.quantity += 1;
      }
    },

    // Decrease Quantity
    decreaseQuantity: (state, action) => {
      const product = state.items.find((item) => item._id === action.payload);

      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item._id !== action.payload,
          );
        }
      }
    },

    // Empty Cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
