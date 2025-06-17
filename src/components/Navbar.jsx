import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    const pin = prompt("Enter Admin PIN:");
    const correctPin = "1234"; // Replace with your actual admin PIN

    if (pin === correctPin) {
      navigate("/admin");
    } else {
      alert("Incorrect PIN. Access denied.");
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-xl font-semibold">Campus Care Management System</span>
        <button
          onClick={handleAdminAccess}
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-200"
        >
          Admin
        </button>
      </div>
    </nav>
  );
}