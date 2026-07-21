import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../utils/ApiAuth";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts();

      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      toast.success("Product deleted");

      loadProducts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold text-violet-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-50 p-6">
      {/* Heading */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold text-violet-700">Manage Products</h1>

        <Link
          to="/addproduct"
          className="bg-violet-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-violet-700"
        >
          <FaPlus />
          Add Product
        </Link>
      </div>

      {/* Search */}

      <div className="relative mb-8">
        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 p-3 rounded-lg border"
        />
      </div>

      {/* Desktop Table */}

      <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-violet-600 text-white">
            <tr>
              <th className="p-4">Image</th>

              <th>Name</th>

              <th>Category</th>

              <th>Brand</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Rating</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product._id}
                className="border-b text-center hover:bg-violet-50"
              >
                <td className="p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </td>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>{product.brand}</td>

                <td>₹{product.price}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      product.stock > 10
                        ? "bg-green-500"
                        : product.stock > 0
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>

                <td>{product.rating}</td>

                <td>
                  <button
                    onClick={() => navigate(`/editproduct/${product._id}`)}
                    className="text-blue-600 mr-4"
                  >
                    <FaEdit size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="grid lg:hidden gap-5">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-40 mx-auto object-contain"
            />

            <h2 className="font-bold text-xl mt-3">{product.name}</h2>

            <p>{product.brand}</p>

            <p>{product.category}</p>

            <p className="font-bold text-violet-700">₹{product.price}</p>

            <p>Stock : {product.stock}</p>

            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => navigate(`/editproduct/${product._id}`)}>
                <FaEdit className="text-blue-600" size={22} />
              </button>

              <button onClick={() => handleDelete(product._id)}>
                <FaTrash className="text-red-600" size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
