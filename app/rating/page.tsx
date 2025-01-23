"use client"; // Ensures this is a client component
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import animationData from "../../public/l5.json";
import Home_Navbar from "../Home_Navbar";

const RatingPage = () => {
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [isMounted, setIsMounted] = useState(false); // To avoid hydration mismatch

  useEffect(() => {
    setIsMounted(true); // Ensures the component only renders on the client
  }, []);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    Swal.fire({
      title: "Thank You! 🎉",
      text: "Your feedback has been submitted successfully.",
      icon: "success",
      confirmButtonText: "OK",
      timer: 3000,
    });

    setEmail("");
    setRating(0);
    setDescription("");
  };

  if (!isMounted) return null; // Prevents SSR mismatches

  return (
    <div>
      <Home_Navbar></Home_Navbar>
      <div className="w-auto  h-auto flex justify-center items-center bg-gray-100 p-6">
        <div className="w-[80%] h-auto shadow-xl rounded-lg flex flex-col md:flex-row justify-center items-center p-5 bg-white">
          {/* Left Part - Lottie Animation */}
          <div className="flex-1 flex justify-center items-center">
            <Lottie
              className="h-[300px] md:h-[500px]"
              animationData={animationData}
            />
          </div>

          {/* Right Part - Rating Form */}
          <div className="flex-1 flex justify-center items-center">
            <div className="w-full max-w-md">
              <h2 className="text-center text-2xl font-semibold italic my-3">
                ⭐ Rate Your Experience
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Email Input */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />

                {/* Star Rating */}
                <div className="flex justify-center gap-2 my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer text-3xl transition ${
                        star <= rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>

                {/* Description */}
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  placeholder="Share your experience..."
                  required
                ></textarea>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
