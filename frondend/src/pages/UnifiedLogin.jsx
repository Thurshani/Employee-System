import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/image1.avif"; // Make sure this path is correct

const mainColor = "#086375"; // Main color

const UnifiedLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("employee"); // Role toggle state
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/employee/signin",
        {
          email: form.email,
          password: form.password,
        }
      );
      const { token, role, username } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);
      navigate(role === "admin" ? "/admin" : "/employee");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employee/register", {
        username: form.username,
        email: form.email,
        password: form.password,
        role,
      });
      alert("Registered successfully!");
      setIsRegister(false);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: mainColor }}
    >
      <div className="flex w-[90%] max-w-5xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            {isRegister ? "Create an Account" : "Welcome Back"}
          </h2>

          {/* Role Toggle */}
          <div className="w-full flex mb-4">
            <button
              onClick={() => setRole("employee")}
              className={`w-1/2 py-3 font-semibold text-center border border-b-0 transition ${
                role === "employee"
                  ? "bg-[#086375] text-white border-[#086375]"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              Employee
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`w-1/2 py-3 font-semibold text-center border border-b-0 transition ${
                role === "admin"
                  ? "bg-[#086375] text-white border-[#086375]"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={isRegister ? handleRegister : handleLogin}>
            {isRegister && (
              <input
                name="username"
                type="text"
                placeholder="Full Name"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                onChange={handleChange}
                required
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full py-2 mt-2 rounded text-white font-semibold transition"
              style={{ backgroundColor: mainColor }}
            >
              {isRegister ? "Submit" : "Login"}
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-teal-600 font-semibold cursor-pointer"
                    onClick={() => setIsRegister(false)}
                  >
                    Sign in
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span
                    className="text-teal-600 font-semibold cursor-pointer"
                    onClick={() => setIsRegister(true)}
                  >
                    Register
                  </span>
                </>
              )}
            </p>
          </form>
        </div>

        {/* Right - Image with overlay and text */}
       <div className="hidden md:block w-1/2 relative">
  <img
    src={loginImage}
    alt="Login"
    className="w-full h-full object-cover"
  />
  <div
    className="absolute top-0 left-0 w-full h-full text-white text-left px-8 pb-10 flex items-center"
    style={{ backgroundColor: "rgba(8, 99, 117, 0.6)" }}
  >
    <div>
      <h2 className="text-4xl font-bold mb-2">Employee Management System</h2>
      <p className="text-lg italic">
        A powerful solution for managing employee records, roles, and attendance with ease.
      </p>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default UnifiedLogin;
