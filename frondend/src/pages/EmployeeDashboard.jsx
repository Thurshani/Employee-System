import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [username, setUsername] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/attendance/employeeLogs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markAttendance = async (status) => {
    try {
      await axios.post(
        'http://localhost:5000/api/attendance/log',
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchLogs();
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 px-20 py-8 m bg-gradient-to-br from-white via-cyan-50 to-cyan-100 ">
      {/* Logout */}
      <div className="flex justify-end mb-6">
        <button
          onClick={logout}
          className="bg-[#086375] hover:bg-[#064d5c] text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-10 gap-4">
        {/* Left: Username and Email in a box */}
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

        {/* Right: Welcome message + description */}
        <div className="w-full md:w-1/2 text-right">
          <h1 className="text-3xl font-bold text-[#086375]">Welcome, {username} 👋</h1>
          <p className="text-gray-600 mt-2">
            You can check in or out below and view your attendance history anytime.
          </p>
        </div>
      </div>

      {/* Attendance Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <button
          onClick={() => markAttendance('checkin')}
          className="w-full md:w-auto bg-[#086375] hover:bg-[#064d5c] text-white px-6 py-3 rounded-lg font-semibold"
        >
          ✅ Check-In
        </button>
        <button
          onClick={() => markAttendance('checkout')}
          className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          🚪 Check-Out
        </button>
      </div>

      {/* Attendance History Table */}
      <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-10">📋 Attendance History</h2>
      <div className="overflow-x-auto border border-blue-200 bg-blue-50 rounded-md p-1">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log, idx) => (
                <tr key={idx} className="border-t border-blue-100">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                        log.status.toLowerCase() === 'checkin'
                          ? 'bg-[#086375]'
                          : 'bg-red-400'
                      }`}
                    >
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(log.time).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(log.time).toLocaleTimeString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-4 py-6 text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
