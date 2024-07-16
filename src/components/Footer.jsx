/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#1e293b] py-4">
      <p className="text-center text-white">
        © 2024 Kementerian Pariwisata dan Ekonomi Kreatif
      </p>
    </footer>
  );
};

export default Footer;
