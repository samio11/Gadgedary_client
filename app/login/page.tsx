"use client";

import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // For handling cookies
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const LoginPage = () => {
  const { setEmail } = useAuth(); // Use global auth context
  const [email, setLocalEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields!",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/customer/login",
        { email, password },
        { withCredentials: true } // Important for sending cookies
      );

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Redirecting to dashboard...",
        timer: 2000,
        showConfirmButton: false,
      });

      // Store email in global context and cookies
      setEmail(email);
      Cookies.set("email", email, { expires: 1 }); // Store in cookies

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-auto md:w-screen h-auto md:h-screen flex justify-center items-center">
      <div className="w-[80%] h-auto shadow-xl rounded-lg flex flex-col md:flex-row justify-center items-center p-5">
        {/* Left Part */}
        <div className="flex-1 flex justify-center items-center">
          <Lottie
            className="h-[300px] md:h-[500px]"
            animationData={require("../../public/l2.json")}
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
                onChange={(e) => setLocalEmail(e.target.value)}
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
                <button
                  type="submit"
                  className={`btn btn-outline btn-wide ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
              <p className="text-center text-xs">--OR--</p>
              <div className="flex justify-center items-center">
                <button className="btn btn-outline btn-wide">
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
