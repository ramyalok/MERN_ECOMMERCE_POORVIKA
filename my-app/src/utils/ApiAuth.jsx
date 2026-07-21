import axios from "axios";

// Backend Base URL
const API = axios.create({
  baseURL: "https://ecommerce-poorvika-backend-1.onrender.com",
});

// ==========================
// Attach JWT Token
// ==========================
API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ==========================
// Authentication APIs
// ==========================

export const registerUser = (data) => API.post("/users/register", data);

export const loginUser = (data) => API.post("/users/login", data);

export const sendOtp = (data) => API.post("/users/sendotp", data);

export const verifyOtp = (data) => API.post("/users/verifyotp", data);

export const forgotpassword = (data) => API.post("/users/forgotpassword", data);

 export const getAllUsers = () => API.get("/users");

 export const deleteUser = (id) => API.delete(`/users/${id}`);


// ==========================
// Product APIs
// ==========================

// Get all products
export const getProducts = (params) => API.get("/products", { params });

// Get single product
export const getProductById = (id) => API.get(`/products/${id}`);
//userprofile
export const getProfile = () => API.get("/users/profile");

// Create product (Admin)
export const createProduct = (data) => API.post("/products", data);

// Update product (Admin)
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);

// Delete product (Admin)
export const deleteProduct = (id) => API.delete(`/products/${id}`);


// ================= Orders =================

// Create Order
export const createOrder = (orderData) =>
  API.post("/orders", orderData);

// Logged-in User Orders
export const getMyOrders = () =>
  API.get("/orders/myorders");

// Update Order
export const updateOrder = (id, data) =>
  API.put(`/orders/${id}`, data);

// Delete Order
export const deleteOrder = (id) =>
  API.delete(`/orders/${id}`);

// ================= Admin =================

// View All Orders
export const getAllOrders = () =>
  API.get("/orders/allorders");

// Update Order Status
export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}/status`, {
    status,
  });

  export const getDashboardStats = () => API.get("/dashboard");
export default API;
