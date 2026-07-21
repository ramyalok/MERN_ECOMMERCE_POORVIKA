import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, updateProduct, getProductById } from "../utils/ApiAuth";
import { toast } from "react-toastify";
const ProductForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const isEdit = Boolean(id);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    image: "",
    price: "",
    stock: "",
    rating: "",
  });

  useEffect(() => {
    if (isEdit) {
      loadProduct();
    }
  }, []);
  const loadProduct = async () => {
    try {
      const res = await getProductById(id);

      setProduct(res.data.data);
    } catch (error) {
      toast.error("Unable to load product");
    }
  };
  const handleChange = (e) => {
    setProduct({
      ...product,

      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateProduct(id, product);

        toast.success("Product Updated");
      } else {
        await createProduct(product);

        toast.success("Product Added");
      }

      navigate("/manageproducts");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-violet-50 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-8"
      >
        <h2 className="text-3xl font-bold text-violet-700 mb-8">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>
        <div className="mb-4">
          <label className="font-semibold">Product Name</label>

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Description</label>

          <textarea
            rows="4"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Category</label>

          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Brand</label>

          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Image URL</label>

          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Price</label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold">Stock</label>

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div className="mb-6">
          <label className="font-semibold">Rating</label>

          <input
            type="number"
            step="0.1"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700"
          >
            {isEdit ? "Update Product" : "Add Product"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/manageproducts")}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;