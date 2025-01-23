"use client";
import React from "react";
import Home_Navbar from "./Home_Navbar";
import Home_Slider from "./Home_Slider";
import Home_Category_Card from "./Home_Category_Card";
import Home_Products from "./Home_Products";
import Home_Latest_Product from "./Home_Latest_Product";
import Home_Apply_Cupon from "./Home_Apply_Cupon";
import Home_Happy_Customers from "./Home_Happy_Customers";
import Home_Faq from "./Home_Faq";
import Footer from "./Footer";

const Home = () => {
  console.log("Rendering Shop by Category section...");
  return (
    <div className="h-auto">
      <Home_Navbar></Home_Navbar>
      <Home_Slider></Home_Slider>
      {/* Category Start */}
      <div className="my-7 md:my-2 lg:my-7 text-center h-[70px] space-y-3">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Shop by Category
        </h2>
        <p className="text-sm italic text-gray-500 font-semibold">
          Explore our wide range of products by category
        </p>
      </div>
      {/* Category End */}
      <Home_Category_Card></Home_Category_Card>
      <Home_Products></Home_Products>

      {/* latest product */}
      <div className="my-7 md:my-2 lg:my-7 text-center h-[70px] space-y-3">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Latest Products
        </h2>
        <p className="text-sm italic text-gray-500 font-semibold">
          Browse through our latest additions
        </p>
      </div>
      {/* Home Latest Product */}
      <Home_Latest_Product></Home_Latest_Product>
      {/* Cupon */}
      <Home_Apply_Cupon></Home_Apply_Cupon>

      {/* Happy Customer */}
      <div className="my-7 md:my-2 lg:my-7 text-center h-[70px] space-y-3">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Our Happy Customers
        </h2>
        <p className="text-sm italic text-gray-500 font-semibold">
          These are our top-rated customers who love what we do! Here's what
          they say about us.
        </p>
      </div>
      <Home_Happy_Customers></Home_Happy_Customers>

      {/* FAQ */}
      <div className="my-7 md:my-2 lg:my-7 text-center h-[70px] space-y-3">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-sm italic text-gray-500 font-semibold">
          Get answers to the most common questions our customers ask about our
          services.
        </p>
      </div>
      <Home_Faq></Home_Faq>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Home;
