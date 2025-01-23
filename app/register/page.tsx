"use client";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link"; // Import Next.js Link component
import Lottie from "lottie-react";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Image:", image);
    // Handle registration logic here
  };

  const handleGoogle = () => {
    console.log("Google login clicked");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
  };

  return (
    <div className="w-auto md:w-screen h-auto md:h-screen flex justify-center items-center">
      <div className="w-[80%] h-auto shadow-xl rounded-lg flex flex-col md:flex-row-reverse justify-center items-center p-5">
        {/* Left Part (Animation) */}
        <div className="flex-1 flex justify-center items-center">
          <Lottie
            className="h-[300px] md:h-[500px]"
            animationData={require("../../public/l3.json")} // Use relative path to the public folder
          />
        </div>

        {/* Right Part (Form) */}
        <div className="flex-1 flex justify-center items-center">
          <div>
            <h2 className="text-center text-2xl font-semibold italic my-3">
              Sign Up
            </h2>
            <form onSubmit={handleRegister} className="space-y-3">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-500 text-gray-900 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                placeholder="Enter Name"
              />

              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-500 text-gray-900 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                placeholder="Enter Email"
              />

              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-500 text-gray-900 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                placeholder="Enter Password"
              />

              {/* File Upload */}
              <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-lg shadow-md">
                <input
                  type="file"
                  id="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center w-full h-full p-4 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
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
                </label>
              </div>

              <p className="text-xs">
                Already have an Account?{" "}
                <Link className="hover:underline" href="/login">
                  Sign In
                </Link>
              </p>

              <div className="flex justify-center items-center">
                <input
                  className="btn btn-outline btn-wide"
                  type="submit"
                  value="Register"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
