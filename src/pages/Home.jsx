import React from "react";
import Navbar from "../components/Navbar";
import ReportForm from "../components/ReportForm";
import ComplaintForm from "../components/ComplaintForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-white">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
          Campus Care
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-200 mb-10 transition-transform hover:scale-[1.02]">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Report an Issue</h2>
          <ReportForm />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200 transition-transform hover:scale-[1.02]">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Submit a Complaint</h2>
          <ComplaintForm />
        </div>
      </div>
    </div>
  );
}
