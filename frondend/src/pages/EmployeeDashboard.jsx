import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [logs, setLogs] = useState([]);

  const token = localStorage.getItem('token');

  const fetchLogs = async () => {
    const res = await axios.get('http://localhost:5000/api/attendance/employeeLogs', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLogs(res.data);
  };

  const markAttendance = async (status) => {
    await axios.post(
      'http://localhost:5000/api/attendance/log',
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchLogs();
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Employee Dashboard</h2>
      <div className="space-x-2 mb-4">
        <button onClick={() => markAttendance('checkin')} className="bg-blue-600 text-white px-4 py-2 rounded">Check-In</button>
        <button onClick={() => markAttendance('checkout')} className="bg-red-600 text-white px-4 py-2 rounded">Check-Out</button>
        <button onClick={logout} className="bg-gray-800 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <ul className="space-y-2">
        {logs.map((log, idx) => (
          <li key={idx} className="p-2 border rounded">
            {log.status.toUpperCase()} at {new Date(log.time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDashboard;
