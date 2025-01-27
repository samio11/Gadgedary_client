"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaShoppingCart,
  FaEye,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { Dialog } from "@headlessui/react";

const Home_Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        const allProducts = response.data;
        const randomProducts = allProducts
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);
        setProducts(randomProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

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
              src={product.product_image}
              alt={product.name}
            />
            <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded group-hover:text-white">
              ${product.price}
            </div>
          </div>
          <div className="p-5 flex flex-col items-center text-center text-black group-hover:text-white">
            <h5 className="text-xl font-bold">{product.name}</h5>
            {/* <p className="text-sm mt-1">{product.description}</p> */}

            {/* Progress Bar */}
            <div className="mt-3 w-full">
              <span className="text-sm group-hover:text-white">
                {product.stock} Available
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

            {/* Buttons */}
            <div className="mt-4 w-full flex gap-2">
              <button
                onClick={() => openModal(product)}
                className="w-1/2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                <FaEye /> View Product
              </button>
              <button className="w-1/2 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Product Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          {selectedProduct && (
            <>
              <h2 className="text-2xl font-bold mb-3">
                {selectedProduct.name}
              </h2>
              <img
                className="w-full h-64 object-cover rounded-md mb-3"
                src={selectedProduct.product_image}
                alt={selectedProduct.name}
              />
              <p className="text-gray-700 mb-2">
                {/* {selectedProduct.description} */}
              </p>
              <p className="text-lg font-semibold">
                Price: ${selectedProduct.price}
              </p>
              <p className="text-gray-600">
                Available: {selectedProduct.stock}
              </p>
              <div className="flex items-center mt-3">
                {Array.from({ length: 5 }).map((_, index) => {
                  const starValue = index + 1;
                  return selectedProduct.rating >= starValue ? (
                    <FaStar key={index} className="text-yellow-500" />
                  ) : selectedProduct.rating >= starValue - 0.5 ? (
                    <FaStarHalfAlt key={index} className="text-yellow-500" />
                  ) : (
                    <FaRegStar key={index} className="text-gray-500" />
                  );
                })}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                Close
              </button>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Home_Products;
