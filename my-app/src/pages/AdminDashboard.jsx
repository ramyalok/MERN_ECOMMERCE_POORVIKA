import React from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaShoppingCart,
  FaBoxOpen,
  FaRupeeSign,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../utils/ApiAuth";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);
  return (
    <div className="min-h-screen bg-violet-50 p-8">
      <h1 className="text-4xl font-bold text-violet-700 mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <FaUsers className="text-4xl text-violet-600 mx-auto mb-3" />
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-3xl font-bold"> {stats.totalUsers}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <FaBoxOpen className="text-4xl text-violet-600 mx-auto mb-3" />
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-3xl font-bold"> {stats.totalProducts}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <FaShoppingCart className="text-4xl text-violet-600 mx-auto mb-3" />
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <FaRupeeSign className="text-4xl text-violet-600 mx-auto mb-3" />
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-3xl font-bold">₹{stats.revenue}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {/* Users */}
        <Link
          to="/allusers"
          className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-1 transition duration-300"
        >
          <FaUsers className="text-5xl text-violet-600 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-800">Manage Users</h2>

          <p className="text-gray-500 mt-2">View all registered users.</p>
        </Link>

        {/* Products */}
        <Link
          to="/manageproducts"
          className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-1 transition duration-300"
        >
          <FaBoxOpen className="text-5xl text-violet-600 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-800">Manage Products</h2>

          <p className="text-gray-500 mt-2">Add, edit or remove products.</p>
        </Link>

        {/* Orders */}
        <Link
          to="/manageorders"
          className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-1 transition duration-300"
        >
          <FaShoppingCart className="text-5xl text-violet-600 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-800">Manage Orders</h2>

          <p className="text-gray-500 mt-2">View orders and update status.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
