/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import MasterUnitServices from "../services/MasterUnitServices";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Swal from "sweetalert2";

const MasterUnit = () => {
  const [units, setUnits] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    pic: "",
    no_telepon_pic: "",
    email_pic: "",
  });
  const [modalAddUnit, setModalAddUnit] = useState(false);
  const [modalUpdateUnit, setModalUpdateUnit] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState({});
  const [sendData, setSendData] = useState(false);

  console.log(selectedUnit);

  useEffect(() => {
    fetchUnits();
  }, [page, perPage, sort, order, search]);

  const fetchUnits = async () => {
    const response = await MasterUnitServices.getAllUnits({
      page,
      perPage,
      sort,
      order,
      search,
    });
    setUnits(response.data.units);
    setTotalPages(response.data.pagination.lastPage);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleInputUpdate = (e) => {
    const { name, value } = e.target;
    setSelectedUnit((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleModalUpdateUnit = async (id) => {
    try {
      const selected = units.find((item) => item.id === id);
      setSelectedUnit(selected);
      setModalUpdateUnit(true);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleAddUnit = async () => {
    setSendData(true);
    try {
      await MasterUnitServices.addUnit(formData);
      fetchUnits();
      setFormData({
        nama: "",
        deskripsi: "",
        pic: "",
        no_telepon_pic: "",
        email_pic: "",
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Unit added successfully!",
      });
      setModalAddUnit(false);
      setSendData(false);
    } catch (error) {
      console.error("Error adding unit:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add unit.",
      });
      setSendData(false);
    }
  };

  const handleUpdateUnit = async () => {
    setSendData(true);
    try {
      await MasterUnitServices.updateUnit(selectedUnit);
      fetchUnits();
      setSelectedUnit({
        nama: "",
        deskripsi: "",
        pic: "",
        no_telepon_pic: "",
        email_pic: "",
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Unit updated successfully!",
      });
      setModalUpdateUnit(false);
      setSendData(false);
    } catch (error) {
      console.error("Error updating unit:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update unit.",
      });
      setSendData(false);
    }
  };

  const handleDeleteUnit = async (id) => {
    setSendData(true);
    try {
      await MasterUnitServices.deleteUnit({ id: id });
      fetchUnits();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Unit deleted successfully!",
      });
      setSendData(false);
    } catch (error) {
      console.error("Error deleting unit:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete unit.",
      });
      setSendData(false);
    }
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">Master Unit</h2>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-[#1e293b] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
          onClick={() => setModalAddUnit(true)}
        >
          {/* {sendApproved ? "Loading..." : "Setujui Permohonan"} */} Tambahkan
          Unit
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border border-gray-300">Nama Unit</th>
              <th className="px-6 py-3 border border-gray-300">Deskripsi</th>
              <th className="px-6 py-3 border border-gray-300">PIC</th>
              <th className="px-6 py-3 border border-gray-300">
                No Telepon PIC
              </th>
              <th className="px-6 py-3 border border-gray-300">Email PIC</th>
              <th className="px-6 py-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.id}>
                <td className="px-3 py-3 border border-gray-300">
                  {unit.nama}
                </td>
                <td className="px-3 py-3 border border-gray-300">
                  {unit.deskripsi}
                </td>
                <td className="px-3 py-3 border border-gray-300">{unit.pic}</td>
                <td className="px-3 py-3 border border-gray-300">
                  {unit.no_telepon_pic}
                </td>
                <td className="px-3 py-3 border border-gray-300">
                  {unit.email_pic}
                </td>
                <td className="px-3 py-3 border border-gray-300">
                  <div className="flex gap3">
                    <button
                      onClick={() => handleModalUpdateUnit(unit.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteUnit(unit.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      {sendData ? "Loading..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-5">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <GrFormPrevious className="text-3xl bg-slate-400  rounded-md text-white" />
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          <GrFormNext className="text-3xl bg-slate-400  rounded-md text-white" />
        </button>
      </div>

      {modalAddUnit && (
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
                          className="text-xl font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Add Unit
                        </h3>
                        <div className="mt-2">
                          <div className="mt-4 max-w-full space-y-2">
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nama Unit
                              </label>
                              <input
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                type="text"
                                name="nama"
                                placeholder="Nama"
                                value={formData.nama || selectedUnit.nama}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Deskripsi Unit
                              </label>
                              <input
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                type="text"
                                name="deskripsi"
                                placeholder="Deskripsi"
                                value={formData.deskripsi}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nama PIC
                              </label>
                              <input
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                type="text"
                                name="pic"
                                placeholder="PIC"
                                value={formData.pic}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                No Telepon PIC
                              </label>
                              <input
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                type="number"
                                name="no_telepon_pic"
                                placeholder="No Telepon PIC"
                                value={formData.no_telepon_pic}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email PIC
                              </label>
                              <input
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                type="email"
                                name="email_pic"
                                placeholder="Email PIC"
                                value={formData.email_pic}
                                onChange={handleInputChange}
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
                      onClick={handleAddUnit}
                    >
                      {sendData ? "Loading..." : "Tambahkan Unit"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setModalAddUnit(false);
                        setFormData({
                          nama: "",
                          deskripsi: "",
                          pic: "",
                          no_telepon_pic: "",
                          email_pic: "",
                        });
                      }}
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

      {modalUpdateUnit && (
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
                          className="text-xl font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Update Unit
                        </h3>
                        <div className="mt-2">
                          <div className="mt-4 max-w-full space-y-2">
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nama Unit
                              </label>
                              <input
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                type="text"
                                name="nama"
                                placeholder="Nama"
                                value={selectedUnit.nama}
                                onChange={handleInputUpdate}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Deskripsi Unit
                              </label>
                              <input
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                type="text"
                                name="deskripsi"
                                placeholder="Deskripsi"
                                value={selectedUnit.deskripsi}
                                onChange={handleInputUpdate}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nama PIC
                              </label>
                              <input
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                type="text"
                                name="pic"
                                placeholder="PIC"
                                value={selectedUnit.pic}
                                onChange={handleInputUpdate}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                No Telepon PIC
                              </label>
                              <input
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                type="number"
                                name="no_telepon_pic"
                                placeholder="No Telepon PIC"
                                value={selectedUnit.no_telepon_pic}
                                onChange={handleInputUpdate}
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email PIC
                              </label>
                              <input
                                className="mt-1 block w-full px-3 py-1 border text-gray-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                                type="email"
                                name="email_pic"
                                placeholder="Email PIC"
                                value={selectedUnit.email_pic}
                                onChange={handleInputUpdate}
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
                      onClick={handleUpdateUnit}
                    >
                      {sendData ? "Loading..." : " Ubah Unit"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setModalUpdateUnit(false);
                        setSelectedUnit({
                          nama: "",
                          deskripsi: "",
                          pic: "",
                          no_telepon_pic: "",
                          email_pic: "",
                        });
                      }}
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
    </div>
  );
};

export default MasterUnit;
