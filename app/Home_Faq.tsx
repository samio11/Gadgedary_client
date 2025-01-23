import React from "react";
import Lottie from "lottie-react";

const Home_Faq = () => {
  return (
    <div className="my-4 flex flex-col md:flex-row justify-center items-center gap-4">
      {/* Left side - Lottie Animation */}
      <div className="w-full lg:w-[50%]">
        <Lottie
          className="h-[300px]"
          animationData={require("../public/l1.json")} // Use relative path to the public folder
        />
      </div>

      {/* Right side - FAQ Section */}
      <div className="w-full lg:w-[45%]">
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What products does Gadgedary sell?
            </div>
            <div className="collapse-content">
              <p className="text-xs">
                Gadgedary is your go-to platform for all things tech. We offer a
                wide range of products, including smartphones, laptops,
                smartwatches, gaming accessories, home electronics, and more.
                Explore our extensive collection to find the latest tech
                products at great prices!
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              How do I place an order on Gadgedary?
            </div>
            <div className="collapse-content">
              <p className="text-xs">
                Placing an order on Gadgedary is easy! Simply browse through our
                product categories, select the items you'd like to purchase, and
                add them to your cart. Once you're ready, proceed to checkout,
                provide your shipping details, and complete the payment to place
                your order.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              What payment methods are accepted on Gadgedary?
            </div>
            <div className="collapse-content">
              <p className="text-xs">
                We accept a variety of payment methods for your convenience.
                These include credit/debit cards, PayPal, and online bank
                transfers. Choose the option that works best for you during the
                checkout process.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-xl font-medium">
              How can I track my order?
            </div>
            <div className="collapse-content">
              <p className="text-xs">
                Once your order is shipped, you will receive a tracking number
                via email. You can use this tracking number to monitor the
                status of your order directly on the courier’s website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_Faq;
