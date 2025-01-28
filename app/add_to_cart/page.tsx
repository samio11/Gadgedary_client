"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPlus, FaMinus, FaStar, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const AddToCart = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity set to 1
  const [loading, setLoading] = useState(true); // To handle loading state
  const { email } = useAuth(); // Auth context
  const router = useRouter();

  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");

    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
      setLoading(false); // Set loading to false once product is loaded
    }
  }, []);

  const handleAddToCart = async () => {
    // Check if the user is logged in
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You need to log in to add products to your cart.",
        confirmButtonText: "Go to Login",
        customClass: {
          confirmButton: "bg-blue-500 text-white px-4 py-2 rounded",
        },
      }).then(() => {
        router.push("/login"); // Redirect to the login page
      });
      return;
    }

    try {
      const data = {
        customer_email: email,
        product_id: product.id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
        rating: product.rating,
        product_image: product.product_image,
        warranty: product.warranty,
        product_added_date: new Date().toISOString().split("T")[0],
        offer_available: product.offer_available,
        quantity: quantity, // Send the quantity selected by the user
      };

      const response = await axios.post("http://localhost:4000/cart/add", data);

      if (response.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product added to cart!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to add product to cart",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error adding product to cart:", error);
    }
  };

  // Function to handle quantity increase
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle quantity decrease
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Prevent quantity from going below 1
    }
  };

  // Handle "Back" button functionality (redirect to previous route)
  const handleBack = () => {
    window.history.back(); // Goes to the previous page in history
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin border-t-4 border-indigo-600 border-solid w-16 h-16 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-6">
      {product ? (
        <div className="flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 p-6 rounded-3xl shadow-xl">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
            <img
              className="w-80 h-80 object-cover rounded-xl transform hover:scale-105 transition duration-500 ease-in-out shadow-xl"
              src={product.product_image}
              alt={product.name}
            />
          </div>

          {/* Right side - Product Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6 bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">
                {product.name}
              </h2>
              <p className="text-lg text-gray-700">
                {product.category} - {product.brand}
              </p>

              <div className="flex items-center mt-4">
                <div className="text-yellow-500 flex">
                  {/* Rating Stars */}
                  {Array.from({ length: 5 }).map((_, index) => {
                    const starValue = index + 1;
                    return product.rating >= starValue ? (
                      <FaStar key={index} />
                    ) : (
                      <FaStar key={index} className="text-gray-300" />
                    );
                  })}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  ({product.rating})
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-2xl font-semibold text-gray-800">
                  Price: ${product.price}
                </p>
                <p className="text-lg text-gray-500">
                  Warranty: {product.warranty ? "Yes" : "No"}
                </p>
                <p className="text-lg text-gray-500">
                  Offer Available: {product.offer_available ? "Yes" : "No"}
                </p>
                <p className="text-lg text-gray-500">
                  Added on: {product.product_added_date}
                </p>
              </div>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center space-x-4">
              <button
                onClick={decreaseQuantity}
                className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-full transition duration-300"
              >
                <FaMinus />
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-16 text-center border border-gray-300 rounded-lg text-lg font-medium"
              />
              <button
                onClick={increaseQuantity}
                className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-full transition duration-300"
              >
                <FaPlus />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col space-y-4 w-full">
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 w-full"
              >
                Add to Cart
              </button>

              {/* Back Button */}
              <button
                onClick={handleBack}
                className="bg-gray-300 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-lg w-full"
              >
                <FaArrowLeft className="inline mr-2" />
                Back
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AddToCart;
