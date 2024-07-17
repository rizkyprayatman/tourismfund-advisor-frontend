/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-screen text-white">
      <div className="p-4">
        <h1 className="text-black font-bold">Menu</h1>
      </div>
      <nav className="space-y-2 px-2">
        <Link
          to="/dashboard/permohonan"
          className={`block py-2.5 px-4 text-white rounded ${
            location.pathname === "/dashboard/permohonan"
              ? "bg-[#f3c560] text-black font-bold"
              : "bg-[#1e293b]"
          } hover:bg-gray-700 hover:text-white`}
        >
          Permohonan
        </Link>
        <Link
          to="/dashboard/master-unit"
          className={`block py-2.5 px-4 text-white rounded ${
            location.pathname === "/dashboard/master-unit"
              ? "bg-[#f3c560] text-black font-bold"
              : "bg-[#1e293b]"
          } hover:bg-gray-700 hover:text-white`}
        >
          Master Unit
        </Link>
      </nav>
      <div className="mt-10 px-2">
        <button
          className="block py-2.5 px-4 bg-[#1e293b] text-white rounded w-full hover:bg-gray-700 hover:text-white"
          onClick={handleLogout}
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
