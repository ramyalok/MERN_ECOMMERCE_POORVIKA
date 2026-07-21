import React, { useEffect, useState } from "react";
import { getMyOrders, deleteOrder } from "../utils/ApiAuth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await getMyOrders();

      setOrders(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    const confirmDelete = window.confirm("Do you want to cancel this order?");

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);

      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Unable to cancel order");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-14 h-14 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-violet-700 mb-10">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h2 className="text-2xl font-bold text-gray-600">No Orders Yet</h2>

            <p className="text-gray-500 mt-3">Place your first order.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row md:justify-between mb-5">
                <div>
                  <p>
                    <strong>Order ID :</strong> {order._id}
                  </p>

                  <p>
                    <strong>Date :</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-3 md:mt-0">
                  <span className="bg-violet-600 text-white px-4 py-2 rounded-full">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {order.products.map((item) => (
                  <div
                    key={item.product._id}
                    className="border rounded-lg p-4 flex justify-between"
                  >
                    <div>
                      <h3 className="font-bold">{item.product.name}</h3>

                      <p>Category : {item.product.category}</p>

                      <p>Quantity : {item.quantity}</p>
                    </div>

                    <div className="text-green-600 font-bold">
                      ₹ {item.product.price}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-5">
                <p>
                  <strong>Shipping :</strong> {order.shippingAddress}
                </p>

                <p>
                  <strong>Payment :</strong> {order.paymentMethod}
                </p>

                <p className="text-2xl text-violet-700 font-bold mt-3">
                  Total : ₹ {order.totalAmount}
                </p>

                {order.status !== "Cancelled" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="mt-5 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
