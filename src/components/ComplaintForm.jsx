import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
// Our API base URL
const API_BASE = "http://localhost:5000";

export default function ComplaintForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
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

    const confirmed = window.confirm(
      "This is a private message and will only be visible to the administration.\n\nDo you want to confirm and send?"
    );
    if (!confirmed) return;

    const data = new FormData();
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      // Send POST request to submit complaint
      const res = await fetch(`${API_BASE}/api/complaints`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to submit complaint");

      alert("✅ Complaint submitted successfully!");
      setFormData({ description: "", image: null });
      navigate("/home");
    } catch (err) {
      console.error("Upload error", err);
      alert("❌ Submission failed.");
    }
  };

  return (
    <div
      className="mt-20 sm:mt-28 px-4 sm:px-6 lg:px-8 
                 w-[90%] max-w-6xl mx-auto 
                 min-h-[80vh] 
                 bg-white dark:bg-gray-900 
                 p-6 sm:p-8 
                 rounded-2xl shadow-lg 
                 border border-gray-200 dark:border-gray-700 
                 text-gray-900 dark:text-gray-100 
                 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <button
            onClick={() => navigate(-1)}
            className="bg-purple-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-gray-700 rounded-full p-2 transition mr-3"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-blue-900 dark:text-blue-300">
            Confidential Complaints
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate("/report")}
          className="px-4 py-2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border border-purple-300 dark:border-gray-600 rounded-full font-medium shadow hover:scale-105 transition-all duration-300 text-sm sm:text-base"
        >
          Damage Reports
        </button>
      </div>

     
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Description Field */}
        <div>
          <label className="block text-blue-900 dark:text-blue-300 font-semibold mb-1 text-sm sm:text-base">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-purple-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-gray-100 text-sm sm:text-base transition"
            rows="5"
            placeholder="Briefly describe your complaint..."
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-blue-900 dark:text-blue-300 font-semibold mb-1 text-sm sm:text-base">
            Upload Image (optional)
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-gray-600 dark:text-gray-300 file:mr-2 file:py-2 file:px-4
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
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-bold shadow transition-all text-sm sm:text-base"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}
