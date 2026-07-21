import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    cancelOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload,
      );
    },

    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { placeOrder, cancelOrder, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
