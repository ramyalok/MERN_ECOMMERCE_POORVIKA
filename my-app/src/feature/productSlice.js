import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
  search: "",
  category: "all",
  sort: "",
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
    },

    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setSort: (state, action) => {
      state.sort = action.payload;
    },

    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  setSearch,
  setCategory,
  setSort,
  clearProducts,
} = productSlice.actions;

export default productSlice.reducer;
