import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Menu, X } from "lucide-react";

export default function Navbar({ isAdmin = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
    if (action === "admin") {
      handleAdminClick();
    } else if (action === "logout") {
      navigate("/auth");
    } else if (action === "home") {
      navigate("/home");
    }
  };

  const handleReportClick = () => {
    navigate("/report");
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  const isOnHomePage = location.pathname === "/home";
  const isOnAdminPage = location.pathname === "/admin";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Left: Logo */}
        <button
          onClick={handleHomeClick}
          className="text-lg sm:text-xl font-bold tracking-wide flex items-center gap-2 focus:outline-none hover:scale-105 transition-all"
        >
          <img
            src="/icons8-university-50-2.png"
            alt="Campus Icon"
            className="w-6 h-6"
          />
          Campus Care
        </button>

        {/* Right section: Report Button + Profile */}
        <div className="flex items-center gap-4">
          {/* Report Button (Always visible on large screens) */}
          {!isAdmin && (
            <button
              onClick={handleReportClick}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-full font-medium shadow hover:scale-105 transition duration-300 focus:outline-none active:scale-100"
            >
              <span className="text-xl font-bold">+</span>
              Report Issue
            </button>
          )}

          {/* Profile Menu */}
          <div className="relative">
            {/* Mobile Hamburger Icon */}
            <div className="sm:hidden">
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Profile Button */}
            <div className="hidden sm:block">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-md hover:scale-105 transition-all focus:outline-none active:scale-100"
                aria-label="Profile menu"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-xl shadow-xl w-40 z-20 overflow-hidden animate-fade-in">
                  {!isOnHomePage && (
                    <button
                      onClick={() => handleMenuSelect("home")}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100"
                    >
                      Home
                    </button>
                  )}
                  {!isOnAdminPage && !isAdmin && (
                    <button
                      onClick={() => handleMenuSelect("admin")}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100"
                    >
                      Admin
                    </button>
                  )}
                  <button
                    onClick={() => handleMenuSelect("logout")}
                    className="w-full text-left px-4 py-2 hover:bg-purple-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown (Report Button + Profile Options) */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white text-gray-800 rounded-b-xl shadow-md px-4 py-3 space-y-2">
          {/* Report Button visible in mobile dropdown */}
          {!isAdmin && (
            <button
              onClick={handleReportClick}
              className="block w-full text-left px-4 py-2 rounded-lg bg-purple-50 text-purple-600 font-medium hover:bg-purple-100"
            >
              ➕ Report Issue
            </button>
          )}
          {!isOnHomePage && (
            <button
              onClick={() => handleMenuSelect("home")}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-purple-100"
            >
              Home
            </button>
          )}
          {!isOnAdminPage && !isAdmin && (
            <button
              onClick={() => handleMenuSelect("admin")}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-purple-100"
            >
              Admin
            </button>
          )}
          <button
            onClick={() => handleMenuSelect("logout")}
            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-purple-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
