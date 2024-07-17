import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import FormPermohonan from "./pages/FormPermohonan.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Permohonan from "./components/Permohonan.jsx";
import MasterUnit from "./components/MasterUnit.jsx";

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
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "permohonan",
            element: <Permohonan />,
          },
          {
            path: "master-unit",
            element: <MasterUnit />,
          },
        ],
      },
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
