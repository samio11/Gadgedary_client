import React, { useState, useEffect } from "react";

// Sample customer data
const customers = [
  {
    name: "John Doe",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
    testimonial: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    name: "Jane Smith",
    rating: 4.9,
    avatar:
      "https://ik.imagekit.io/shortpedia/Voices/wp-content/uploads/2021/03/Happy-single-1.jpg",
    testimonial: "Best experience ever! Highly recommend.",
  },
  {
    name: "Alice Johnson",
    rating: 4.8,
    avatar: "https://ychef.files.bbci.co.uk/1280x720/p0bzhp2x.jpg",
    testimonial: "Incredible service! Definitely coming back again.",
  },
  {
    name: "Robert White",
    rating: 4.7,
    avatar:
      "https://images.unsplash.com/photo-1501613154255-5ca468d7423f?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8bGVnZW5kYXMlMjBhZGRpbmclMjBhZG1pbmlzdHJhdGl2ZXN8ZW58fHwwfHx8fDE2NzI5NzYzMzE&ixlib=rb-1.2.1&q=80&w=400",
    testimonial: "A wonderful experience, everything was perfect.",
  },
  {
    name: "Emily Davis",
    rating: 4.6,
    avatar:
      "https://images.unsplash.com/photo-1493372022803-fab3d49db682?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Nnx8ZmFjZXxlbnwwfHx8fDE2NzI5NzYzMzc&ixlib=rb-1.2.1&q=80&w=400",
    testimonial: "Exceeded my expectations. Great job!",
  },
  {
    name: "William Brown",
    rating: 4.5,
    avatar:
      "https://images.unsplash.com/photo-1494785363650-b0d084a3d945?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8M3x8Zm9vZHN8ZW58fHwwfHx8fDE2NzI5NzYzMjk&ixlib=rb-1.2.1&q=80&w=400",
    testimonial: "Amazing product! Would recommend it to anyone.",
  },
  {
    name: "Sophia Martinez",
    rating: 4.4,
    avatar:
      "https://images.unsplash.com/photo-1542685080-7b81ac2db7da?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Nnx8Zm9vZHN8ZW58fHwwfHx8fDE2NzI5NzYzMzk&ixlib=rb-1.2.1&q=80&w=400",
    testimonial: "A truly professional team. Would use again.",
  },
  {
    name: "Lucas Wilson",
    rating: 4.3,
    avatar:
      "https://images.unsplash.com/photo-1509130173440-71004f9e8f88?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OHx8Zm9vZHN8ZW58fHwwfHx8fDE2NzI5NzYzNDA&ixlib=rb-1.2.1&q=80&w=400",
    testimonial: "Great experience overall. Friendly staff.",
  },
];

const Home_Happy_Customers = () => {
  // Sort by rating to get the top 3 customers
  const topCustomers = [...customers]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-center space-x-8">
        {topCustomers.map((customer, index) => (
          <div
            key={index}
            className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex justify-center -mt-16 md:justify-end">
              <img
                className="object-cover w-24 h-24 border-4 border-blue-500 rounded-full dark:border-blue-400"
                alt={customer.name}
                src={customer.avatar}
              />
            </div>

            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
              {customer.name}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
              {customer.testimonial}
            </p>

            <div className="flex justify-end mt-4">
              <span className="text-lg font-medium text-blue-600 dark:text-blue-300">
                Rating: {customer.rating} ⭐
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home_Happy_Customers;
