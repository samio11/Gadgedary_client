"use client"; // Required for interactivity

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Navbar = () => {
  const router = useRouter();
  const { setEmail } = useAuth(); // Access the setEmail function from AuthContext

  const handleLogout = () => {
    // Clear email from context and cookies
    setEmail(null); // Clear email in context
    Cookies.remove("email"); // Remove the email cookie
    console.log("User logged out");

    // Redirect to the login page
    router.push("/login");
  };

  const handleBackToHome = () => {
    Swal.fire({
      title: "Redirecting",
      text: "Taking you back to the homepage...",
      icon: "info",
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      router.push("/"); // Redirect to the home page
    }, 1500);
  };

  return (
    <div className="h-full w-64 bg-gray-800 text-white flex flex-col justify-between p-4">
      <div>
        <h2 className="text-2xl font-bold mb-6">Gadgedary</h2>
        <ul className="flex flex-col gap-4">
          <li>
            <button
              className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
              onClick={() => router.push("/dashboard/home")}
            >
              🏠 Home
            </button>
          </li>
          <li>
            <button
              className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
              onClick={() => router.push("/dashboard/my-cart")}
            >
              🛒 My Cart
            </button>
          </li>
          <li>
            <button
              className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
              onClick={() => router.push("/dashboard/payment")}
            >
              💳 Payment
            </button>
          </li>
        </ul>
      </div>

      {/* Logout and Back to Home Buttons */}
      <div className="mt-4 flex flex-col gap-4">
        <button
          className="w-full text-left px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          🔓 Logout
        </button>
        <button
          className="w-full text-left px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleBackToHome}
        >
          🏡 Back to Home
        </button>
      </div>
    </div>
  );
};

export default Navbar;
