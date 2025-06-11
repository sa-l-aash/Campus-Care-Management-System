import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-xl font-semibold">Campus Care Management System</span>
        <div>
          <a href="#report" className="mr-4 hover:underline">Report</a>
          <a href="#complain" className="hover:underline">Complain</a>
        </div>
      </div>
    </nav>
  );
}