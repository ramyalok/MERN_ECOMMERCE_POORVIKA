import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../feature/authSlice";
import productReducer from "../feature/productSlice";
import cartReducer from "../feature/cartSlice";
import orderReducer from "../feature/orderSlice";
import wishlistReducer from "../feature/wishlistSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    wishlist: wishlistReducer,
  },
});
