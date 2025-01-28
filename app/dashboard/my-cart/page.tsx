"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "@/app/context/AuthContext";

export default function MyCartPage() {
  const { email } = useAuth(); // Retrieve email from AuthContext
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // State for total price
  const [coupon, setCoupon] = useState(""); // Coupon input
  const [discountedPrice, setDiscountedPrice] = useState(null); // Discounted price

  //   CUPONE IS:- SAMIO1122

  // Fetch cart items from API
  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:4000/cart/items/${email}`)
        .then((response) => {
          setCartItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });

      // Fetch total price from API
      axios
        .get(`http://localhost:4000/cart/total-price/${email}`)
        .then((response) => {
          setTotalPrice(response.data || 0); // Ensure total_price is valid
        })
        .catch((error) => {
          console.error("Error fetching total price:", error);
        });
    }
  }, [email]);

  // Handle coupon application
  const handleApplyCoupon = () => {
    if (coupon === "SAMIO1122") {
      const discount = totalPrice * 0.05; // 5% discount
      const newPrice = totalPrice - discount;
      setDiscountedPrice(newPrice);

      Swal.fire({
        title: "Coupon Applied!",
        text: `You saved $${discount.toFixed(2)}!`,
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "bg-green-500 text-white px-4 py-2 rounded",
        },
      });
    } else {
      Swal.fire({
        title: "Invalid Coupon!",
        text: "Please enter a valid coupon code.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "bg-red-500 text-white px-4 py-2 rounded",
        },
      });
    }
  };

  // Handle delete for a single product
  const handleDeleteProduct = (productId, productName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to remove "${productName}" from your cart?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "bg-red-500 text-white px-4 py-2 rounded",
        cancelButton: "bg-gray-500 text-white px-4 py-2 rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/cart/remove/${email}/${productId}`)
          .then(() => {
            const updatedCart = cartItems.filter(
              (item) => item.product_id !== productId
            );
            setCartItems(updatedCart);

            // Update total price
            const newTotal = updatedCart.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
            setTotalPrice(newTotal);
            setDiscountedPrice(null); // Reset discounted price

            Swal.fire({
              title: "Deleted!",
              text: `"${productName}" has been removed from your cart.`,
              icon: "success",
              confirmButtonText: "OK",
              customClass: {
                confirmButton: "bg-green-500 text-white px-4 py-2 rounded",
              },
            });
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  // Handle delete for the entire cart
  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove all items from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear the cart!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "bg-red-500 text-white px-4 py-2 rounded",
        cancelButton: "bg-gray-500 text-white px-4 py-2 rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/cart/remove/${email}`)
          .then(() => {
            setCartItems([]);
            setTotalPrice(0); // Reset total price
            setDiscountedPrice(null); // Reset discounted price

            Swal.fire({
              title: "Cart Cleared!",
              text: "All items have been removed from your cart.",
              icon: "success",
              confirmButtonText: "OK",
              customClass: {
                confirmButton: "bg-green-500 text-white px-4 py-2 rounded",
              },
            });
          })
          .catch((error) => {
            console.error("Error clearing cart:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  // Handle payment button click (placeholder logic)
  const handlePayment = () => {
    Swal.fire({
      title: "Processing Payment",
      text: "This feature is coming soon!",
      icon: "info",
      confirmButtonText: "OK",
      customClass: {
        confirmButton: "bg-blue-500 text-white px-4 py-2 rounded",
      },
    });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-700">
          Your cart is empty!
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Cart</h1>
      <div className="w-full max-w-6xl">
        <div className="overflow-hidden shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                <th className="text-left px-6 py-4 font-medium">Product</th>
                <th className="text-left px-6 py-4 font-medium">Details</th>
                <th className="text-left px-6 py-4 font-medium">Quantity</th>
                <th className="text-left px-6 py-4 font-medium">Price</th>
                <th className="text-center px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-6 py-4">
                    <img
                      src={item.product_image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-md"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-sm">{item.brand}</p>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                  </td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4 text-gray-800 font-bold">
                    ${item.price}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        handleDeleteProduct(item.product_id, item.name)
                      }
                      className="btn btn-outline btn-error"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Coupon Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 mt-4 shadow-md rounded-lg">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="px-4 py-2 border rounded-md w-64"
            />
            <button
              onClick={handleApplyCoupon}
              className="btn btn-outline btn-primary"
            >
              Apply Coupon
            </button>
          </div>
        </div>

        {/* Total Price Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 mt-4 shadow-md rounded-lg">
          <div>
            <p className="text-xl font-semibold text-gray-800">
              Original Price: ${totalPrice.toFixed(2)}
            </p>
            {discountedPrice !== null && (
              <p className="text-xl font-semibold text-green-600">
                Discounted Price: ${discountedPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <button
            onClick={handleClearCart}
            className="btn btn-outline btn-error btn-wide"
          >
            🗑️ Clear Cart
          </button>
          <button
            onClick={handlePayment}
            className="btn btn-outline btn-success btn-wide"
          >
            💳 Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
