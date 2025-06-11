import React, { useState } from "react";

export default function ComplaintForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/complaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      alert("Complaint submitted!");
      setMessage("");
    } catch (err) {
      console.error("Error submitting complaint", err);
    }
  };

  return (
    <form id="complain" onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Submit a Complaint</h2>
      <div className="mb-4">
        <label className="block font-medium">Complaint Message</label>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
          rows="4"
          required
        />
      </div>
      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Submit Complaint
      </button>
    </form>
  );
}