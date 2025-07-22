import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Pie,
  Bar
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const API_BASE = "http://localhost:5000";

export default function AdminStats() {
  const [reportStats, setReportStats] = useState(null);
  const [complaintStats, setComplaintStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch both report and complaint stats
      const [reportRes, complaintRes] = await Promise.all([
        fetch(`${API_BASE}/api/reports/stats`),
        fetch(`${API_BASE}/api/complaints/stats`),
      ]);

      const reportData = await reportRes.json();
      const complaintData = await complaintRes.json();

      setReportStats(reportData);
      setComplaintStats(complaintData);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/*Pass isStats prop to Navbar */}
      <Navbar isStats />

      <div className="pt-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6 text-center">
          📊 Admin Statistics
        </h2>

        {/* Reports and Complaints side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 📋 Reports Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4">
            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
              📋 Reports
            </h3>

            {reportStats ? (
              <>
                <p className="mb-1 text-gray-700 dark:text-gray-300">
                  <strong>Total:</strong> {reportStats.totalReports}
                </p>

                {/* Pie Chart */}
                <div className="h-36 sm:h-44">
                  <Pie
                    data={{
                      labels: ["Resolved ✅", "Pending 🟡"],
                      datasets: [
                        {
                          data: [
                            reportStats.resolvedReports,
                            reportStats.pendingReports,
                          ],
                          backgroundColor: ["#10b981", "#facc15"],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: "bottom" } },
                      maintainAspectRatio: false
                    }}
                  />
                </div>

                {/* Bar Chart */}
                <div className="h-36 sm:h-44 mt-3">
                  <Bar
                    data={{
                      labels: reportStats.weekLabels,
                      datasets: [
                        {
                          label: "Reports per Week",
                          data: reportStats.weeklyCounts,
                          backgroundColor: "#6366f1",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: false } },
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Loading report stats...</p>
            )}
          </div>

          {/* 🗣️ Complaints Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
              🗣️ Complaints
            </h3>

            {complaintStats ? (
              <>
                <p className="mb-1 text-gray-700 dark:text-gray-300">
                  <strong>Total:</strong> {complaintStats.totalComplaints}
                </p>

                {/* Pie Chart */}
                <div className="h-36 sm:h-44">
                  <Pie
                    data={{
                      labels: ["Resolved ✅", "Pending 🟡"],
                      datasets: [
                        {
                          data: [
                            complaintStats.resolvedComplaints,
                            complaintStats.pendingComplaints,
                          ],
                          backgroundColor: ["#10b981", "#facc15"],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: "bottom" } },
                      maintainAspectRatio: false
                    }}
                  />
                </div>

                {/* Bar Chart */}
                <div className="h-36 sm:h-44 mt-3">
                  <Bar
                    data={{
                      labels: complaintStats.weekLabels,
                      datasets: [
                        {
                          label: "Complaints per Week",
                          data: complaintStats.weeklyCounts,
                          backgroundColor: "#f97316",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: false } },
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Loading complaint stats...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
