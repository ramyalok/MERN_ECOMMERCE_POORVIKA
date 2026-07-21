import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createOrder } from "../utils/ApiAuth";
import { clearCart } from "../feature/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [shippingAddress, setShippingAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (shippingAddress.trim() === "") {
      alert("Please enter your shipping address.");
      return;
    }

    const orderData = {
      products: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      shippingAddress,
      paymentMethod,
    };

    try {
      setLoading(true);

      await createOrder(orderData);

      dispatch(clearCart());

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (error) {
      console.log(error);

      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-violet-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Shipping Details */}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-violet-700 mb-6">
            Shipping Details
          </h2>

          <label className="font-semibold">Shipping Address</label>

          <textarea
            rows="5"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2 mb-5"
            placeholder="Enter your address..."
          />

          <label className="font-semibold">Payment Method</label>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Credit / Debit Card</option>
          </select>
        </div>

        {/* Order Summary */}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-violet-700 mb-6">
            Order Summary
          </h2>

          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between border-b py-3">
              <div>
                <h3 className="font-semibold">{item.name}</h3>

                <p className="text-gray-500">Qty : {item.quantity}</p>
              </div>

              <p className="font-bold text-green-600">
                ₹ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="flex justify-between text-xl font-bold mt-8">
            <span>Total</span>

            <span className="text-violet-700">₹ {totalAmount.toFixed(2)}</span>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full mt-8 bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition disabled:bg-gray-400"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
