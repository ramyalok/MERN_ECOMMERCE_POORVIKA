import React, { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addToCart } from "../feature/cartSlice";
import { getProducts } from "../utils/ApiAuth";
import { addToWishlist } from "../feature/wishlistSlice";

const Productlist = () => {
  // ================= Local States =================

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [visibleCount, setVisibleCount] = useState(20);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const dispatch = useDispatch();
  // ================= Fetch Products =================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await getProducts();

        console.log("Products:", response.data.data);

        setProducts(response.data.data);

        setLoading(false);
      } catch (error) {
        console.log(error);

        setError("Failed to load products");

        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ================= Add To Cart =================

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // ================= Buy Now =================

  const buyNow = (product) => {
    alert(
      `You have successfully purchased ${product.name}\nPrice : ₹${product.price}`,
    );
  };
  const handleWishlist = (product) => {
    dispatch(addToWishlist(product));
  };
  // ================= Show More =================

  const showMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  // ================= Show Less =================

  const showLess = () => {
    setVisibleCount(20);
  };

  // ================= Filter Products =================

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // ---------- Search ----------

    if (search.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.brand.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // ---------- Category ----------

    if (category !== "all") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // ---------- Sort ----------

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [products, search, category, sort]);

  // ================= Visible Products =================

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-violet-50">
      {/* ================= Heading ================= */}

      <div className="py-8 px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-violet-700">
          Our Products
        </h1>

        <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
          Browse our latest products at the best prices.
        </p>
      </div>

      {/* ================= Search / Category / Sort ================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Search */}

          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>

          {/* Category */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-violet-500 outline-none"
          >
            <option value="all">All Categories</option>

            {[...new Set(products.map((item) => item.category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Sort */}

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-violet-500 outline-none"
          >
            <option value="">Sort By</option>
            <option value="low">Price : Low → High</option>
            <option value="high">Price : High → Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* ================= Error ================= */}

      {error && (
        <p className="text-center text-red-600 font-semibold mb-5">{error}</p>
      )}

      {/* ================= Loading ================= */}

      {loading ? (
        <div className="flex justify-center items-center h-72">
          <div className="w-14 h-14 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2 flex flex-col overflow-hidden"
              >
                {/* Product Image */}

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-56 w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />

                {/* Product Details */}

                <div className="flex flex-col flex-grow p-4">
                  <h2 className="font-bold text-lg line-clamp-2 min-h-[56px]">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">{item.brand}</p>

                  <p className="text-violet-600 text-sm font-semibold capitalize">
                    {item.category}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-violet-700">
                      ₹ {item.price}
                    </span>

                    <span className="text-yellow-500 font-semibold">
                      ⭐ {item.rating}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    Stock : {item.stock}
                  </p>

                  <div className="mt-auto pt-5 space-y-3">
                    {/* First Row */}

                    <div className="grid grid-cols-2 gap-3">
                      {/* Buy Now */}

                      <button
                        disabled={!isAuthenticated}
                        onClick={() => {
                          if (!isAuthenticated) {
                            toast.error("Please login to continue");
                            navigate("/signuplogin");
                            return;
                          }

                          buyNow(item);
                        }}
                        className={`py-3 rounded-lg font-semibold transition duration-300 ${
                          isAuthenticated
                            ? "bg-violet-600 hover:bg-violet-700 text-white shadow-md hover:shadow-xl"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Buy Now
                      </button>

                      {/* Add to Cart */}

                      <button
                        disabled={!isAuthenticated}
                        onClick={() => {
                          if (!isAuthenticated) {
                            toast.error("Please login to add items to cart");
                            navigate("/signuplogin");
                            return;
                          }

                          handleAddToCart(item);
                        }}
                        className={`py-3 rounded-lg font-semibold transition duration-300 ${
                          isAuthenticated
                            ? "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-xl"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Add to Cart
                      </button>
                    </div>

                    {/* Wishlist */}

                    <button
                      disabled={!isAuthenticated}
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast.error("Please login to use Wishlist");
                          navigate("/signuplogin");
                          return;
                        }

                        handleWishlist(item);
                      }}
                      className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                        isAuthenticated
                          ? "bg-pink-500 hover:bg-pink-600 text-white shadow-md hover:shadow-xl"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      ❤️ Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* ================= No Products ================= */}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-600">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">Try another search or category.</p>
        </div>
      )}

      {/* ================= Show More / Show Less ================= */}

      {!loading && filteredProducts.length > 0 && (
        <div className="flex justify-center gap-4 py-10">
          {visibleCount < filteredProducts.length && (
            <button
              onClick={showMore}
              className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition"
            >
              Show More
            </button>
          )}

          {visibleCount > 20 && (
            <button
              onClick={showLess}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Show Less
            </button>
          )}
          {/* <button
           onClick={() => dispatch(addToWishlist(item))}
           className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
         >
           ❤️ Wishlist
         </button> */}
        </div>
      )}
    </div>
  );
};

export default Productlist;

//  try{
//     const response = await fetch("https://fakestoreapi.com/products");
//         console.log(response);
//         const jsondata =await response.json();
//         console.log(jsondata);
//         setProducts(jsondata);
//   }
//  {loading ?(<p className='text-center text-red-500'>Loading...</p>):()}

// 🧠 What actually happens step-by-step
// 🔹 Initial state
// visiblecount = 8

// 👉 Condition:

// visiblecount > 8 → false

// ➡️ Show Less ❌ hidden

// 🔹 Click Show More
// setVisiblecount(prev => prev + 12)

// 👉 Now:

// visiblecount = 20

// 👉 Condition:

// 20 > 8 → true

// ➡️ Show Less ✅ appears

// 🔹 Click Show Less
// setVisiblecount(8)

// 👉 Now React updates state:

// visiblecount = 8
// 🔹 AFTER state update (important 🔥)

// React re-renders component again:

// visiblecount > 8 → 8 > 8 → false

// ➡️ Show Less ❌ disappears

// 🔥 One-line answer

// 👉 The button click works because it was rendered when condition was true — it disappears only after state updates.

// | Step              | visiblecount | Show Less btn|
// | ----------------- | ------------ | --------- |
// | Initial           | 8            | ❌         |
// | Show More         | 20           | ✅         |
// | Show Less clicked | → set to 8   |           |
// | Re-render         | 8            | ❌         | visiblecount > 8 → 8 > 8 → false this line is excuted  less btn id hide
// 🎯 Key Concept (VERY IMPORTANT)

// 👉 React works like this:

// Event happens (click)
// State updates
// Component re-renders
// Conditions re-evaluated with new state
