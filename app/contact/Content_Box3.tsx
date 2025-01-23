"use client"; // Ensures it's a client component

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaPaperPlane } from "react-icons/fa"; // Import send icon

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
        map.flyTo([latitude, longitude], 13); // Move map to user's location
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

  // Function to handle sending email
  const handleSendEmail = () => {
    const mailtoLink = `mailto:samiohasan6@gmail.com?subject=Contact%20Form%20Message&body=${encodeURIComponent(
      `Email: ${email}\n\nMessage: ${message}`
    )}`;
    window.location.href = mailtoLink; // Open user's email client
  };

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
      {/* Left Side - Contact Form */}
      <div className="w-full md:w-[45%] p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h2>
        <p className="text-gray-600 mb-4">We are always here to help you.</p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Message Input */}
        <textarea
          placeholder="Your Message"
          className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        {/* Send Button */}
        <button
          onClick={handleSendEmail}
          className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <FaPaperPlane /> Send Message
        </button>
      </div>

      {/* Right Side - Scrollable Leaflet Map with User Location */}
      <div className="w-full md:w-[53%] h-[300px] md:h-[500px] overflow-hidden rounded-lg">
        <MapContainer
          center={[23.8103, 90.4125]} // Default center (Dhaka, Bangladesh)
          zoom={13}
          scrollWheelZoom={true} // Allows zooming with the scroll wheel
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MyLocationMarker /> {/* Shows user's live location */}
        </MapContainer>
      </div>
    </div>
  );
};

export default Content_Box3;
