import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const API_BASE = "http://localhost:5000";

export default function Home() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/reports`);
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error("❌ Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-white pt-24">
      <Navbar />
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-6 text-center sm:text-left">
          Recent Issue Reports
        </h2>

        {/* Shimmer loader with one column */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white p-4 sm:p-5 rounded-2xl shadow-md border-l-4 border-purple-200"
              >
                <div className="h-4 bg-purple-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-purple-100 rounded w-full mb-2"></div>
                <div className="h-3 bg-purple-100 rounded w-5/6 mb-4"></div>
                <div className="h-40 bg-purple-100 rounded-xl mb-2"></div>
                <div className="h-3 bg-purple-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : reports.length === 0 ? (
          <p className="text-gray-600 text-center">No issues reported yet.</p>
        ) : (
          // Single column grid for reports
          <div className="grid grid-cols-1 gap-4">
            {reports.map((report) => (
              <div
                key={report._id}
                className="bg-white p-4 sm:p-5 rounded-2xl shadow-md border-l-4 border-purple-400 transition hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-purple-700">
                  📍 {report.location}
                </h3>

                <p className="mt-2 text-gray-800">{report.description}</p>

                <p
                  className={`text-sm font-medium mt-2 ${
                    report.status === "resolved"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {report.status === "resolved" ? "✅ Resolved" : "🟡 Pending"}
                </p>

                {report.image?.data && (
                  <img
                    src={`data:${report.image.contentType};base64,${btoa(
                      new Uint8Array(report.image.data.data).reduce(
                        (acc, byte) => acc + String.fromCharCode(byte),
                        ""
                      )
                    )}`}
                    alt="Report Image"
                    className="mt-3 w-full rounded-xl border object-cover max-h-52 sm:max-h-60"
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
