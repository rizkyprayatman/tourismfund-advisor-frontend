/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ type }) => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#1e293b] py-4">
      {type == "homepage" ? (
        <>
          <div className="flex  justify-center">
            <img
              src="/logo/logo.png"
              alt="Select File Icon"
              className="mr-2 max-h-28"
            />
          </div>
          <h1 className="text-center text-3xl text-white">
            Kementerian Pariwisata Indonesia dan Ekonomi Kreatif
          </h1>
          <h2 className="text-center text-xl text-white">
            Pelayanan Konsultasi Dana Alokasi Khusus (DAK)
          </h2>
        </>
      ) : (
        <>
          <div className="flex justify-start mx-5">
            <img
              src="/logo/kemenparekraf-logo.png"
              alt="Select File Icon"
              className="mr-2 max-h-16"
            />
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
