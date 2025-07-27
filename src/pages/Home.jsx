import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { io } from "socket.io-client";

// API base URL and socket initialization
const API_BASE = "https://campus-care-management-system.onrender.com";
const socket = io(API_BASE);

// Image modal component
const ImageModal = ({ src, onClose }) => {
  if (!src) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={src}
        alt="Enlarged"
        style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }}
      />
    </div>
  );
};

export default function Home() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null); // For modal

  useEffect(() => {
    fetchReports();

    // Real-time WebSocket updates
    socket.on("newReport", (newReport) => {
      setReports((prevReports) => [newReport, ...prevReports]);
    });

    return () => {
      socket.off("newReport");
    };
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/reports`);
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24">
      <Navbar />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 dark:text-white mb-6 text-center sm:text-left">
          Recent Issue Reports
        </h2>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by description or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          >
            <option value="all">🌐 All Statuses</option>
            <option value="pending">🟡 Pending</option>
            <option value="resolved">✅ Resolved</option>
          </select>
        </div>

        {/* Reports List */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Loading reports...
          </p>
        ) : filteredReports.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No reports match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredReports.map((report) => {
              const imageSrc = report.image?.data
                ? `data:${report.image.contentType};base64,${btoa(
                    new Uint8Array(report.image.data.data).reduce(
                      (acc, byte) => acc + String.fromCharCode(byte),
                      ""
                    )
                  )}`
                : null;

              return (
                <div
                  key={report._id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md border-l-4 border-purple-400 dark:border-purple-600 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400">
                    📌 {report.location}
                  </h3>
                  <p className="mt-2 text-gray-800 dark:text-gray-300">
                    {report.description}
                  </p>

                  <p
                    className={`text-sm font-medium mt-2 ${
                      report.status === "resolved"
                        ? "text-green-600 dark:text-green-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {report.status === "resolved"
                      ? "✅ Resolved"
                      : "🟡 Pending"}
                  </p>

                  {/* Clickable Image */}
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt="Report"
                      onClick={() => setSelectedImage(imageSrc)}
                      className="mt-3 w-full rounded-xl border object-cover max-h-60 dark:border-gray-700 cursor-pointer hover:opacity-90 transition"
                    />
                  )}

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    ⏱ {new Date(report.createdAt).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Image Modal */}
        <ImageModal
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </div>
    </div>
  );
}
