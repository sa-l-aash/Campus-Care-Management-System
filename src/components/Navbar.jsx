import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Menu, X, Plus } from "lucide-react";

export default function Navbar({ isAdmin = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("darkMode", newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const handleAdminClick = () => {
    const pin = prompt("Enter Admin PIN:");
    const correctPin = "1234"; // Change this to real validation later
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
    } else if (action === "stats") {
      navigate("/admin/stats");
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-gray-900 dark:to-gray-800 text-white shadow-md">
      <div className="w-[96%] max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
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

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Report Button */}
          {!isAdmin && (
            <>
              {/* Mobile icon */}
              <button
                onClick={handleReportClick}
                className="sm:hidden w-9 h-9 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-md hover:scale-110 transition focus:outline-none"
                aria-label="Add Report"
              >
                <Plus size={18} />
              </button>

              {/* Desktop button */}
              <button
                onClick={handleReportClick}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-full font-medium shadow hover:scale-105 transition duration-300"
              >
                <span className="text-xl font-bold">+</span>
                Report Issue
              </button>
            </>
          )}

          {/* Menu */}
          <div className="relative">
            {/* Mobile Menu */}
            <div className="sm:hidden">
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              {mobileMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white/90 backdrop-blur-md dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 rounded-xl shadow-xl w-44 z-30 animate-fade-in overflow-hidden">
                  {!isOnHomePage && (
                    <button
                      onClick={() => handleMenuSelect("home")}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-700"
                    >
                      Home
                    </button>
                  )}
                  {!isOnAdminPage && !isAdmin && (
                    <button
                      onClick={() => handleMenuSelect("admin")}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-700"
                    >
                      Admin
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      onClick={() => handleMenuSelect("stats")}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-700"
                    >
                      Stats
                    </button>
                  )}
                  <button
                    onClick={toggleDarkMode}
                    className="w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-700"
                  >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                  <button
                    onClick={() => handleMenuSelect("logout")}
                    className="w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Desktop Profile */}
            <div className="hidden sm:block">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-md hover:scale-105 transition focus:outline-none"
                aria-label="Profile menu"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl shadow-xl w-48 z-30 animate-fade-in overflow-hidden">
                  {!isOnHomePage && (
                    <button
                      onClick={() => handleMenuSelect("home")}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-700"
                    >
                      Home
                    </button>
                  )}
                  {!isOnAdminPage && !isAdmin && (
                    <button
                      onClick={() => handleMenuSelect("admin")}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-700"
                    >
                      Admin
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      onClick={() => handleMenuSelect("stats")}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-700"
                    >
                      Stats
                    </button>
                  )}
                  <button
                    onClick={toggleDarkMode}
                    className="w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-700"
                  >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                  <button
                    onClick={() => handleMenuSelect("logout")}
                    className="w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
