import React from "react";
import "./App.css";
//fontawesome and install fontawesome package //npm install @fortawesome/fontawesome-free
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//react router dom
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
//navbar
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productlist from "./pages/Productlist";
import SignUpLogin from "./pages/SignUpLogin";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Footer from "./pages/Footer";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import AdminRoute from "./routes/AdminRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AllUsers from "./pages/AllUsers";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import ManageProducts from "./pages/ManageProducts";
import ProductForm from "./pages/ProductForm";
import ManageOrders from "./pages/ManageOrders";
const App = () => {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        {/*this will render home,product contact,  */}
        {/**footer will be common in all pages so we can put it here */}
        <Footer />
      </>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "productlist",
          element: <Productlist />,
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "orders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "signuplogin",
          element: <SignUpLogin />,
        },
        {
          path: "forgotpassword",
          element: <ForgotPassword />,
        },
        {
          path: "admindashboard",
          element: (
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          ),
        },
        {
          path: "/manageproducts",
          element: (
            <AdminRoute>
              <ManageProducts />
            </AdminRoute>
          ),
        },
        {
          path: "allusers",
          element: (
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          ),
        },
        {
          path: "/manageorders",
          element: (
            <AdminRoute>
              <ManageOrders />
            </AdminRoute>
          ),
        },
        {
          path: "/addproduct",
          element: (
            <AdminRoute>
              <ProductForm />
            </AdminRoute>
          ),
        },
        {
          path: "/editproduct/:id",
          element: (
            <AdminRoute>
              <ProductForm />
            </AdminRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

export default App;
