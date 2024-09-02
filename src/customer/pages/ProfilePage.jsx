import React from 'react';
import SideBarCustomer from "../components/SideBarCustomer.jsx";

export const ProfilePage = ({page: Page}) => {
    return (
        <main className="w-[1000px] min-h-screen border-2 mx-auto">
            <div className="fixed w-80 h-screen">
                <SideBarCustomer/>
            </div>
            <div className="flex-1 ml-80">
                <Page/>
            </div>
        </main>
    );
};