import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

// Mock function to simulate fetching coupon code from the database
const fetchCouponFromDatabase = async () => {
  // Simulate a delay like fetching from a real database
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve("SAMIO1122"), 1000)
  );
};

const Home_Apply_Cupon = () => {
  // State to manage the coupon code
  const [couponCode, setCouponCode] = useState<string>("SAMIO1122");
  const [userInput, setUserInput] = useState<string>("");
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch coupon code from the database on component mount
  useEffect(() => {
    const getCouponCode = async () => {
      const fetchedCoupon = await fetchCouponFromDatabase();
      setCouponCode(fetchedCoupon);
      setLoading(false);
    };
    getCouponCode();
  }, []);

  // Handle the coupon application logic
  const handleApplyCoupon = () => {
    if (userInput === couponCode) {
      setIsCouponApplied(true);
      Swal.fire({
        icon: "success",
        title: "Coupon Applied Successfully!",
        text: "You have successfully applied the coupon.",
        confirmButtonText: "Awesome!",
      });
    } else {
      setIsCouponApplied(false);
      Swal.fire({
        icon: "error",
        title: "Invalid Coupon Code",
        text: "The coupon code you entered is invalid.",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left Column - Text Section */}
        <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-accent-400">
            <svg className="text-teal-900 w-7 h-7" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                d="M21,11H13.707L16.854,7.854a1,1,0,0,0-1.414-1.414L11,10.707V3a1,1,0,0,0-2,0v7.707L7.561,6.44A1,1,0,0,0,6.146,7.854L9.293,11H3a1,1,0,0,0,0,2h6.707l-3.146,3.146A1,1,0,1,0,7.561,17.56L11,13.293V21a1,1,0,0,0,2,0v-7.707l3.146,3.146a1,1,0,1,0,1.414-1.414L12.707,13H21a1,1,0,0,0,0-2Z"
              />
            </svg>
          </div>
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Apply Special Coupon for{" "}
              <span className="inline-block text-deep-purple-accent-400">
                Extra Discounts!
              </span>
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Enjoy amazing discounts by applying special coupons. Enter your
              coupon code below and get exclusive offers on your next purchase!
            </p>
          </div>

          {/* Coupon Input Section */}
          {loading ? (
            <p>Loading your special coupon...</p>
          ) : (
            <div className="flex flex-col items-center mt-6">
              {/* <input
                type="text"
                className="w-80 p-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your coupon code"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button
                onClick={handleApplyCoupon}
                className="mt-4 w-full md:w-auto bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-teal-600 transition-all"
              >
                Apply Coupon
              </button> */}
            </div>
          )}
          {isCouponApplied && (
            <p className="mt-4 text-green-500">Coupon Applied Successfully!</p>
          )}
          {!isCouponApplied && userInput && (
            <p className="mt-4 text-red-500">Invalid Coupon Code</p>
          )}
        </div>

        {/* Right Column - Image Section */}
        <div className="flex items-center justify-center -mx-4 lg:pl-8">
          <div className="flex flex-col items-end px-3">
            <img
              className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
              src="https://img.freepik.com/premium-photo/cashier-applying-coupon-smiling-cashier-scanning-coupon-checkout_339701-23912.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="Discount"
            />
            <img
              className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
              src="https://www.nerdwallet.com/assets/blog/wp-content/uploads/2022/06/GettyImages-1146820061-1920x1152.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="Coupon"
            />
          </div>
          <div className="px-3">
            <img
              className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
              src="https://s28126.pcdn.co/blogs/ask-experian/wp-content/uploads/store-clerk-accepting-customer-digital-coupon.jpg.optimal.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
              alt="Savings"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_Apply_Cupon;
