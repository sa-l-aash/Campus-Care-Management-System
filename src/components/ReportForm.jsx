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
    <form id="report" onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Report Broken Infrastructure</h2>
      <div className="mb-4">
        <label className="block font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          rows="3"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Upload Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="mt-1"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit Report
      </button>
    </form>
  );
}