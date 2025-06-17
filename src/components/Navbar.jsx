import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";

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

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-xl font-bold tracking-wide">
          Campus Care
        </span>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-full hover:bg-white hover:text-purple-600 transition-all"
            aria-label="Open menu"
          >
            <MoreVertical size={22} />
          </button>

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
    </nav>
  );
}
