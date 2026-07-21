import React, { useState, useEffect } from "react";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
 const images = [
   "https://plus.unsplash.com/premium_photo-1733514432756-69bf2f284518?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1758225502621-9102d2856dc8?q=80&w=1205&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1575464655935-4862a537cce7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
 ];
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  return (
    <>
      <div className="p-5 bg-white shadow m-5 rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Welcome to Poorvika Stores
        </h2>
        <p className="text-gray-500 text-center">
          Your one-stop shop for all your needs. Explore our wide range of
          products and services.
        </p>
        {/* product quotes */}
        <p className="text-lg    mt-4 mb-4  text-center  italic">
          Quotes:"Life is not about finding yourself. Life is about creating
          yourself." — Hello Driven (Attributed to George Bernard Shaw)
        </p>
        <span className="text-rose-600 font-bold text-center block text-xl mb-5">
          <marquee>🔥 Hot Deals Available Now! 🔥</marquee>
        </span>
        {/* img slider */}
        {/* 🔥 SLIDER */}
        <div className="relative mt-4">
          <img
            src={images[currentIndex]}
            alt="slider"
            className="w-full h-64 object-cover rounded-lg transition duration-500"
          />

          {/* LEFT BUTTON */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded"
          >
            ◀
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded"
          >
            ▶
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
