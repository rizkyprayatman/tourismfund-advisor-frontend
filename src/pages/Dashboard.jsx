/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-4 min-h-screen">
        <div className="col-span-1 bg-gray-200 p-4">
          <Sidebar />
        </div>
        <main className="col-span-3 p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
