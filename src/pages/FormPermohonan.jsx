/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import FormPermohonanUser from "../components/FormPermohonanUser";
import Footer from "../components/Footer";

export const FormPermohonanContext = React.createContext();

export default function FormPermohonan() {
  const navigate = useNavigate();

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState({});

  return (
    <>
      <FormPermohonanContext.Provider
        value={{
          isFocused,
          setIsFocused,
          inputValue,
          setInputValue,
        }}
      >
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar type="form-permohonan" />
          <FormPermohonanUser />
          <Footer />
        </div>
      </FormPermohonanContext.Provider>
    </>
  );
}
