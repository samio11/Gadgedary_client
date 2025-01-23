"use client";
import React from "react";
import {
  FaShoppingCart,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  availableQuantity: number;
  totalQuantity: number;
  rating: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Digital Camera",
    description: "A high-quality digital camera with advanced features.",
    image:
      "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
    price: 299,
    availableQuantity: 30,
    totalQuantity: 50,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smartphone",
    description: "Latest 5G smartphone with high-resolution display.",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c",
    price: 699,
    availableQuantity: 20,
    totalQuantity: 40,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Laptop",
    description: "Powerful laptop with high-end performance and sleek design.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    price: 999,
    availableQuantity: 15,
    totalQuantity: 30,
    rating: 4.8,
  },
  {
    id: 4,
    name: "Wireless Headphones",
    description: "Noise-canceling wireless headphones with deep bass.",
    image: "https://www.bproperty.com/blog/wp-content/uploads/Feature-6.jpg",
    price: 199,
    availableQuantity: 50,
    totalQuantity: 80,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Smartwatch",
    description: "Feature-rich smartwatch with health monitoring sensors.",
    image:
      "https://cms.interiorcompany.com/wp-content/uploads/2024/02/smart-kitchen-gadgets-and-benefits.jpg",
    price: 249,
    availableQuantity: 35,
    totalQuantity: 60,
    rating: 4.4,
  },
  {
    id: 6,
    name: "Gaming Console",
    description: "Next-gen gaming console with ultra-fast processing power.",
    image:
      "https://matrixitworld.com/wp-content/uploads/2023/12/smart-watch-sits-smart-watch_843415-1959.jpg",
    price: 499,
    availableQuantity: 25,
    totalQuantity: 50,
    rating: 4.9,
  },
];
const Home_Products = () => {
  return (
    <div className="mt-5 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition duration-300 hover:bg-black hover:border-gray-700 transform hover:scale-105 hover:text-white group"
        >
          <div className="relative">
            <img
              className="w-full h-48 object-cover"
              src={product.image}
              alt={product.name}
            />
            <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded group-hover:text-white">
              ${product.price}
            </div>
          </div>
          <div className="p-5 flex flex-col items-center text-center text-black group-hover:text-white">
            <h5 className="text-xl font-bold">{product.name}</h5>
            <p className="text-sm mt-1">{product.description}</p>

            {/* Progress Bar */}
            <div className="mt-3 w-full">
              <span className="text-sm group-hover:text-white">
                {product.availableQuantity} / {product.totalQuantity} Available
              </span>
              <div className="w-full bg-gray-300 rounded-full h-3 mt-1 group-hover:bg-gray-700">
                <div
                  className="bg-gray-500 h-3 rounded-full group-hover:bg-gray-400"
                  style={{
                    width: `${
                      (product.availableQuantity / product.totalQuantity) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mt-3">
              {Array.from({ length: 5 }).map((_, index) => {
                const starValue = index + 1;
                return product.rating >= starValue ? (
                  <FaStar
                    key={index}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                ) : product.rating >= starValue - 0.5 ? (
                  <FaStarHalfAlt
                    key={index}
                    className="text-yellow-500 group-hover:text-yellow-300"
                  />
                ) : (
                  <FaRegStar
                    key={index}
                    className="text-gray-500 group-hover:text-gray-300"
                  />
                );
              })}
            </div>

            {/* Add to Cart Button */}
            <button className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home_Products;
