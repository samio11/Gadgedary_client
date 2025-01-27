"use client";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import Lottie from "lottie-react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"; // For navigation

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Handle Image Upload to ImgBB
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=38f0cf753c593d2033930e002b53c6dc`,
        formData
      );
      return response.data.data.url; // Return image URL
    } catch (error) {
      console.error("Image upload failed", error);
      Swal.fire("Error", "Image upload failed!", "error");
      return null;
    }
  };

  // Handle Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !image) {
      Swal.fire("Warning", "All fields are required!", "warning");
      setLoading(false);
      return;
    }

    try {
      // Upload Image to ImgBB
      const imageUrl = await uploadImage(image);
      if (!imageUrl) {
        setLoading(false);
        return;
      }

      // Send registration request
      const response = await axios.post(
        "http://localhost:4000/customer/register",
        {
          name,
          email,
          password,
          image: imageUrl, // Use uploaded image URL
        }
      );

      // Success message
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Redirecting to login...",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push("/login"); // Redirect to login page
      }, 2000);
    } catch (error) {
      console.error("Registration failed", error);
      Swal.fire("Error", "Registration failed!", "error");
    }

    setLoading(false);
  };

  // Handle File Change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="w-auto md:w-screen h-auto md:h-screen flex justify-center items-center">
      <div className="w-[80%] h-auto shadow-xl rounded-lg flex flex-col md:flex-row-reverse justify-center items-center p-5">
        {/* Left Animation */}
        <div className="flex-1 flex justify-center items-center">
          <Lottie
            className="h-[300px] md:h-[500px]"
            animationData={require("../../public/l3.json")}
          />
        </div>

        {/* Right Form */}
        <div className="flex-1 flex justify-center items-center">
          <div>
            <h2 className="text-center text-2xl font-semibold italic my-3">
              Sign Up
            </h2>
            <form onSubmit={handleRegister} className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
                placeholder="Enter Name"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
                placeholder="Enter Email"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
                placeholder="Enter Password"
              />

              {/* File Upload */}
              <div className="flex flex-col items-center justify-center w-full p-4 bg-white rounded-lg shadow-md">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  id="fileInput" // Add an id for accessibility
                />
                <label
                  htmlFor="fileInput" // Link label to input using `htmlFor`
                  className="flex flex-col items-center justify-center w-full p-4 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="mt-2 text-gray-600">
                    Upload Profile Picture
                  </span>{" "}
                  {/* Additional text */}
                </label>
              </div>

              <p className="text-xs">
                Already have an Account?{" "}
                <Link className="hover:underline" href="/login">
                  Sign In
                </Link>
              </p>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="btn btn-outline btn-wide"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
