import React from 'react';
import SideBarCustomer from "../components/SideBarCustomer.jsx";
import NavbarBarber from '../components/NavbarBarber.jsx';

export const ProfilePage = ({page: Page}) => {
    return (
        <>
            <NavbarBarber/>
        
            <main className="max-w-screen-lg mx-auto pt-8 flex ">
                <div className="w-80">
                    <SideBarCustomer/>
                </div>
                <div className="flex-1">
                    <Page/>
                </div>
            </main>
        </>
    );
};