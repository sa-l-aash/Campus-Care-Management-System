import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftCircle } from "lucide-react"; // More modern back icon

export default function ReportForm() {
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
    data.append("image", formData.image);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        body: data,
      });
      alert("Report submitted!");
      setFormData({ description: "", image: null });
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-24 max-w-2xl mx-auto">
      {/* Back Icon Button */}
      <div className="flex items-center mb-3">
        <button
          onClick={() => navigate(-1)}
          className="text-purple-600 hover:text-purple-800 transition"
          aria-label="Go back"
        >
          <ChevronLeftCircle size={28} />
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-blue-800 mb-5">
        Report a Concern/Incident
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Description */}
        <div>
          <label className="block text-blue-800 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400"
            rows="4"
            placeholder="Describe the issue..."
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-blue-800 font-medium mb-1">Upload Image</label>
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
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-md"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
