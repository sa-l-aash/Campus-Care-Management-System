import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ReportForm from "./components/ReportForm";
import ComplaintForm from "./components/ComplaintForm"; // ✅ Step 1

// Pages
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";

// Layout with Navbar
const Layout = () => (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <div className="p-6 max-w-4xl mx-auto">
      <Outlet />
    </div>
  </div>
);

// Home Page Content
const Home = () => (
  <div>
    <h1 className="text-3xl font-bold text-center mb-8">Campus Care</h1>
    {/* No forms here */}
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/complaint" element={<ComplaintForm />} /> {/* ✅ Step 2 */}
        </Route>

        {/* Routes without Navbar */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <ToastContainer/>
    </Router>
  );
}
