import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../utils/ApiAuth";
import { toast } from "react-toastify";
import { FaTrash, FaSearch } from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await getAllUsers();

      setUsers(res.data.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);

      toast.success("User deleted");

      loadUsers();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold text-violet-700">
        Loading Users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-50 p-6">
      <h1 className="text-4xl font-bold text-violet-700 mb-8">Manage Users</h1>

      {/* Search */}

      <div className="relative mb-8">
        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-12 border rounded-lg"
        />
      </div>

      {/* Desktop */}

      <div className="hidden lg:block bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-violet-600 text-white">
            <tr className="border-b  text-center h-16">
              <th className="w-1/5 p-4">Username</th>
              <th className="w-1/4">Email</th>
              <th className="w-1/6">Role</th>
              <th className="w-1/5">Joined On</th>
              <th className="w-1/6">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b text-center hover:bg-violet-50 h-16"
              >
                <td>{user.username}</td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      user.role === "admin" ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600"
                    disabled={user.role === "admin"}
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}

      <div className="grid lg:hidden gap-5">
        {filteredUsers.map((user) => (
          <div key={user._id} className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-bold text-violet-700">
              {user.username}
            </h2>

            <p>{user.email}</p>

            <p className="mt-2">
              <strong>Role:</strong> {user.role}
            </p>

            <p>
              <strong>Joined:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>

            <button
              onClick={() => handleDelete(user._id)}
              disabled={user.role === "admin"}
              className="mt-4 text-red-600"
            >
              <FaTrash size={22} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
