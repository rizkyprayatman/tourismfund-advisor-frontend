/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AuthServices from "../services/AuthServices";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false)
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoadingLogin(false)
      const data = {
        username: username,
        password: password,
      };

      const response = await AuthServices.login(data);

      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: "Redirecting to Dashboard...",
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          navigate("/dashboard/permohonan");
        },
      });
      setLoadingLogin(true)
    } catch (error) {
      console.error("Login Error:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid username or password. Please try again.",
      });
      setLoadingLogin(true)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar type="login-admin" />
        <div className="flex items-center justify-center my-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-6 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <HiEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-[#1e293b] text-white py-2 px-4 rounded transition duration-300 hover:bg-[#1e293b] focus:outline-none focus:ring focus:border-blue-300"
              >
                {loadingLogin ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
