import {Button, Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import React from "react";
import {CgProfile} from "react-icons/cg";
import {Link} from "react-router-dom";
import {IoLogOutOutline, IoNotificationsOutline, IoSettingsOutline} from "react-icons/io5";
import { useAuth } from "../../../context/AuthContext";

const SideBarCustomer = () => {

    const {currentUser, logout} = useAuth();

    return (
        <div className="h-full py-6 flex flex-col">
            <div className="pt-2">
                <Navbar>
                    <NavbarContent className="gap-2 flex-col items-start" justify="start">
                        <NavbarItem className="mb-12">
                            <Link color="foreground" to="/customer/">
                                <h1 className="font-bold text-xl">Profile Settings</h1>
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="w-full px-0">
                            <Button as={Link} to="/customer/profile/" aria-current="page"
                                    className="w-full text-start justify-start font-semibold" variant="light">
                                <CgProfile size={22} className="mr-2"/>
                                Profile
                            </Button>
                        </NavbarItem>
                        {/* <NavbarItem className="w-full px-0">
                            <Button as={Link} to="/customer/account/" aria-current="page"
                                    className="w-full text-start justify-start font-semibold" variant="light">
                                <IoSettingsOutline size={22} className="mr-2"/>
                                Account
                            </Button>
                        </NavbarItem>
                        <NavbarItem className="w-full px-0">
                            <Button as={Link} to="/customer/notification/" aria-current="page"
                                    className="w-full text-start justify-start font-semibold" variant="light">
                                <IoNotificationsOutline size={22} className="mr-2"/>
                                Notifications
                            </Button>
                        </NavbarItem> */}
                        <NavbarItem className="w-full px-0">
                            <Button onClick={logout} aria-current="page"
                                    className="w-full text-start justify-start font-semibold text-red-600"
                                    variant="light">
                                <IoLogOutOutline size={22} className="mr-2"/>
                                Log out
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            </div>
        </div>
    );
};

export default SideBarCustomer;