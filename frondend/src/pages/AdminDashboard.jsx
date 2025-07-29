import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [records, setRecords] = useState([]);

  const token = localStorage.getItem('token');

  const fetchRecords = async () => {
    const res = await axios.get('http://localhost:5000/api/attendance/logsAll', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRecords(res.data);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <button onClick={logout} className="bg-gray-800 text-white px-4 py-2 rounded mb-4">Logout</button>
      <ul className="space-y-2">
        {records.map((r, i) => (
          <li key={i} className="p-2 border rounded">
            {r.username} - {r.status.toUpperCase()} at {new Date(r.time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
