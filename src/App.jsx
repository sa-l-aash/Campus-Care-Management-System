import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ReportForm from "./components/ReportForm";

// Pages
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";

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
        {/* Wrap all pages that need Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportForm />} />
        </Route>

        {/* Routes without Navbar */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}
