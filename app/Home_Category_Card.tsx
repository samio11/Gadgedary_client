"use client";
import React, { useState } from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaHeadphones } from "react-icons/fa";
import { IoMdLaptop } from "react-icons/io";
import { IoMdTabletPortrait } from "react-icons/io";
import axios from "axios";

const categories = [
  { name: "Phones", icon: <IoPhonePortraitOutline size={35} />, api: "Phones" },
  { name: "Headphones", icon: <FaHeadphones size={35} />, api: "headphone" },
  { name: "Laptops", icon: <IoMdLaptop size={35} />, api: "laptop" },
  { name: "Tablets", icon: <IoMdTabletPortrait size={35} />, api: "tablet" },
];

const Home_Category_Card = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<
    { name: string; price: number; rating: number }[]
  >([]);

  const fetchProducts = async (category: string) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/products?category=${category}`
      );
      const topProducts = response.data
        .sort((a: any, b: any) => b.rating - a.rating)
        .slice(0, 10);
      setProducts(topProducts);
      setSelectedCategory(category);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {categories.map((category) => (
        <div
          key={category.name}
          onClick={() => fetchProducts(category.api)}
          className="flex flex-col items-center justify-center text-white rounded-xl bg-gradient-to-r from-black to-gray-700 p-4 hover:from-gray-800 hover:to-gray-900 transition duration-300 cursor-pointer"
        >
          <h3 className="text-lg font-bold">{category.icon}</h3>
          <p className="text-sm">{category.name}</p>
        </div>
      ))}

      {selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-30 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Top 10 {selectedCategory} Products
            </h2>
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Rating</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setSelectedCategory(null)}
              className="btn btn-primary w-full mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home_Category_Card;
