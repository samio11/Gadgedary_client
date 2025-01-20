"use client";

import React from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dynamically import react-slick
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const Home_Slider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable auto sliding
    autoplaySpeed: 5000, // 5000ms = 5 seconds
    pauseOnHover: true, // Pause when user hovers over the slide
  };

  return (
    <div className="w-full max-w-screen-xl h-[200px] md:h-[400px] mx-auto mt-2">
      <Slider {...settings}>
        <div className="h-full text-black flex items-center justify-center rounded-lg">
          <div className="flex-1 h-full w-full flex justify-center items-center text-center">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold">
                Explore Cutting-Edge Technology
              </h3>
              <p className="text-sm italic">
                Dive into the latest gadgets and innovations that redefine the
                tech world. <br /> Discover smart devices built for performance,
                efficiency, and style.
              </p>
              <button className="btn btn-primary btn-outline btn-wide">
                Shop Now
              </button>
            </div>
            <div className="flex-1">
              <img
                src="explore.png"
                className="w-full h-full rounded-lg"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="h-full text-black flex items-center justify-center rounded-lg">
          <div className="flex-1 h-full w-full flex justify-center items-center text-center">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold">Seamless Connectivity</h3>
              <p className="text-sm italic">
                Experience the power of technology that keeps you connected.{" "}
                <br /> From smartwatches to wireless earbuds, find everything
                you need to stay in sync.
              </p>
              <button className="btn btn-primary btn-outline btn-wide">
                Shop Now
              </button>
            </div>
            <div className="flex-1">
              <img
                src="connect.png"
                className="w-full h-full rounded-lg"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* 3 */}
        <div className="h-full text-black flex items-center justify-center rounded-lg">
          <div className="flex-1 h-full w-full flex justify-center items-center text-center">
            <div className="space-y-3">
              <h3 className="text-3xl font-bold">Transform Your Workspace</h3>
              <p className="text-sm italic">
                Upgrade your office with ergonomic tech solutions designed to
                boost productivity and comfort. <br /> From standing desks to
                powerful laptops, we’ve got you covered.
              </p>
              <button className="btn btn-primary btn-outline btn-wide">
                Shop Now
              </button>
            </div>
            <div className="flex-1">
              <img src="s1.png" className="w-full h-full rounded-lg" alt="" />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Home_Slider;
