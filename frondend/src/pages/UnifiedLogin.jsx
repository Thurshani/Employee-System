import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import gymImage from '../assets/gym.png';

const UnifiedLogin = () => {
  const [activeRole, setActiveRole] = useState('employee');
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/employee/signin', {
        email: form.email,
        password: form.password,
      });

      const { token, role } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      navigate(role === 'admin' ? '/admin' : '/employee');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employee/register', {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      alert('Registered successfully!');
      setIsRegister(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

 return (
  <div
    className="min-h-screen bg-cover bg-center relative flex"
    style={{ backgroundImage: `url(${gymImage})` }}
  >
    {/* Overlay */}
   <div className="absolute inset-0 bg-gradient-to-tr from-amber-900 via-transparent to-amber-700 bg-opacity-80 z-0"></div>


    {/* Left Content - Heading and Description */}
    <div className="w-1/2 flex flex-col justify-center pl-16 pr-8 text-white relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg text-white">

  Employee Management System
</h1>

     <p className="text-lg md:text-xl max-w-md drop-shadow-md italic font-[cursive]">
  Efficiently track employee attendance, manage records, and simplify your workflow with our secure portal.
</p>

    </div>

    {/* Right Content - Login/Register Box */}
    <div className="w-1/2 flex items-center justify-end pr-16 relative z-10">
      <div className="bg-white bg-opacity-95 p-8 rounded-lg shadow-lg w-[30rem] shadow-lg w-96">
        {/* Role Tabs */}
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 font-semibold rounded-t-md ${
              activeRole === 'employee' ? 'bg-gray-200' : ''
            }`}
            onClick={() => {
              setActiveRole('employee');
              setIsRegister(false);
            }}
          >
            Employee
          </button>
          <button
            className={`w-1/2 py-2 font-semibold rounded-t-md ${
              activeRole === 'admin' ? 'bg-gray-200' : ''
            }`}
            onClick={() => {
              setActiveRole('admin');
              setIsRegister(false);
            }}
          >
            Admin
          </button>
        </div>

        {/* Forms */}
        {activeRole === 'admin' || !isRegister ? (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {activeRole === 'admin' ? 'Admin' : 'Employee'} Login
            </h2>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-2 border rounded"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
               className="w-full bg-amber-700 text-white py-2 rounded hover:bg-amber-800"
            >
              Login
            </button>
            {activeRole === 'employee' && (
              <p className="mt-4 text-center text-sm">
                Don't have an account?{' '}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setIsRegister(true)}
                >
                  Register now
                </span>
              </p>
            )}
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h2 className="text-2xl font-bold mb-4 text-center">Employee Registration</h2>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="w-full mb-4 px-4 py-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-2 border rounded"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Register
            </button>
            <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsRegister(false)}
              >
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  </div>
);

};

export default UnifiedLogin;
