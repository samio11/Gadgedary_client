"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");

  // Fetch User Data from API
  useEffect(() => {
    axios
      .get("http://localhost:4000/manage-customer/samioking6@gmail.com")
      .then((response) => {
        setUser(response.data);
        setUpdatedName(response.data.name);
        setUpdatedImage(response.data.image);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  // Function to Handle Update
  const handleUpdate = () => {
    axios
      .put("http://localhost:4000/manage-customer/samioking6@gmail.com", {
        name: updatedName,
        image: updatedImage,
      })
      .then(() => {
        setUser((prevUser) => ({
          ...prevUser,
          name: updatedName,
          image: updatedImage,
        }));
        setIsOpen(false);

        // Show SweetAlert2 Success Message
        Swal.fire({
          title: "🎉 Congratulations!",
          text: "Your profile has been successfully updated.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-green-500 text-white px-4 py-2 rounded",
          },
        });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      });
  };

  if (!user) {
    return <p className="text-center text-gray-600">Loading user data...</p>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
      {/* User Profile Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <img
          src={user.image}
          alt="User"
          className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
        />
        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          ✏️ Update Profile
        </button>
      </div>

      {/* Update Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-25"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <Dialog.Title className="text-xl font-bold mb-4 text-center">
              Update Profile
            </Dialog.Title>

            {/* Name Input */}
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            {/* Image URL Input */}
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              value={updatedImage}
              onChange={(e) => setUpdatedImage(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                ✅ Save Changes
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
