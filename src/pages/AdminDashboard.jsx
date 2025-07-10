import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const API_BASE = "http://localhost:5000";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState("reports"); // tabs: 'reports' or 'complaints'
  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingComplaints, setLoadingComplaints] = useState(true);

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
      console.error("❌ Failed to fetch reports:", err);
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
      console.error("❌ Failed to fetch complaints:", err);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <Navbar isAdmin />

      <div className="pt-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-8 text-center">
          Admin Dashboard
        </h2>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "reports"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            📋 Reports
          </button>
          <button
            onClick={() => setActiveTab("complaints")}
            className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "complaints"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            🗣 Complaints
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "reports" && (
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-4 sm:mb-6">
              📋 Damage Reports
            </h3>

            {loadingReports ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 animate-pulse">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="border border-purple-100 p-4 sm:p-5 rounded-xl bg-white shadow-md"
                  >
                    <div className="h-4 bg-purple-200 rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-purple-100 rounded w-full mb-2"></div>
                    <div className="h-3 bg-purple-100 rounded w-5/6 mb-4"></div>
                    <div className="h-32 bg-purple-100 rounded-xl mb-2"></div>
                    <div className="h-3 bg-purple-100 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : reports.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {reports.map((report) => (
                  <div
                    key={report._id}
                    className="border border-purple-200 p-4 sm:p-5 rounded-xl bg-white shadow-md"
                  >
                    <p className="text-gray-800">
                      <strong>Description:</strong> {report.description}
                    </p>
                    <p className="text-gray-800">
                      <strong>Location:</strong> {report.location}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      ⏱ {new Date(report.createdAt).toLocaleString()}
                    </p>

                    <p
                      className={`text-sm font-medium mt-2 ${
                        report.status === "resolved"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {report.status === "resolved"
                        ? "✅ Resolved"
                        : "🟡 Pending"}
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
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reports available.</p>
            )}
          </section>
        )}

        {activeTab === "complaints" && (
          <section>
            <h3 className="text-xl sm:text-2xl font-semibold text-red-700 mb-4 sm:mb-6">
              🗣️ Complaints
            </h3>

            {loadingComplaints ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 animate-pulse">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="border border-red-100 p-4 sm:p-5 rounded-xl bg-white shadow-md"
                  >
                    <div className="h-4 bg-red-200 rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-red-100 rounded w-full mb-2"></div>
                    <div className="h-3 bg-red-100 rounded w-5/6 mb-4"></div>
                    <div className="h-32 bg-red-100 rounded-xl mb-2"></div>
                    <div className="h-3 bg-red-100 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : complaints.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {complaints.map((complaint) => (
                  <div
                    key={complaint._id}
                    className="border border-red-200 p-4 sm:p-5 rounded-xl bg-white shadow-md"
                  >
                    <p className="text-gray-800">
                      <strong>Description:</strong> {complaint.description}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      ⏱ {new Date(complaint.createdAt).toLocaleString()}
                    </p>

                    <p
                      className={`text-sm font-medium mt-2 ${
                        complaint.status === "resolved"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {complaint.status === "resolved"
                        ? "✅ Resolved"
                        : "🟡 Pending"}
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
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No complaints available.</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
