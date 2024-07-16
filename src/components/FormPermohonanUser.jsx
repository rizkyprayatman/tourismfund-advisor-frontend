/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { HiDocumentAdd, HiDocumentText } from "react-icons/hi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FormPermohonanContext } from "../pages/FormPermohonan";
import FormPermohonanService from "../services/FormPermohonanService";

export default function FormPermohonanUser() {
  const navigate = useNavigate();
  const { inputValue, setInputValue } = useContext(FormPermohonanContext);
  const [files, setFiles] = useState([]);
  const [sendData, setSendData] = useState(false);

  const handleBackBtn = () => {
    setInputValue({});
    navigate("/");
  };

  const handleChange = (e, field) => {
    setInputValue((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async () => {
    try {
      setSendData(true);
      const formData = new FormData();
      Object.keys(inputValue).forEach((key) => {
        formData.append(key, inputValue[key]);
      });

      formData.append(`file`, files[0]);

      const response = await FormPermohonanService.sendFormPermohonan(formData);
      console.log("Success:", response.data);

      Swal.fire({
        icon: "success",
        title: "Pengajuan Berhasil",
        text: "Konfirmasi akan dikirimkan melalui email.",
      });

      setInputValue({}); 
      setFiles([]);

      setSendData(false);
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat mengirimkan formulir. Silakan coba lagi nanti.",
      });
      setSendData(false);
    }
  };

  return (
    <>
      <div className="mt-5">
        <div className="relative mx-5 xl:mx-60 mb-4">
          <h1 className="text-center font-bold text-md xl:text-2xl">
            Form Permohonan <br /> Layanan Konsultasi DAK
          </h1>
        </div>
        <div className="space-y-4">
          <div className="relative mx-5 xl:mx-60">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nama"
            >
              Nama
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nama"
              type="text"
              placeholder="nama"
              onChange={(e) => handleChange(e, "nama")}
              value={inputValue.nama || ""}
            />
          </div>
          <div className="relative mx-5 xl:mx-60">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
              onChange={(e) => handleChange(e, "email")}
              value={inputValue.email || ""}
            />
          </div>
          <div className="relative mx-5 xl:mx-60">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nomor_telepon"
            >
              Nomor Telepon
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nomor_telepon"
              type="number"
              placeholder="nomor telepon"
              onChange={(e) => handleChange(e, "nomor_telepon")}
              value={inputValue.nomor_telepon || ""}
            />
          </div>
          <div className="relative mx-5 xl:mx-60">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tanggal_berkunjung"
            >
              Tanggal Berkunjung
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tanggal_berkunjung"
              type="date"
              placeholder="tanggal berkunjung"
              onChange={(e) => handleChange(e, "tanggal_berkunjung")}
              value={inputValue.tanggal_berkunjung || ""}
            />
          </div>
          <div className="relative mx-5 xl:mx-60">
            <input
              className="hidden"
              id="file"
              type="file"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file"
              className="block w-full px-4 py-8 mb-4 border border-dashed border-blue-900 rounded-md cursor-pointer text-gray-400 text-center"
            >
              {files.length !== 0 ? (
                <>
                  <div className="flex justify-center items-center">
                    <HiDocumentText className="text-2xl" />
                  </div>
                  <p>{files[0].name}</p>
                </>
              ) : (
                <>
                  <div className="flex justify-center items-center">
                    <HiDocumentAdd className="text-2xl" />
                  </div>
                  <p>Upload Surat Permohonan</p>
                </>
              )}
            </label>
          </div>
        </div>
      </div>

      <div className="my-8 mx-5 xl:mx-60 space-y-4">
        <div className="flex justify-center gap-5">
          <div>
            <button
              className="bg-[#E5E7EB] hover:bg-[#1e293b] hover:text-white rounded-lg p-2 px-5 text-[#9CA3AF] w-full text-lg font-bold"
              onClick={handleBackBtn}
            >
              Kembali
            </button>
          </div>
          <div>
            <button
              type="button"
              className={`rounded-lg p-2 px-5 text-white w-full text-lg font-bold ${
                files.length === 0 ? "bg-gray-400" : "bg-[#1e293b]"
              }`}
              onClick={() => handleSubmit()}
              disabled={files.length === 0}
            >
              {sendData ? "Loading..." : "Ajukan Permohonan"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
