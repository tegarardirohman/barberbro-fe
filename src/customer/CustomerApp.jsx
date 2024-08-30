import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RegisterBarber from "../barber/pages/RegisterBarber";
import NotFound from "./pages/NotFound.jsx";

function CustomerApp() {
    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/register-barber" element={<RegisterBarber/>}/>
        </Routes>
    );
}

export default CustomerApp;
