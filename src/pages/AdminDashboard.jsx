import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch data from your backend APIs
    fetch("/api/reports").then(res => res.json()).then(setReports);
    fetch("/api/complaints").then(res => res.json()).then(setComplaints);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAdmin />

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Reported Issues</h3>
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <div key={index} className="border p-4 mb-4 rounded bg-white shadow">
                <p><strong>Description:</strong> {report.description}</p>
                {report.imageURL && (
                  <img
                    src={report.imageURL}
                    alt="Reported Issue"
                    className="mt-2 max-w-xs rounded"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reports available.</p>
          )}
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">Complaints</h3>
          {complaints.length > 0 ? (
            complaints.map((complaint, index) => (
              <div key={index} className="border p-4 mb-4 rounded bg-white shadow">
                <p>{complaint.message}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No complaints available.</p>
          )}
        </section>
      </div>
    </div>
  );
}