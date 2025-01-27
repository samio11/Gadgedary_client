"use client"; // Ensures it's a client component

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser"; // Import EmailJS

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component to track user's location
const MyLocationMarker = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        map.flyTo([latitude, longitude], 13);
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );
  }, [map]);

  return position ? (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
};

const Content_Box3 = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Function to handle sending email using EmailJS
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      user_email: email,
      message: message,
    };

    try {
      await emailjs.send(
        "service_p2ifpic", // Replace with your EmailJS Service ID
        "template_60vrd6s", // Replace with your EmailJS Template ID
        templateParams,
        "e0BkME0-a_SVd9ae6" // Replace with your EmailJS Public Key
      );

      setSuccess("Message sent successfully!");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Email sending error:", error);
      setSuccess("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
      {/* Left Side - Contact Form */}
      <div className="w-full md:w-[45%] p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h2>
        <p className="text-gray-600 mb-4">We are always here to help you.</p>

        <form onSubmit={handleSendEmail}>
          {/* Email Input */}
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Message Input */}
          <textarea
            placeholder="Your Message"
            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          {/* Send Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded-md transition`}
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <FaPaperPlane /> Send Message
              </>
            )}
          </button>

          {/* Success/Error Message */}
          {success && (
            <p
              className={`mt-2 text-center ${
                success.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {success}
            </p>
          )}
        </form>
      </div>

      {/* Right Side - Scrollable Leaflet Map with User Location */}
      <div className="w-full md:w-[53%] h-[300px] md:h-[500px] overflow-hidden rounded-lg">
        <MapContainer
          center={[23.8103, 90.4125]} // Default center (Dhaka, Bangladesh)
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MyLocationMarker />
        </MapContainer>
      </div>
    </div>
  );
};

export default Content_Box3;
