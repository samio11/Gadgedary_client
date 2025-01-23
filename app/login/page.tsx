"use client";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link"; // Import Next.js Link component
import Lottie from "lottie-react";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleGoogle = () => {
    // Handle Google login logic here
    console.log("Google login clicked");
  };

  return (
    <div className="w-auto md:w-screen h-auto md:h-screen flex justify-center items-center">
      <div className="w-[80%] h-auto shadow-xl rounded-lg flex flex-col md:flex-row justify-center items-center p-5">
        {/* Left Part */}
        <div className="flex-1 flex justify-center items-center">
          <Lottie
            className="h-[300px]md:h-[500px]"
            animationData={require("../../public/l2.json")} // Use relative path to the public folder
          />
        </div>

        {/* Right part */}
        <div className="flex-1 flex justify-center items-center">
          <div>
            <h2 className="text-center text-2xl font-semibold italic my-3">
              Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-3">
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

              <p className="text-xs">
                Don't have an Account?{" "}
                <Link className="hover:underline" href="/register">
                  Sign Up
                </Link>
              </p>
              <div className="flex justify-center items-center">
                <input
                  className="btn btn-outline btn-wide"
                  type="submit"
                  value="Login"
                />
              </div>
              <p className="text-center text-xs">--OR--</p>
              <div className="flex justify-center items-center">
                <button
                  onClick={handleGoogle}
                  className="btn btn-outline btn-wide"
                >
                  <FaGoogle /> Google Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
