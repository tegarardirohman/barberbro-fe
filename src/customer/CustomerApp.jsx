import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RegisterBarber from "../barber/pages/RegisterBarber";
import NotFound from "./pages/NotFound.jsx";
import {ProfilePage} from "./pages/ProfilePage.jsx";
import ProfileSection from "./components/ProfileSection.jsx";
import AccountSection from "./components/AccountSection.jsx";
import NotificationSection from "./components/NotificationSection.jsx";
import BarbershopProfilePage from "./pages/BarbershopProfilePage.jsx";

function CustomerApp() {
    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/barber-detail" element={<BarbershopProfilePage />}/>
            <Route path="/register-barber" element={<RegisterBarber/>}/>
            <Route path="/customer" element={<ProfilePage/>}/>
            <Route path="/customer/profile" element={<ProfilePage page={ProfileSection}/>}/>
            <Route path="/customer/notification" element={<ProfilePage page={NotificationSection}/>}/>
            <Route path="/customer/account" element={<ProfilePage page={AccountSection}/>}/>
            <Route path="/barbershop" element={<BarbershopProfilePage/>}/>
        </Routes>
    );
}

export default CustomerApp;