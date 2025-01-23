"use client";
import Lottie from "lottie-react";
import React from "react";

const Content_Box1 = () => {
  return (
    <div className="my-4 flex flex-col md:flex-row-reverse justify-center items-center gap-4">
      {/* Left side - Lottie Animation */}
      <div className="w-full lg:w-[50%]">
        <Lottie
          className="h-[300px] md:h-[500px]"
          animationData={require("../../public/l4.json")} // Use relative path to the public folder
        />
      </div>

      {/* Right side - FAQ Section */}
      <div className="w-full lg:w-[45%] flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
            Contact Us
          </h2>
          <p className="text-sm italic text-gray-500 font-semibold">
            We value your feedback and are always here to assist you. Whether
            you have questions about our products, need help with an order, or
            just want to share your thoughts, we’re happy to connect with you.
            Our team is dedicated to providing prompt and helpful responses to
            ensure you have the best experience with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content_Box1;
