"use client";
import React from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaHeadphones } from "react-icons/fa";
import { IoMdLaptop } from "react-icons/io";
import { IoMdTabletPortrait } from "react-icons/io";

const Home_Category_Card = () => {
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {/* Category Card */}
      <div
        className="flex flex-col items-center justify-center text-white rounded-xl bg-gradient-to-r from-black to-gray-700

p-4 hover:from-gray-800 hover:to-gray-900 transition duration-300"
      >
        <h3 className="text-lg font-bold">
          <IoPhonePortraitOutline size={35} />
        </h3>
        <p className="text-sm">Phone</p>
      </div>
      <div
        className="flex flex-col items-center justify-center text-white rounded-xl bg-gradient-to-r from-black to-gray-700

p-4 hover:from-gray-800 hover:to-gray-900 transition duration-300"
      >
        <h3 className="text-lg font-bold">
          <FaHeadphones size={35} />
        </h3>
        <p className="text-sm">Headphone</p>
      </div>
      <div
        className="flex flex-col items-center justify-center text-white rounded-xl bg-gradient-to-r from-black to-gray-700

p-4 hover:from-gray-800 hover:to-gray-900 transition duration-300"
      >
        <h3 className="text-lg font-bold">
          <IoMdLaptop size={35} />
        </h3>
        <p className="text-sm">Laptop</p>
      </div>
      <div
        className="flex flex-col items-center justify-center text-white rounded-xl bg-gradient-to-r from-black to-gray-700

p-4 hover:from-gray-800 hover:to-gray-900 transition duration-300"
      >
        <h3 className="text-lg font-bold">
          <IoMdTabletPortrait size={35} />
        </h3>
        <p className="text-sm">Tablet</p>
      </div>
    </div>
  );
};

export default Home_Category_Card;
