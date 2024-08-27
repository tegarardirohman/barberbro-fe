import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RegisterBarber from "../barber/pages/RegisterBarber";

function CustomerApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/register-barber" element={<RegisterBarber />} />
    </Routes>
  );
}

export default CustomerApp;
