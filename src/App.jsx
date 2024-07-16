import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import FormPermohonan from "./pages/FormPermohonan.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/form-permohonan",
        element: <FormPermohonan />,
      }
    ],
  },
]);

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
