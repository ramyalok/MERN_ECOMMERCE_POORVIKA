import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    email: null,
    token: null,
    isAuthenticated: false,
  },

  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload.user;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
