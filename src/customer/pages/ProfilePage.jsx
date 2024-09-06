import React from 'react';
import NavbarBarber from '../components/NavbarBarber.jsx';
import { FooterPage } from './FooterPage.jsx';
import useDocumentTitle from '../../hooks/useDocumentTitle.jsx';
import SideBarCustomer from '../components/profile/SideBarCustomer.jsx';

export const ProfilePage = ({page: Page}) => {
    useDocumentTitle('Profile')
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

            <FooterPage />
        </>
    );
};