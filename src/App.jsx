import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components for home
import Navbar from "./components/Navbar";
import ReportForm from "./components/ReportForm";
import ComplaintForm from "./components/ComplaintForm";
// Auth page
import Auth from "./pages/Auth";

// Admin page
import AdminDashboard from "./pages/AdminDashboard";

function Home() {
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
         <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}