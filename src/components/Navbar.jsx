import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export default function Navbar({ isAdmin = false }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAdminClick = () => {
    const pin = prompt("Enter Admin PIN:");
    const correctPin = "1234";
    if (pin === correctPin) {
      navigate("/admin");
    } else {
      alert("Incorrect PIN. Access denied.");
    }
  };

  const handleMenuSelect = (action) => {
    setMenuOpen(false);
    if (action === "admin") {
      handleAdminClick();
    } else if (action === "logout") {
      navigate("/auth");
    } else if (action === "home") {
      navigate("/");
    }
  };

  const handleReportClick = () => {
    navigate("/report");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left section: Logo + Home Button */}
        <div className="flex items-center gap-4">
          {/* Logo (also clickable) */}
          <button
            onClick={handleHomeClick}
            className="text-xl font-bold tracking-wide flex items-center gap-2 focus:outline-none hover:scale-105 transition-all"
          >
            <img
              src="/icons8-university-50-2.png"
              alt="Campus Icon"
              className="w-6 h-6"
            />
            Campus Care
          </button>

        </div>

        {/* Right section: Report + Profile */}
        <div className="flex items-center gap-4">
          {/* Report Issue Button */}
          <button
            onClick={handleReportClick}
            className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-full font-medium shadow hover:scale-105 transition-all duration-300 focus:outline-none active:scale-100"
          >
            <span className="text-xl font-bold">+</span>
            Report Issue
          </button>

          {/* Profile Menu Button */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-md hover:scale-105 transition-all focus:outline-none active:scale-100"
              aria-label="Profile menu"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-xl shadow-xl w-40 z-20 overflow-hidden animate-fade-in">
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => handleMenuSelect("home")}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => handleMenuSelect("logout")}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleMenuSelect("admin")}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100"
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => handleMenuSelect("logout")}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
