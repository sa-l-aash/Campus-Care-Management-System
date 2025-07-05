import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ReportForm from "../components/ReportForm";
import ComplaintForm from "../components/ComplaintForm";

const API_BASE = "https://campus-care-management-system.onrender.com"; // 🌐 Render backend URL

export default function Home() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/reports`);
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error("❌ Failed to fetch reports:", err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-white pt-24">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6">Recent Issue Reports</h2>

        {reports.length === 0 ? (
          <p className="text-gray-600">No issues reported yet.</p>
        ) : (
          <div className="grid gap-6">
            {reports.map((report) => (
              <div
                key={report._id}
                className="bg-white p-5 rounded-xl shadow border-l-4 border-purple-400"
              >
                <h3 className="text-lg font-bold text-purple-700">
                  📍 {report.location}
                </h3>

                <p className="mt-2 text-gray-800">{report.description}</p>

                {/* ✅ Status Label */}
                <p
                  className={`text-sm font-medium mt-2 ${
                    report.status === "resolved" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {report.status === "resolved" ? "✅ Resolved" : "🟡 Pending"}
                </p>

                {/* Image (if present) */}
                {report.image?.data && (
                  <img
                    src={`data:${report.image.contentType};base64,${btoa(
                      new Uint8Array(report.image.data.data)
                        .reduce((acc, byte) => acc + String.fromCharCode(byte), "")
                    )}`}
                    alt="Report Image"
                    className="mt-4 max-w-xs rounded-lg border"
                  />
                )}

                <p className="text-sm text-gray-500 mt-2">
                  ⏱ {new Date(report.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
