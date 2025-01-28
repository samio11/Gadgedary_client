"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { email } = useAuth(); // Retrieve email from AuthContext
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      // Show SweetAlert2 alert and redirect to login
      Swal.fire({
        title: "Unauthorized Access",
        text: "You need to log in to access the dashboard.",
        icon: "warning",
        confirmButtonText: "Go to Login",
        allowOutsideClick: false,
        customClass: {
          confirmButton:
            "bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded",
        },
      }).then(() => {
        router.push("/login"); // Redirect to login page
      });
    }
  }, [email, router]);

  if (!email) {
    // Show nothing while redirecting
    return null;
  }

  return (
    <div className="bg-gray-100 h-full w-full p-8 flex flex-col items-center">
      {/* Welcome Header */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6 mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Manage your profile, view your cart, and track your payments all in
          one place. Use the sidebar to navigate through different sections.
        </p>
      </div>

      {/* Quick Links Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Home Card */}
        <div
          className="bg-blue-500 text-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition transform cursor-pointer flex flex-col items-center"
          onClick={() => router.push("/dashboard/home")}
        >
          <h2 className="text-2xl font-bold mb-2">🏠 Home</h2>
          <p className="text-center">
            Update your profile and personal information.
          </p>
        </div>

        {/* My Cart Card */}
        <div
          className="bg-green-500 text-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition transform cursor-pointer flex flex-col items-center"
          onClick={() => router.push("/dashboard/my-cart")}
        >
          <h2 className="text-2xl font-bold mb-2">🛒 My Cart</h2>
          <p className="text-center">
            View, edit, or checkout your cart items easily.
          </p>
        </div>

        {/* Payment Card */}
        <div
          className="bg-purple-500 text-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition transform cursor-pointer flex flex-col items-center"
          onClick={() => router.push("/dashboard/payment")}
        >
          <h2 className="text-2xl font-bold mb-2">💳 Payment</h2>
          <p className="text-center">
            Check your payment history and download invoices.
          </p>
        </div>
      </div>
    </div>
  );
}
