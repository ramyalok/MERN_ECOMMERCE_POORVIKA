import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { FaShoppingCart, FaHeart, FaUserCircle, FaBars } from "react-icons/fa";
import { logout } from "../feature/authSlice";
import { clearCart } from "../feature/cartSlice";
import { clearWishlist } from "../feature/wishlistSlice";
import {clearOrders} from "../feature/orderSlice"
 

  const Navbar = () => {  
    const { currentUser } = useSelector((state) => state.auth);
    const isAdmin = currentUser?.role === "admin";
    const [menuOpen, setMenuOpen] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);
    const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const navigate = useNavigate();
   const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(clearWishlist());
    dispatch(clearOrders());
    dispatch(logout());

    navigate("/");
  };
    return (
      <>
        <nav className="bg-violet-600 text-white sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            {/* ================= Logo ================= */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-12 h-12 rounded-full"
              />
              <h1 className="text-2xl font-bold hidden sm:block">
                Poorvika Stores
              </h1>
            </div>

            {/* ================= Desktop Menu ================= */}

            <ul className="hidden lg:flex items-center gap-7">
              <li>
                <Link to="/" className="hover:text-pink-300">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-pink-300">
                  About
                </Link>
              </li>

              <li>
                <Link to="/productlist" className="hover:text-pink-300">
                  Products
                </Link>
              </li>

              {/* User Only */}
              {!isAdmin && (
                <>
                  <li>
                    <Link
                      to="/wishlist"
                      className="relative flex items-center gap-1 hover:text-pink-300"
                    >
                      <FaHeart />
                      Wishlist
                      <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center">
                        {wishlistCount}
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/cart"
                      className="relative flex items-center gap-1 hover:text-pink-300"
                    >
                      <FaShoppingCart />
                      Cart
                      <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center">
                        {cartItems.length}
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/orders" className="hover:text-pink-300">
                      My Orders
                    </Link>
                  </li>
                </>
              )}

              {/* Admin Only */}
              {isAdmin && (
                <li>
                  <Link to="/admindashboard" className="hover:text-pink-300">
                    Admin Dashboard
                  </Link>
                </li>
              )}
            </ul>

            {/* ================= Right Section ================= */}
            <div className="flex items-center gap-3">
              {currentUser ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="hidden md:flex items-center gap-2 bg-white text-violet-600 px-4 py-2 rounded-lg hover:bg-yellow-300"
                  >
                    <FaUserCircle />
                    {currentUser.username}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/signuplogin")}
                  className="hidden md:block bg-white text-violet-600 px-5 py-2 rounded-lg hover:bg-yellow-300"
                >
                  Login
                </button>
              )}

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden"
              >
                <FaBars size={24} />
              </button>
            </div>
          </div>

          {/* ================= Mobile Menu ================= */}
          {menuOpen && (
            <div className="lg:hidden bg-violet-700 flex flex-col p-4 space-y-3">
              <Link to="/">Home</Link>

              <Link to="/about">About</Link>

              <Link to="/productlist">Products</Link>

              {!isAdmin && (
                <>
                  <Link to="/wishlist" className="relative">
                    ❤️ Wishlist
                    <span className="absolute -top-2 left-20 bg-red-500 text-white rounded-full px-2 text-xs">
                      {wishlistCount}
                    </span>
                  </Link>

                  <Link to="/cart">🛒 Cart ({cartItems.length})</Link>

                  <Link to="/orders">📦 My Orders</Link>
                </>
              )}

              {isAdmin && <Link to="/admindashboard">📊 Admin Dashboard</Link>}

              {currentUser ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="bg-white text-violet-600 py-2 rounded-lg"
                  >
                    👤 Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/signuplogin")}
                  className="bg-white text-violet-600 py-2 rounded-lg"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </nav>
      </>
    );
  };

export default Navbar;
