import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../feature/wishlistSlice";
import { addToCart } from "../feature/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);
console.log(wishlistItems);
  return (
    <div className="min-h-screen bg-violet-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-violet-700 mb-10">
          My Wishlist ❤️
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <h2 className="text-2xl font-bold text-gray-600">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mt-2">
              Save your favourite products here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-lg p-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-52 object-contain"
                />

                <h2 className="text-xl font-bold mt-4">{item.name}</h2>

                <p className="text-gray-500">{item.brand}</p>

                <p className="text-violet-600 capitalize">{item.category}</p>

                <p className="text-green-600 text-2xl font-bold mt-3">
                  ₹ {item.price}
                </p>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="flex-1 bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700"
                  >
                    Move To Cart
                  </button>

                  <button
                    onClick={() => dispatch(removeFromWishlist(item._id))}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
