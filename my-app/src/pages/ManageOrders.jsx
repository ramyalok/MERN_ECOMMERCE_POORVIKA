import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../utils/ApiAuth";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);
  const loadOrders = async () => {
    try {
      setLoading(true);

      const res = await getAllOrders();

      setOrders(res.data.data);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };
  const changeStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);

      toast.success("Order Updated");

      loadOrders();
    } catch (error) {
      toast.error("Update Failed");
    }
  };
  const filteredOrders = orders.filter((order) =>
    order.user?.username?.toLowerCase().includes(search.toLowerCase()),
  );
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold text-violet-700">
        Loading Orders...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-violet-50 p-6">
      <h1 className="text-4xl font-bold text-violet-700 mb-8">Manage Orders</h1>

      {/* Search */}

      <div className="relative mb-8">
        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-12 border rounded-lg"
        />
      </div>
      <div className="hidden lg:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-violet-600 text-white">
            <tr>
              <th className="p-4">Customer</th>

              <th>Email</th>

              <th>Products</th>

              <th>Total</th>

              <th>Payment</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="text-center border-b hover:bg-violet-50"
              >
                <td>{order.user?.username}</td>

                <td>{order.user?.email}</td>

                <td>{order.products.length}</td>

                <td>₹{order.totalAmount}</td>

                <td>{order.paymentMethod}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) => changeStatus(order._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option>Pending</option>

                    <option>Processing</option>

                    <option>Shipped</option>

                    <option>Delivered</option>

                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-5 lg:hidden">
        {filteredOrders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-bold text-violet-700">
              {order.user?.username}
            </h2>

            <p>{order.user?.email}</p>

            <p className="mt-2">
              <strong>Products:</strong> {order.products.length}
            </p>

            <p>
              <strong>Total:</strong>₹{order.totalAmount}
            </p>

            <p>
              <strong>Payment:</strong> {order.paymentMethod}
            </p>

            <select
              value={order.status}
              onChange={(e) => changeStatus(order._id, e.target.value)}
              className="border rounded-lg w-full mt-4 p-2"
            >
              <option>Pending</option>

              <option>Processing</option>

              <option>Shipped</option>

              <option>Delivered</option>

              <option>Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;