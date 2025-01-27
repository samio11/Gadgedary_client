"use client";
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

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

const Home_Products = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        const sortedProducts = response.data
          .sort(
            (a: Product, b: Product) =>
              new Date(b.product_added_date).getTime() -
              new Date(a.product_added_date).getTime()
          )
          .slice(0, 3);
        setLatestProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleProduct = (product) => {
    Swal.fire({
      position: "top-end",
      title: "Going To Cart",
      showConfirmButton: false,
      timer: 2000,
      imageUrl:
        "https://images.squarespace-cdn.com/content/v1/54bc6cffe4b0fee4b02bd3c5/1520533858653-EL1OZQBC1PR49D66FES8/Highway-5-animation-studio-sophy.gif", // Replace with the path to your custom icon
      imageWidth: 200, // Optional: Set the width of the image
      imageHeight: 200, // Optional: Set the height of the image
      imageAlt: "Custom Icon", // Optional: Alt text for the image
    });

    // Store product data in localStorage
    localStorage.setItem("selectedProduct", JSON.stringify(product));

    // Navigate to /add_to_cart page
    setTimeout(() => {
      router.push("/add_to_cart");
    }, 2000);
  };

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
                src={product.product_image}
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
                {product.description.model} | {product.description.chipset} |{" "}
                {product.description.ram} RAM
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
              <button
                onClick={() => handleProduct(product)}
                className="btn btn-outline btn-wide"
              >
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
