import React, { useState } from "react";

export default function ReportForm() {
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
    <form
      id="report"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="block text-blue-800 font-medium mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400"
          required
        />
      </div>

      <div>
        <label className="block text-blue-800 font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400"
          rows="3"
          required
        />
      </div>

      <div>
        <label className="block text-blue-800 font-medium mb-1">Upload Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full text-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-md"
      >
        Submit Report
      </button>
    </form>
  );
}
