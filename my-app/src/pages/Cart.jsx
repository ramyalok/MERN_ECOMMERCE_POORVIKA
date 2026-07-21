import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../feature/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  // ================= Total Items =================

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // ================= Total Price =================

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // ================= Remove =================

  const removeItem = (_id) => {
    dispatch(removeFromCart(_id));
  };

  return (
    <div className="min-h-screen bg-violet-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-violet-700 mb-10">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <h2 className="text-2xl font-bold text-gray-600">
              Your Cart is Empty
            </h2>

            <p className="mt-3 text-gray-500">
              Add some products to your cart.
            </p>

            <button
              onClick={() => navigate("/productlist")}
              className="mt-6 bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* ================= Cart Items ================= */}

            <div className="lg:col-span-2 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row gap-5 items-center"
                >
                  {/* Image */}

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />

                  {/* Details */}

                  <div className="flex-1 w-full">
                    <h2 className="text-xl font-bold">{item.name}</h2>

                    <p className="text-gray-500 mt-1">{item.brand}</p>

                    <p className="text-violet-600 mt-2 font-semibold capitalize">
                      {item.category}
                    </p>

                    <p className="text-2xl font-bold text-green-600 mt-3">
                      ₹ {item.price}
                    </p>
                  </div>

                  {/* Quantity */}

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg">{item.quantity}</span>

                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}

                  <button
                    onClick={() => removeItem(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* ================= Order Summary ================= */}

            <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
              <h2 className="text-2xl font-bold text-violet-700 mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4">
                <span>Total Items</span>
                <span className="font-bold">{totalItems}</span>
              </div>

              <div className="flex justify-between mb-6">
                <span>Total Price</span>
                <span className="font-bold text-green-600">
                  ₹ {totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
