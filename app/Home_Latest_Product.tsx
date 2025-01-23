"use client";
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  availableQuantity: number;
  totalQuantity: number;
  rating: number;
  createdAt: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Digital Camera",
    description: "A high-quality digital camera with advanced features.",
    image:
      "https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1733826908271/2a5cf2dc7fb8d70796cba518780a9f7d.png",
    price: 299,
    availableQuantity: 30,
    totalQuantity: 50,
    rating: 4.5,
    createdAt: "2025-01-20",
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
    createdAt: "2025-01-22",
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
    createdAt: "2025-01-18",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    description: "Noise-canceling wireless headphones with deep bass.",
    image:
      "https://cdn.mos.cms.futurecdn.net/XTi8snZzoFnwW2vUmNg9EP-320-80.jpg",
    price: 199,
    availableQuantity: 50,
    totalQuantity: 80,
    rating: 4.6,
    createdAt: "2025-01-25",
  },
  {
    id: 5,
    name: "Smartwatch",
    description: "Feature-rich smartwatch with health monitoring sensors.",
    image:
      "https://fdn.gsmarena.com/imgroot/static/headers/makers/google-2023-1.jpg",
    price: 249,
    availableQuantity: 35,
    totalQuantity: 60,
    rating: 4.4,
    createdAt: "2025-01-24",
  },
  {
    id: 6,
    name: "Gaming Console",
    description: "Next-gen gaming console with ultra-fast processing power.",
    image:
      "https://pdbimg.choice.com.au/motorola-moto-g84-256gb_1_thumbnail.jpg",
    price: 499,
    availableQuantity: 25,
    totalQuantity: 50,
    rating: 4.9,
    createdAt: "2025-01-23",
  },
];

const Home_Products = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    const sortedProducts = [...products]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);
    setLatestProducts(sortedProducts);
  }, []);

  return (
    <div className="mt-12 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestProducts.map((product) => (
          <div
            key={product.id}
            className="relative group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="relative">
              <img
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                src={product.image}
                alt={product.name}
              />
              <div className="absolute top-4 left-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                ${product.price}
              </div>
            </div>
            <div className="p-5 text-center">
              <h5 className="text-2xl font-semibold text-gray-800">
                {product.name}
              </h5>
              <p className="text-sm text-gray-600 mt-2">
                {product.description}
              </p>
              <div className="flex justify-center mt-4 space-x-1">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`${
                      index < Math.floor(product.rating)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button className="btn btn-outline btn-wide">
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home_Products;
