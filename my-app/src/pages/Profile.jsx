import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../utils/ApiAuth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-violet-50">
        <div className="text-xl font-semibold text-violet-700">
          Loading Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-violet-600 text-white py-8 flex flex-col items-center">
          <FaUserCircle size={100} />

          <h1 className="text-3xl font-bold mt-4">{user.username}</h1>

          <p className="opacity-90">{user.email}</p>
        </div>

        {/* Profile Details */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-violet-700 mb-6">
            My Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 bg-violet-50 p-4 rounded-xl">
              <FaUserCircle className="text-violet-600 text-2xl" />
              <div>
                <p className="text-gray-500 text-sm">Username</p>
                <h3 className="font-semibold">{user.username}</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-violet-50 p-4 rounded-xl">
              <FaEnvelope className="text-violet-600 text-2xl" />
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <h3 className="font-semibold">{user.email}</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-violet-50 p-4 rounded-xl">
              <FaUserShield className="text-violet-600 text-2xl" />
              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <h3 className="font-semibold capitalize">{user.role}</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-violet-50 p-4 rounded-xl">
              <FaCalendarAlt className="text-violet-600 text-2xl" />
              <div>
                <p className="text-gray-500 text-sm">Member Since</p>
                <h3 className="font-semibold">
                  {new Date(user.createdAt).toLocaleDateString()}
                </h3>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="text-2xl font-bold text-violet-700 mt-10 mb-6">
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-3 gap-5">
            <button
              onClick={() => navigate("/orders")}
              className="bg-violet-600 text-white p-5 rounded-xl hover:bg-violet-700 transition"
            >
              <FaShoppingBag className="mx-auto text-3xl mb-3" />
              My Orders
            </button>

            <button
              onClick={() => navigate("/wishlist")}
              className="bg-pink-500 text-white p-5 rounded-xl hover:bg-pink-600 transition"
            >
              <FaHeart className="mx-auto text-3xl mb-3" />
              Wishlist
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="bg-green-600 text-white p-5 rounded-xl hover:bg-green-700 transition"
            >
              <FaShoppingCart className="mx-auto text-3xl mb-3" />
              Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
