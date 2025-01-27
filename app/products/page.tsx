"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import Home_Navbar from "../Home_Navbar";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  product_image: string;
  product_added_date: string;
  description: {
    model: string;
    chipset: string;
    ram: string;
    storage: string;
    color: string;
  };
}

const ProductsPage = () => {
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [budgetRange, setBudgetRange] = useState({ min: 500, max: 1000 });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch paginated products
  useEffect(() => {
    const fetchPaginatedProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/products/paginated?page=${currentPage}&limit=5`
        );
        setPaginatedProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching paginated products:", error);
      }
    };
    fetchPaginatedProducts();
  }, [currentPage]);

  // Fetch budget-filtered products
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/products/filter-by-budget?min_budget=${budgetRange.min}&max_budget=${budgetRange.max}`
        );
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };
    fetchFilteredProducts();
  }, [budgetRange]);

  const handleShowDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBudgetRange((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  return (
    <div className="p-6">
      <Home_Navbar></Home_Navbar>

      {/* Paginated Products Section */}
      <section className="mb-12">
        <h2 className="text-2xl text-center font-semibold my-6">
          See All Our Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all"
            >
              <img
                className="h-56 w-full object-cover rounded-lg"
                src={product.product_image}
                alt={product.name}
              />
              <h3 className="text-xl font-bold mt-4 text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 mt-1">${product.price}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleShowDetails(product)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <FaEye className="mr-2" /> Show Details
                </button>
                <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 border rounded">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </section>

      {/* Budget Filter Section */}
      <section>
        <h2 className="text-2xl text-center font-semibold my-6">
          Products within Budget
        </h2>
        <div className="flex items-center space-x-4 mb-6">
          <label htmlFor="min_budget" className="font-semibold">
            Min Budget:
          </label>
          <input
            type="number"
            id="min_budget"
            name="min"
            value={budgetRange.min}
            onChange={handleBudgetChange}
            className="border px-4 py-2 rounded focus:outline-none"
          />
          <label htmlFor="max_budget" className="font-semibold">
            Max Budget:
          </label>
          <input
            type="number"
            id="max_budget"
            name="max"
            value={budgetRange.max}
            onChange={handleBudgetChange}
            className="border px-4 py-2 rounded focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all"
            >
              <img
                className="h-56 w-full object-cover rounded-lg"
                src={product.product_image}
                alt={product.name}
              />
              <h3 className="text-xl font-bold mt-4 text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 mt-1">${product.price}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleShowDetails(product)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <FaEye className="mr-2" /> Show Details
                </button>
                <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          className="relative z-50"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            aria-hidden="true"
          ></div>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
              <Dialog.Title className="text-2xl font-bold mb-4">
                {selectedProduct.name}
              </Dialog.Title>
              <img
                className="w-full rounded-lg mb-4"
                src={selectedProduct.product_image}
                alt={selectedProduct.name}
              />
              <p>
                <strong>Price:</strong> ${selectedProduct.price}
              </p>
              <p>
                <strong>Model:</strong> {selectedProduct.description.model}
              </p>
              <p>
                <strong>Chipset:</strong> {selectedProduct.description.chipset}
              </p>
              <p>
                <strong>RAM:</strong> {selectedProduct.description.ram}
              </p>
              <p>
                <strong>Storage:</strong> {selectedProduct.description.storage}
              </p>
              <p>
                <strong>Color:</strong> {selectedProduct.description.color}
              </p>
              <button
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ProductsPage;
