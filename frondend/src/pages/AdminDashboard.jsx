import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminDashboard = () => {
  const [records, setRecords] = useState([]);
  const token = localStorage.getItem('token');

  const username = 'Admin'; // Replace with dynamic username if needed

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/attendance/logsAll', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const totalEmployees = new Set(records.map((r) => r.username)).size;

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Attendance Report', 14, 22);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    const tableColumn = ['#', 'Username', 'Status', 'Date', 'Time'];
    const tableRows = [];

    records.forEach((record, index) => {
      const timestamp = new Date(record.time);
      const row = [
        index + 1,
        record.username,
        record.status.toUpperCase(),
        timestamp.toLocaleDateString(),
        timestamp.toLocaleTimeString(),
      ];
      tableRows.push(row);
    });

    doc.autoTable({
      startY: 40,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('attendance_report.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-cyan-100 py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Logout Button - Top Right */}
        <div className="flex justify-end mb-6">
          <button
            onClick={logout}
            className="bg-[#086375] hover:bg-[#064d5c] text-white px-5 py-2 rounded-lg text-sm font-semibold shadow"
          >
            Logout
          </button>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-10 gap-4">
          {/* Left: Admin Info */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-full md:w-1/2 text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                alt="User icon"
                className="w-12 h-12"
              />
            </div>
            <p className="text-[#086375] text-lg font-medium">{username}</p>
            <p className="text-gray-600 text-sm mt-1">{`${username.toLowerCase()}@example.com`}</p>
          </div>

          {/* Right: Welcome */}
          <div className="w-full md:w-1/2 text-right">
            <h1 className="text-3xl font-bold text-[#086375]">Welcome, {username} 👋</h1>
            <p className="text-gray-600 mt-2">
              You can view attendance records and manage employee reports from here.
            </p>
          </div>
        </div>

        {/* Top Row: Total Employees + Report Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-6">
          {/* Total Employees Box */}
          <div className="bg-white border border-blue-300 rounded-full px-6 py-4 shadow-lg text-[#086375] font-semibold text-2xl text-center w-full sm:w-[300px]">
            Total Employees : {totalEmployees}
          </div>

          {/* Generate Report Button */}
          <button
            onClick={generateReport}
            className="bg-[#086375] hover:bg-[#064d5c] text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition w-full sm:w-auto"
          >
            Generate Report
          </button>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto flex justify-center">
          <table className="w-full text-sm text-left text-gray-700 border border-blue-200">
            <thead className="bg-blue-50 border-b border-blue-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">#</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Username</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    No records found
                  </td>
                </tr>
              ) : (
                records.map((r, i) => {
                  const timestamp = new Date(r.time);
                  return (
                    <tr key={i} className="border-b border-blue-100 hover:bg-blue-50">
                      <td className="px-4 py-3">{i + 1}</td>
                      <td className="px-4 py-3">{r.username}</td>
                      <td
                        className={`px-4 py-3 font-semibold ${
                          r.status === 'check-in' ? 'text-green-600' : 'text-red-500'
                        }`}
                      >
                        {r.status.toUpperCase()}
                      </td>
                      <td className="px-4 py-3">{timestamp.toLocaleDateString()}</td>
                      <td className="px-4 py-3">{timestamp.toLocaleTimeString()}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
