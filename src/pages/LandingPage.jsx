/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Navbar type="homepage"/>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h3 className="text-2xl font-semibold mb-4">
            Layanan Konsultasi DAK
          </h3>
          <p className="text-gray-700 mb-6">
            Kami menyediakan layanan konsultasi untuk Dana Alokasi Khusus (DAK)
            bagi seluruh daerah di Indonesia. Layanan ini bertujuan untuk
            memberikan informasi, panduan, dan bantuan teknis terkait DAK di
            bidang pariwisata dan ekonomi kreatif.
          </p>
          <button
            onClick={() => navigate("/form-permohonan")}
            className="bg-[#1e293b] text-white py-2 px-4 rounded transition"
          >
            Ajukan Permohonan
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
