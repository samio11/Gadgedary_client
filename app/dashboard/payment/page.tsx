"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function PaymentPage() {
  const { email } = useAuth();
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Fetch payment history from API
  useEffect(() => {
    if (email) {
      fetchPaymentHistory();
    }
  }, [email]);

  // Function to fetch payment history
  const fetchPaymentHistory = () => {
    axios
      .get(`http://localhost:4000/payment/user/${email}`)
      .then((response) => {
        setPaymentHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payment history:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch payment history. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "bg-red-500 text-white px-4 py-2 rounded",
          },
        });
      });
  };

  // Download table as PDF
  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.text("Payment History", 14, 10);

    // Format table data
    const tableData = paymentHistory.map((payment) => [
      payment.id,
      payment.product_name,
      `$${parseFloat(payment.price).toFixed(2)}`,
      payment.transaction_id,
      new Date(payment.payment_date).toLocaleString(),
      payment.payment_status,
    ]);

    doc.autoTable({
      head: [
        ["ID", "Product Name", "Price", "Transaction ID", "Date", "Status"],
      ],
      body: tableData,
    });

    doc.save("gadgedary.pdf");
  };

  // Delete all payments
  const deleteAllPayments = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete all your payment history.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "bg-red-500 text-white px-4 py-2 rounded",
        cancelButton: "bg-gray-500 text-white px-4 py-2 rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/payment/user/${email}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "All your payment history has been deleted.",
              icon: "success",
              confirmButtonText: "OK",
              customClass: {
                confirmButton: "bg-green-500 text-white px-4 py-2 rounded",
              },
            });
            setPaymentHistory([]); // Clear the table
          })
          .catch((error) => {
            console.error("Error deleting payment history:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete payment history. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
              customClass: {
                confirmButton: "bg-red-500 text-white px-4 py-2 rounded",
              },
            });
          });
      }
    });
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment History</h1>

      {/* Action Buttons */}
      <div className="flex justify-between mb-4 w-full max-w-6xl">
        {/* Download as PDF Button */}
        <button
          onClick={downloadAsPDF}
          className="btn btn-outline btn-success px-6 py-2 rounded-lg"
        >
          📄 Download as PDF
        </button>

        {/* Delete All Payments Button */}
        <button
          onClick={deleteAllPayments}
          className="btn btn-outline btn-error px-6 py-2 rounded-lg"
        >
          🗑️ Delete All Payments
        </button>
      </div>

      {/* Payment History Table */}
      <div className="w-full max-w-6xl">
        <div className="overflow-hidden shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <tr>
                <th className="text-left px-6 py-4 font-medium">ID</th>
                <th className="text-left px-6 py-4 font-medium">
                  Product Name
                </th>
                <th className="text-left px-6 py-4 font-medium">Price</th>
                <th className="text-left px-6 py-4 font-medium">
                  Transaction ID
                </th>
                <th className="text-left px-6 py-4 font-medium">Date</th>
                <th className="text-left px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-6 py-4">{payment.id}</td>
                  <td className="px-6 py-4">{payment.product_name}</td>
                  <td className="px-6 py-4">
                    ${parseFloat(payment.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">{payment.transaction_id}</td>
                  <td className="px-6 py-4">
                    {new Date(payment.payment_date).toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      payment.payment_status === "Paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {payment.payment_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
