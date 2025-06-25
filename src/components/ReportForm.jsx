import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
    data.append("image", formData.image);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        body: data,
      });
      alert("Report submitted!");
      setFormData({ description: "", location: "", image: null });
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  return (
    <div className="mt-28 max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl relative">
      {/* Back Button (styled like ComplaintForm) */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 bg-purple-100 text-purple-600 hover:bg-purple-200 rounded-full p-2 transition"
        aria-label="Back"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Header and Confidential Button */}
      <div className="flex justify-between items-center mb-6 pt-1 pl-12 pr-4">
        <h2 className="text-2xl font-bold text-blue-900">Issue Reports</h2>

        <button
          type="button"
          onClick={() => navigate("/complaint")}
          className="px-4 py-2 bg-white text-purple-600 border border-purple-300 rounded-full font-medium shadow hover:scale-105 transition-all duration-300"
        >
          Confidential Complaints
        </button>
      </div>

      {/* Report Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location */}
        <div>
          <label className="block text-blue-900 font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="e.g., Library – East Wing"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-blue-900 font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows="4"
            placeholder="Briefly describe the issue..."
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-blue-900 font-semibold mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-purple-50 file:text-purple-700
                       hover:file:bg-purple-100"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold shadow hover:from-blue-600 hover:to-purple-600 transition-all"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
