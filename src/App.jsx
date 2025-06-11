import React from "react";
import Navbar from "./components/Navbar";
import ReportForm from "./components/ReportForm";
import ComplaintForm from "./components/ComplaintForm";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Campus Care</h1>
        <ReportForm />
        <hr className="my-8" />
        <ComplaintForm />
      </div>
    </div>
  );
}