import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <nav className="bg-blue-600 text-white p-4 shadow-md relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-xl font-semibold">
          Campus Care Management System
        </span>

        {/* Three-dot menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 hover:bg-blue-700 rounded"
          >
            <MoreVertical size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-40 z-10">
              {isAdmin ? (
                <>
                  <button
                    onClick={() => handleMenuSelect("home")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleMenuSelect("logout")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleMenuSelect("admin")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => handleMenuSelect("logout")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
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
