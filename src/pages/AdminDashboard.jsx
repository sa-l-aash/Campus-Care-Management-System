import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch data from your backend APIs
    fetch("/api/reports").then(res => res.json()).then(setReports);
    fetch("/api/complaints").then(res => res.json()).then(setComplaints);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Reported Issues</h3>
        {reports.map((report, index) => (
          <div key={index} className="border p-4 mb-2 rounded bg-white">
            <p><strong>Description:</strong> {report.description}</p>
            <img src={report.imageURL} alt="Report" className="mt-2 max-w-xs" />
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Complaints</h3>
        {complaints.map((complaint, index) => (
          <div key={index} className="border p-4 mb-2 rounded bg-white">
            <p>{complaint.message}</p>
          </div>
        ))}
      </section>
    </div>
  );
}