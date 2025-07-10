import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const API_BASE = "http://localhost:5000";

export default function ReportForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("description", formData.description);
    data.append("location", formData.location);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await fetch(`${API_BASE}/api/reports`, {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("✅ Report submitted successfully!");
        setFormData({ description: "", location: "", image: null });
        navigate("/home"); // Redirect to Home Page
      } else {
        alert("❌ Failed to submit the report. Please try again.");
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("❌ Server error while submitting the report.");
    }
  };

  return (
    <div
      className="mt-16 mx-2 sm:mt-28 sm:mx-auto 
      w-full max-w-md sm:max-w-2xl lg:max-w-4xl
      bg-white dark:bg-gray-900
      p-4 sm:p-6
      rounded-2xl border border-gray-200 dark:border-gray-700
      shadow-md text-gray-900 dark:text-gray-100 transition-all"
    >
      {/* Header with Back Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 sm:mb-6">
        <div className="flex items-center mb-3 sm:mb-0">
          <button
            onClick={() => navigate(-1)}
            className="bg-purple-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-gray-700 rounded-full p-2 transition mr-2 sm:mr-3"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-blue-900 dark:text-blue-300">
            Damage Reports
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate("/complaint")}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border border-purple-300 dark:border-gray-600 rounded-full font-medium shadow hover:scale-105 transition-all duration-300 text-sm sm:text-base"
        >
          Confidential Complaints
        </button>
      </div>

      {/* Report Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Location */}
        <div>
          <label className="block text-blue-900 dark:text-blue-300 font-semibold mb-1 text-sm sm:text-base">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-purple-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base transition"
            placeholder="e.g., Library – East Wing"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-blue-900 dark:text-blue-300 font-semibold mb-1 text-sm sm:text-base">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-purple-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base transition"
            rows="4"
            placeholder="Briefly describe the issue..."
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-blue-900 dark:text-blue-300 font-semibold mb-1 text-sm sm:text-base">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-gray-600 dark:text-gray-300 file:mr-2 file:py-1.5 file:px-3
                       file:rounded-full file:border-0
                       file:font-semibold
                       file:bg-purple-50 dark:file:bg-gray-700
                       file:text-purple-700 dark:file:text-purple-300
                       hover:file:bg-purple-100 dark:hover:file:bg-gray-600"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-bold shadow transition-all text-sm sm:text-base"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
