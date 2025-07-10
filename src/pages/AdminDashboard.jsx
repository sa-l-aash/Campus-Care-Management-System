import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const API_BASE = "http://localhost:5000";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState("reports");
  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingComplaints, setLoadingComplaints] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

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

  const filteredReports = reports
    .filter((report) => {
      const matchesSearch =
        report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ? true : report.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const filteredComplaints = complaints
    .filter((complaint) => {
      const matchesSearch = complaint.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ? true : complaint.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

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

        {/* Search, Filter & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search by description or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100"
          />

          <div className="flex gap-3">
            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="all">🔄 All Statuses</option>
              <option value="pending">🟡 Pending</option>
              <option value="resolved">✅ Resolved</option>
            </select>

            {/* Sort */}
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="px-4 py-2 rounded-full bg-gray-800 text-white font-medium hover:bg-gray-700 transition"
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
                {filteredReports.map((report) => (
                  <div
                    key={report._id}
                    className="border border-purple-200 dark:border-purple-700 p-4 sm:p-5 rounded-xl bg-white dark:bg-gray-800 shadow-md"
                  >
                    <p>
                      <strong>Description:</strong> {report.description}
                    </p>
                    <p>
                      <strong>Location:</strong> {report.location}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      ⏱ {new Date(report.createdAt).toLocaleString()}
                    </p>

                    <p
                      className={`text-sm font-medium mt-2 ${
                        report.status === "resolved"
                          ? "text-green-600"
                          : "text-yellow-500"
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
              <p className="text-gray-500 dark:text-gray-400 text-center">
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
                {filteredComplaints.map((complaint) => (
                  <div
                    key={complaint._id}
                    className="border border-red-200 dark:border-red-700 p-4 sm:p-5 rounded-xl bg-white dark:bg-gray-800 shadow-md"
                  >
                    <p>
                      <strong>Description:</strong> {complaint.description}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      ⏱ {new Date(complaint.createdAt).toLocaleString()}
                    </p>

                    <p
                      className={`text-sm font-medium mt-2 ${
                        complaint.status === "resolved"
                          ? "text-green-600"
                          : "text-yellow-500"
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
              <p className="text-gray-500 dark:text-gray-400 text-center">
                No matching complaints found.
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
