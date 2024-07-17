/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PermohonanServices from "../services/PermohonanServices";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import Select from "react-select";
import Swal from 'sweetalert2';

const Permohonan = () => {
  const [permohonan, setPermohonan] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    sort: "createdAt",
    order: "desc",
    search: "",
    total: 0,
    lastPage: 1,
  });
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [unitKerjaList, setUnitKerjaList] = useState([]);

  const [selectedPermohonan, setSelectedPermohonan] = useState(null);
  const [dateValue, setDateValue] = useState("");

  const [unitKerjaSelected, setUnitKerjaSelected] = useState("");
  const [alasanValue, setAlasanValue] = useState("");
  const [sendApproved, setSendApproved] = useState(false);

  const [typeStatusChange, setTypeStatusChange] = useState(null);

  const fetchPermohonan = async () => {
    const response = await PermohonanServices.getAllPermohonan(pagination);
    setPermohonan(response.data.visits);
    setPagination((prev) => ({
      ...prev,
      total: response.data.pagination.total,
      lastPage: response.data.pagination.lastPage,
    }));
  };

  useEffect(() => {
    fetchPermohonan();

    const fetchUnitsKerja = async () => {
      try {
        const response = await PermohonanServices.getAllUnits();
        console.log("ini response", response);
        setUnitKerjaList(
          response.data.map((unit) => ({ value: unit.id, label: unit.nama }))
        ); // Sesuaikan sesuai struktur response API Anda
      } catch (error) {
        console.error("Error fetching jenis documents:", error);
      }
    };

    fetchUnitsKerja();
  }, [
    pagination.page,
    pagination.perPage,
    pagination.sort,
    pagination.order,
    pagination.search,
  ]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handlePerPageChange = (event) => {
    setPagination((prev) => ({
      ...prev,
      perPage: event.target.value,
      page: 1, // reset to first page
    }));
  };

  const handleSortChange = (sortField) => {
    setPagination((prev) => ({
      ...prev,
      sort: sortField,
      order: prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearchChange = (event) => {
    setPagination((prev) => ({
      ...prev,
      search: event.target.value,
      page: 1, // reset to first page
    }));
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(id === openDropdownId ? null : id);
  };

  const handleStatusChange = async (id, status) => {
    setSendApproved(true);
    if (status === "approved") {
      try {
        const response = await PermohonanServices.setujuiPermohonan({
          id: id,
          unitId: unitKerjaSelected,
          tanggal: dateValue,
        });

        console.log(response);
        fetchPermohonan();
        closeModalPermohonanBtn();
        setSendApproved(false);

        Swal.fire({
          title: "Success!",
          text: "Permohonan telah disetujui.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        setSendApproved(false);
        console.error("Failed to update status:", error);

        Swal.fire({
          title: "Error!",
          text: "Gagal memperbarui status.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else if (status === "rejected") {
      try {
        const response = await PermohonanServices.tolakPermohonan({
          id: id,
          alasan: alasanValue,
        });

        console.log(response);
        fetchPermohonan();
        closeModalPermohonanBtn();
        setSendApproved(false);

        Swal.fire({
          title: "Success!",
          text: "Permohonan telah ditolak.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        setSendApproved(false);
        console.error("Failed to update status:", error);

        Swal.fire({
          title: "Error!",
          text: "Gagal memperbarui status.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      try {
        const response = await PermohonanServices.selesaiPermohonan({
          id: id,
        });

        console.log(response);
        fetchPermohonan();
        closeModalPermohonanBtn();
        setSendApproved(false);

        Swal.fire({
          title: "Success!",
          text: "Permohonan telah selesai.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        setSendApproved(false);
        console.error("Failed to update status:", error);

        Swal.fire({
          title: "Error!",
          text: "Gagal memperbarui status.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleModalPermohonan = async (id, status) => {
    try {
      const selected = permohonan.find((item) => item.id === id);
      setSelectedPermohonan(selected);
      setDateValue("");
      setUnitKerjaSelected("");
      setTypeStatusChange(status);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const closeModalPermohonanBtn = () => {
    setSelectedPermohonan(null);
    setDateValue("");
    setUnitKerjaSelected("");
    setAlasanValue("");
  };

  function formatDateTime(dateString) {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const date = new Date(dateString);

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${dayName}, ${day} ${monthName} ${year} Pukul ${hours}.${minutes}`;
  }

  function formatDateTimeVisit(dateString) {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const date = new Date(dateString);

    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${monthName} ${year}`;
  }

  return (
    <>
      <div className="">
        <div className="">
          <h2 className="text-2xl font-semibold">Permohonan</h2>
        </div>
        <div className="flex justify-between items-center">
          <div className="py-2">
            <h3 className="font-semibold">List Permohonan</h3>
          </div>
          <div className="py-2">
            <input
              type="text"
              placeholder="Search"
              value={pagination.search}
              onChange={handleSearchChange}
              className="border px-2 py-1 rounded-md"
            />
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-300 border-collapse">
            <thead className="text-gray-700 uppercase bg-gray-50">
              <tr className="text-center border border-gray-300">
                <th scope="col" className="px-6 py-3 border border-gray-300">
                  No
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 border border-gray-300 cursor-pointer ${
                    pagination.sort === "no_kunjungan" ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleSortChange("no_kunjungan")}
                >
                  <div className="flex items-center gap-5 justify-center">
                    <p>No Kunjungan</p>
                    <FaArrowDownLong
                      className={`-me-5 ${
                        pagination.sort === "no_kunjungan"
                          ? pagination.order === "desc"
                            ? "text-blue-500"
                            : ""
                          : ""
                      }`}
                    />
                    <FaArrowUpLong
                      className={`${
                        pagination.sort === "no_kunjungan"
                          ? pagination.order === "asc"
                            ? "text-blue-500"
                            : ""
                          : ""
                      }`}
                    />
                  </div>
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 border border-gray-300 cursor-pointer ${
                    pagination.sort === "nama" ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleSortChange("nama")}
                >
                  <div className="flex items-center gap-5 justify-center">
                    <p>Nama</p>
                    <FaArrowDownLong
                      className={`-me-5 ${
                        pagination.sort === "nama"
                          ? pagination.order === "desc"
                            ? "text-blue-500"
                            : ""
                          : ""
                      }`}
                    />
                    <FaArrowUpLong
                      className={`${
                        pagination.sort === "nama"
                          ? pagination.order === "asc"
                            ? "text-blue-500"
                            : ""
                          : ""
                      }`}
                    />
                  </div>
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 border border-gray-300 cursor-pointer ${
                    pagination.sort === "email" ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleSortChange("email")}
                >
                  <div className="flex items-center gap-5 justify-center">
                    <p>Email</p>
                    <FaArrowDownLong
                      className={`-me-5 ${
                        pagination.sort === "email"
                          ? pagination.order === "desc"
                            ? "text-blue-500"
                            : ""
                          : ""
                      }`}
                    />
                    <FaArrowUpLong
                      className={`${
                        pagination.sort === "email"
                          ? pagination.order === "asc"
                            ? "text-blue-500"
                            : ""
                          : ""
                      }`}
                    />
                  </div>
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 border border-gray-300 cursor-pointer ${
                    pagination.sort === "nomor_telepon" ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleSortChange("nomor_telepon")}
                >
                  <div className="flex items-center gap-5 justify-center">
                    <p>Nomor Telepon</p>
                    <FaArrowDownLong
                      className={`-me-5 text-lg ${
                        pagination.sort === "nomor_telepon"
                          ? pagination.order === "desc"
                            ? "text-blue-500"
                            : ""
                          : ""
                      }`}
                    />
                    <FaArrowUpLong
                      className={`text-lg ${
                        pagination.sort === "nomor_telepon"
                          ? pagination.order === "asc"
                            ? "text-blue-500"
                            : ""
                          : ""
                      }`}
                    />
                  </div>
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 border border-gray-300 cursor-pointer ${
                    pagination.sort === "tanggal_berkunjung"
                      ? "bg-blue-100"
                      : ""
                  }`}
                  onClick={() => handleSortChange("tanggal_berkunjung")}
                >
                  <div className="flex items-center gap-5 justify-center">
                    <p>Tanggal BerKunjung</p>
                    <FaArrowDownLong
                      className={`-me-5 text-lg ${
                        pagination.sort === "tanggal_berkunjung"
                          ? pagination.order === "desc"
                            ? "text-blue-500"
                            : ""
                          : ""
                      }`}
                    />
                    <FaArrowUpLong
                      className={`text-lg ${
                        pagination.sort === "tanggal_berkunjung"
                          ? pagination.order === "asc"
                            ? "text-blue-500"
                            : ""
                          : ""
                      }`}
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 border border-gray-300">
                  Dokumen Permohonan
                </th>
                <th scope="col" className="px-6 py-3 border border-gray-300">
                  Unit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border border-gray-300 text-center"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border border-gray-300 text-center"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {permohonan.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="px-6 py-3 border border-gray-300">
                    {(pagination.page - 1) * pagination.perPage + index + 1}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {item.no_kunjungan}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {item.nama}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {item.email}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {item.nomor_telepon}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {item.status == "pending" ? (
                      <>{formatDateTimeVisit(item.tanggal_berkunjung)}</>
                    ) : (
                      <>{formatDateTime(item.tanggal_berkunjung)}</>
                    )}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500"
                    >
                      {`${item.no_kunjungan}.pdf`}
                    </a>
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    {item.unit == null ? (
                      <>
                        <span>-</span>
                      </>
                    ) : (
                      <>
                        <p>
                          {item.unit.nama} <br />
                          <span className="font-bold">
                            PIC : {item.unit.pic}
                          </span>
                        </p>
                      </>
                    )}
                  </td>
                  <td className="px-6 py-3 border border-gray-300">
                    <span
                      className={`px-3 py-2 rounded-md text-center capitalize ${
                        item.status === "pending"
                          ? "bg-orange-500 text-white"
                          : item.status === "approved"
                          ? "bg-green-500 text-white"
                          : item.status === "rejected"
                          ? "bg-red-500 text-white"
                          : item.status === "finish"
                          ? "bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 border border-gray-300 text-center">
                    {item.status != "rejected" && item.status != "finish" ? (
                      <>
                        <div className="relative inline-block text-left">
                          <button
                            className="flex items-center gap-1 px-4 py-2 rounded-md bg-gray-200 text-gray-700"
                            onClick={() => toggleDropdown(item.id)}
                          >
                            Ubah Status
                            <IoIosArrowDown
                              className={` text-2xl ${
                                openDropdownId === item.id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {openDropdownId === item.id && (
                            <div className="origin-top-right absolute z-50 top-5 right-8 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                {item.status == "pending" && (
                                  <>
                                    {" "}
                                    <button
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                      onClick={() => {
                                        handleModalPermohonan(
                                          item.id,
                                          "approved"
                                        );
                                        toggleDropdown(item.id);
                                      }}
                                    >
                                      Approved
                                    </button>
                                    <button
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                      onClick={() => {
                                        handleModalPermohonan(
                                          item.id,
                                          "rejected"
                                        );
                                        toggleDropdown(item.id);
                                      }}
                                    >
                                      Rejected
                                    </button>
                                  </>
                                )}

                                {item.status == "approved" && (
                                  <>
                                    <button
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                      onClick={() => {
                                        handleModalPermohonan(
                                          item.id,
                                          "finish"
                                        );
                                        toggleDropdown(item.id);
                                      }}
                                    >
                                      Finish
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-5">
            <button
              onClick={() => handlePageChange(Math.max(pagination.page - 1, 1))}
              disabled={pagination.page === 1}
            >
              <GrFormPrevious className="text-3xl bg-slate-400  rounded-md text-white" />
            </button>
            <button
              onClick={() =>
                handlePageChange(
                  Math.min(pagination.page + 1, pagination.lastPage)
                )
              }
              disabled={pagination.page === pagination.lastPage}
            >
              <GrFormNext className="text-3xl bg-slate-400  rounded-md text-white" />
            </button>
          </div>
          <div>
            <label htmlFor="perPage">Per Page:</label>
            <select
              id="perPage"
              value={pagination.perPage}
              onChange={handlePerPageChange}
              className="border p-2 ml-2"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>

      {selectedPermohonan && typeStatusChange == "approved" && (
        <>
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white pb-4 pt-5">
                    <div className="mx-5">
                      <div className="mt-3 text-start sm:mt-0 sm:text-left">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Setujui Permohonan
                        </h3>
                        <div className="mt-2">
                          <div className="w-full space-y-2">
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                No Permohonan
                              </label>
                              <input
                                type="text"
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                placeholder="Enter filename"
                                disabled
                                value={selectedPermohonan.no_kunjungan}
                                // onChange={(e) => setFilename(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nama
                              </label>
                              <input
                                type="text"
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                placeholder="Enter filename"
                                disabled
                                value={selectedPermohonan.nama}
                                // onChange={(e) => setFilename(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Unit Kerja
                              </label>
                              <Select
                                options={unitKerjaList}
                                value={unitKerjaList.find(
                                  (option) => option.value === unitKerjaSelected
                                )}
                                onChange={(selectedOption) =>
                                  setUnitKerjaSelected(selectedOption.value)
                                }
                                placeholder="Select Unit Kerja"
                                className="mt-1 block w-full rounded-md text-black shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                              />
                            </div>
                            <div>
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="tanggal_berkunjung"
                              >
                                Tetapkan Tanggal Berkunjung
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="tanggal_berkunjung"
                                type="datetime-local"
                                placeholder="tanggal berkunjung"
                                onChange={(e) => setDateValue(e.target.value)}
                                value={dateValue || ""}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 gap-4 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-[#1e293b] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                      onClick={() =>
                        handleStatusChange(selectedPermohonan.id, "approved")
                      }
                    >
                      {sendApproved ? "Loading..." : "Setujui Permohonan"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => closeModalPermohonanBtn()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedPermohonan && typeStatusChange == "rejected" && (
        <>
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white pb-4 pt-5">
                    <div className="mx-5">
                      <div className="mt-3 text-start sm:mt-0 sm:text-left">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Tolak Permohonan
                        </h3>
                        <div className="mt-2">
                          <div className="w-full space-y-2">
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                No Permohonan
                              </label>
                              <input
                                type="text"
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                placeholder="Enter filename"
                                disabled
                                value={selectedPermohonan.no_kunjungan}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nama
                              </label>
                              <input
                                type="text"
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                placeholder="Enter filename"
                                disabled
                                value={selectedPermohonan.nama}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Alasan Penolakan
                              </label>
                              <textarea
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                placeholder="Enter alasan penolakan"
                                onChange={(e) => setAlasanValue(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 gap-4 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-[#1e293b] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                      onClick={() =>
                        handleStatusChange(selectedPermohonan.id, "rejected")
                      }
                    >
                      {sendApproved ? "Loading..." : "Tolak Permohonan"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => closeModalPermohonanBtn()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedPermohonan && typeStatusChange == "finish" && (
        <>
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white pb-4 pt-5">
                    <div className="mx-5">
                      <div className="mt-3 text-start sm:mt-0 sm:text-left">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Selesaikan Pelayanan Konsultasi DAK
                        </h3>
                        <div className="mt-2">
                          <div className="w-full space-y-2">
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                No Permohonan
                              </label>
                              <input
                                type="text"
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                placeholder="Enter filename"
                                disabled
                                value={selectedPermohonan.no_kunjungan}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nama
                              </label>
                              <input
                                type="text"
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                placeholder="Enter filename"
                                disabled
                                value={selectedPermohonan.nama}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 gap-4 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-[#1e293b] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                      onClick={() =>
                        handleStatusChange(selectedPermohonan.id, "finish")
                      }
                    >
                      {sendApproved ? "Loading..." : "Selesai"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => closeModalPermohonanBtn()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Permohonan;
