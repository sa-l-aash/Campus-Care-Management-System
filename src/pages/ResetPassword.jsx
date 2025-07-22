import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { confirmPasswordReset } from "firebase/auth";
// Handle password reset
export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const oobCode = searchParams.get("oobCode"); // unique Firebase code
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode, newPassword);
      alert("Password reset successfully! Please log in.");
      navigate("/auth");
    } catch (err) {
      console.error(err);
      alert(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center border border-blue-200">
        {/* Header with logo */}
        <div className="flex justify-center items-center mb-6">
          <img
            src="/icons8-university-50-2.png"
            alt="Campus Care Icon"
            className="h-8 w-8 mr-3"
          />
          <h1 className="text-3xl font-bold text-blue-800">Campus Care</h1>
        </div>

        {/* Page Title */}
        <h2 className="text-2xl font-semibold text-purple-700 mb-2">
          Reset Password 🔑
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your new password to secure your account.
        </p>

        {/* Reset Password Form */}
        <form onSubmit={handleResetPassword} className="space-y-4 text-left">
          {/* New Password */}
          <div>
            <label className="block mb-1 text-blue-800 font-medium">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-blue-800 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full p-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold shadow-md transition-all ${
              loading
                ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Back to Login Link */}
        <button
          onClick={() => navigate("/auth")}
          className="mt-4 text-sm text-purple-600 hover:underline"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}
