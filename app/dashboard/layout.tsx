import React from "react";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">{children}</div>
    </div>
  );
}
