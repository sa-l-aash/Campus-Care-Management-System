import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ReportForm from "./components/ReportForm";
import ComplaintForm from "./components/ComplaintForm";
import ResetPassword from "./pages/ResetPassword";

// Pages
import Home from "./pages/Home"; // ✅ Use actual Home.jsx
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStats from "./pages/AdminStats";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Optional: Add if you want default styles

// Layout that includes the Navbar
const Layout = () => (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <div className="p-6 max-w-4xl mx-auto">
      <Outlet />
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🔁 Redirect base path to /auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

  
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/complaint" element={<ComplaintForm />} />
        </Route>

    
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<AdminDashboard />} />
         <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/admin/stats" element={<AdminStats />} />

      </Routes>

      <ToastContainer />
    </Router>
  );
}
