import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const API_BASE = "https://campus-care-management-system.onrender.com";

// ✅ Image Modal Component
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
        alt="Full View"
        style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }}
      />
    </div>
  );
};

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState("reports");
  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingComplaints, setLoadingComplaints] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedImage, setSelectedImage] = useState(null); // ✅ For Modal

  useEffect(() => {
    fetchReports();
    fetchComplaints();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/reports`);
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoadingReports(false);
    }
  };

  const fetchComplaints = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/complaints`);
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.error("Failed to fetch complaints:", err);
    } finally {
      setLoadingComplaints(false);
    }
  };

  const handleDeleteReport = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      await fetch(`${API_BASE}/api/reports/${id}`, { method: "DELETE" });
      fetchReports();
    }
  };

  const handleDeleteComplaint = async (id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      await fetch(`${API_BASE}/api/complaints/${id}`, { method: "DELETE" });
      fetchComplaints();
    }
  };

  const handleMarkResolvedReport = async (id) => {
    await fetch(`${API_BASE}/api/reports/${id}/status`, { method: "PATCH" });
    fetchReports();
  };

  const handleMarkResolvedComplaint = async (id) => {
    await fetch(`${API_BASE}/api/complaints/${id}/status`, { method: "PATCH" });
    fetchComplaints();
  };

  const filteredReports = reports
    .filter((report) => {
      const matchesSearch =
        report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || report.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  const filteredComplaints = complaints
    .filter((complaint) => {
      const matchesSearch = complaint.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || complaint.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  const renderImage = (image) => {
    if (!image?.data) return null;
    try {
      const base64String = btoa(
        new Uint8Array(image.data.data).reduce(
          (acc, byte) => acc + String.fromCharCode(byte),
          ""
        )
      );
      return `data:${image.contentType};base64,${base64String}`;
    } catch (err) {
      console.error("Error rendering image:", err);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Navbar isAdmin />

      <div className="pt-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 dark:text-blue-300 mb-8 text-center">
          Admin Dashboard
        </h2>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-6">
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "reports"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            📋 Reports
          </button>
          <button
            onClick={() => setActiveTab("complaints")}
            className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "complaints"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            🗣 Complaints
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="🔍 Search by description or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100"
          />
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="all">All Statuses</option>
              <option value="pending">🟡 Pending</option>
              <option value="resolved">✅ Resolved</option>
            </select>
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {sortOrder === "asc" ? "⬆️ Oldest First" : "⬇️ Newest First"}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "reports" ? (
          <section>
            {loadingReports ? (
              <p className="text-center text-gray-500 dark:text-gray-400">Loading reports...</p>
            ) : filteredReports.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {filteredReports.map((report) => {
                  const imageSrc = renderImage(report.image);
                  return (
                    <div
                      key={report._id}
                      className="border border-purple-200 dark:border-purple-700 p-4 sm:p-5 rounded-xl bg-white dark:bg-gray-800 shadow-md"
                    >
                      <p><strong>Description:</strong> {report.description}</p>
                      <p><strong>Location:</strong> {report.location}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        ⏱ {new Date(report.createdAt).toLocaleString()}
                      </p>
                      {imageSrc && (
                        <img
                          src={imageSrc}
                          alt="Report"
                          onClick={() => setSelectedImage(imageSrc)}
                          className="mt-3 w-full rounded-lg border object-cover max-h-52 sm:max-h-60 cursor-pointer hover:opacity-90 transition"
                        />
                      )}
                      <p
                        className={`text-sm font-medium mt-2 ${
                          report.status === "resolved"
                            ? "text-green-600"
                            : "text-yellow-500"
                        }`}
                      >
                        {report.status === "resolved" ? "✅ Resolved" : "🟡 Pending"}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {report.status === "pending" && (
                          <button
                            onClick={() => handleMarkResolvedReport(report._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition"
                          >
                            Mark as Resolved
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReport(report._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
                        >
                          Delete Report
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No matching reports found.
              </p>
            )}
          </section>
        ) : (
          <section>
            {loadingComplaints ? (
              <p className="text-center text-gray-500 dark:text-gray-400">Loading complaints...</p>
            ) : filteredComplaints.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {filteredComplaints.map((complaint) => {
                  const imageSrc = renderImage(complaint.image);
                  return (
                    <div
                      key={complaint._id}
                      className="border border-red-200 dark:border-red-700 p-4 sm:p-5 rounded-xl bg-white dark:bg-gray-800 shadow-md"
                    >
                      <p><strong>Description:</strong> {complaint.description}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        ⏱ {new Date(complaint.createdAt).toLocaleString()}
                      </p>
                      {imageSrc && (
                        <img
                          src={imageSrc}
                          alt="Complaint"
                          onClick={() => setSelectedImage(imageSrc)}
                          className="mt-3 w-full rounded-lg border object-cover max-h-52 sm:max-h-60 cursor-pointer hover:opacity-90 transition"
                        />
                      )}
                      <p
                        className={`text-sm font-medium mt-2 ${
                          complaint.status === "resolved"
                            ? "text-green-600"
                            : "text-yellow-500"
                        }`}
                      >
                        {complaint.status === "resolved" ? "✅ Resolved" : "🟡 Pending"}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {complaint.status === "pending" && (
                          <button
                            onClick={() =>
                              handleMarkResolvedComplaint(complaint._id)
                            }
                            className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition"
                          >
                            Mark as Resolved
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteComplaint(complaint._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
                        >
                          Delete Complaint
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No matching complaints found.
              </p>
            )}
          </section>
        )}

        {/* ✅ Modal for image */}
        <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
      </div>
    </div>
  );
}
