import React from "react";

const Content_Box2 = () => {
  return (
    <div className="my-4 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {/* Box1 */}
      <div className="space-y-2 shadow-xl p-6 text-center">
        <h2 className="font-semibold text-2xl">Our Location</h2>
        <p className="text-sm italic text-gray-600">
          Nikunja-2,Khilkhet,Dhaka-1229
        </p>
      </div>
      {/* Box1 */}
      <div className="space-y-2 shadow-xl p-6 text-center">
        <h2 className="font-semibold text-2xl">Email Us</h2>
        <p className="text-sm italic text-gray-600">samiohasan6@gmail.com</p>
      </div>
      {/* Box1 */}
      <div className="space-y-2 shadow-xl p-6 text-center">
        <h2 className="font-semibold text-2xl">Mobile Chat</h2>
        <p className="text-sm italic text-gray-600">+8801709801305</p>
      </div>
    </div>
  );
};

export default Content_Box2;
