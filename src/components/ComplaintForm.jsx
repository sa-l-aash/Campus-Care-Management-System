import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
      "⚠️ This is a private message and will only be visible to the administration.\n\nDo you want to confirm and send?"
    );
    if (!confirmed) return;

    const data = new FormData();
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await fetch(`${API_BASE}/api/complaints`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Failed to submit complaint");
      }

      alert("✅ Complaint submitted successfully!");
      setFormData({ description: "", image: null });
      navigate("/home"); // Redirect to Home page after success
    } catch (err) {
      console.error("Upload error", err);
      alert("❌ Submission failed.");
    }
  };

  return (
    <div className="mt-16 mx-4 sm:mt-28 sm:mx-auto sm:max-w-2xl lg:max-w-4xl bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
      {/* Header with Back Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <div className="flex items-center mb-3 sm:mb-0">
          <button
            onClick={() => navigate(-1)}
            className="bg-purple-100 text-purple-600 hover:bg-purple-200 rounded-full p-2 transition mr-3"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900">
            Confidential Complaints
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate("/report")}
          className="px-4 py-2 bg-white text-purple-600 border border-purple-300 rounded-full font-medium shadow hover:scale-105 transition-all duration-300 max-w-fit self-center sm:self-auto"
        >
          Damage Reports
        </button>
      </div>

      {/* Complaint Form */}
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* Description */}
        <div>
          <label className="block text-blue-900 font-semibold mb-1 text-sm sm:text-base">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
            rows="4"
            placeholder="Briefly describe your complaint..."
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-blue-900 font-semibold mb-1 text-sm sm:text-base">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-3
                       file:rounded-full file:border-0
                       file:font-semibold
                       file:bg-purple-50 file:text-purple-700
                       hover:file:bg-purple-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold shadow hover:from-blue-600 hover:to-purple-600 transition-all"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}
