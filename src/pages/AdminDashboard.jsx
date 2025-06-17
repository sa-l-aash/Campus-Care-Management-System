import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("/api/reports").then(res => res.json()).then(setReports);
    fetch("/api/complaints").then(res => res.json()).then(setComplaints);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <Navbar isAdmin />

      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-800 mb-10 text-center">Admin Dashboard</h2>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-purple-700 mb-6">Reported Issues</h3>
          {reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report, index) => (
                <div key={index} className="border border-purple-200 p-5 rounded-xl bg-white shadow-md">
                  <p className="text-gray-800"><strong>Description:</strong> {report.description}</p>
                  {report.imageURL && (
                    <img
                      src={report.imageURL}
                      alt="Reported Issue"
                      className="mt-4 max-h-48 w-full object-cover rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reports available.</p>
          )}
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-purple-700 mb-6">Complaints</h3>
          {complaints.length > 0 ? (
            <ul className="space-y-4">
              {complaints.map((complaint, index) => (
                <li key={index} className="border border-purple-200 p-5 rounded-xl bg-white shadow-md">
                  <p className="text-gray-800">{complaint.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No complaints available.</p>
          )}
        </section>
      </div>
    </div>
  );
}
