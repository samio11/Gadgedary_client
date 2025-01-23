import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"; // Import React Icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              {/* Your Logo */}
              <a
                href="/"
                aria-label="Gadgedary"
                title="Gadgedary"
                className="inline-flex items-center"
              >
                <svg
                  className="w-8 text-blue-500"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  stroke="currentColor"
                  fill="none"
                >
                  <rect x="2" y="2" width="20" height="20" rx="3" />
                  <circle cx="6" cy="6" r="1" />
                  <circle cx="18" cy="6" r="1" />
                  <circle cx="6" cy="18" r="1" />
                  <circle cx="18" cy="18" r="1" />
                  <line x1="6" y1="6" x2="18" y2="6" />
                  <line x1="6" y1="6" x2="6" y2="18" />
                  <line x1="18" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="18" />
                </svg>
                <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                  Gadgedary
                </span>
              </a>
            </h3>
            <p className="text-sm">
              Gadgedary is a leading e-commerce platform offering the latest and
              best in tech products. Shop for gadgets, smartphones, laptops,
              accessories, and more. Our goal is to bring quality tech to your
              doorstep at affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <a
                  href="#products"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">
              Email:{" "}
              <a
                href="mailto:samiohasan6@.com"
                className="text-gray-400 hover:text-white"
              >
                support@gadgedary.com
              </a>
            </p>
            <p className="text-sm">Phone: +8801709801305</p>
            <p className="text-sm">Nikunja-02,Khilkhet,Dhaka-1229</p>
          </div>

          {/* Social Media */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/samio.hasan.37"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebookF className="text-lg" />
              </a>

              <a
                href="https://www.instagram.com/samiohasan6/?__pwa=1"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="https://www.youtube.com/"
                className="text-gray-400 hover:text-white"
              >
                <FaYoutube className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-10">
          <p className="text-sm text-gray-400">
            &copy; 2025 Gadgedary. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
