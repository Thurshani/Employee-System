import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gymImage from "../assets/gym.png"; // ✅ correct


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/employee/signin', {
        email,
        password,
      });

      const { token, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      navigate(role === 'admin' ? '/admin' : '/employee');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${gymImage})` }}>
      <form onSubmit={handleLogin} className="bg-white bg-opacity-90 p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" placeholder="Email" className="w-full mb-4 px-4 py-2 border rounded"
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full mb-4 px-4 py-2 border rounded"
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-600">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
