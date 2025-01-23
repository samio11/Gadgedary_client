import React from "react";
import Home_Navbar from "../Home_Navbar";
import Footer from "../Footer";
import Content_Box1 from "./Content_Box1";
import Content_Box2 from "./Content_Box2";
import Content_Box3 from "./Content_Box3";

const page = () => {
  return (
    <div>
      <Home_Navbar></Home_Navbar>
      <Content_Box1></Content_Box1>
      <Content_Box2></Content_Box2>
      <Content_Box3></Content_Box3>
      <Footer></Footer>
    </div>
  );
};

export default page;
