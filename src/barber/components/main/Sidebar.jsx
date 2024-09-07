import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { GrGallery, GrTransaction } from "react-icons/gr";
import { PiHandWithdraw } from "react-icons/pi";
import { TbClockHour10 } from "react-icons/tb";
import { AiOutlineDashboard } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { useAuth } from "../../../context/AuthContext";

const Sidebar = () => {
  const { userDetail } = useAuth();
  const location = useLocation(); // Get current route location

  // Function to check if the current route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen py-6 bg-white shadow-md w-full relative flex flex-col">
      {/* navbar */}
      <div className="w-full bg-slate-50 pt-2">
        <Navbar>
          <NavbarContent className="gap-2 flex-col items-start" justify="start">
            <NavbarItem className="mb-12">
              <Link color="foreground" to="/staff/">
                <h1 className="font-bold text-xl">{userDetail?.name}</h1>
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link color="foreground">Overview</Link>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button
                as={Link}
                to="/staff/"
                aria-current="page"
                className={`w-full text-start justify-start font-semibold ${
                  isActive("/staff/") ? "bg-slate-900 text-slate-100" : "bg-white"
                }`}
                variant="light"
              >
                <AiOutlineDashboard size={22} className="mr-2" />
                Dashboard
              </Button>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button
                as={Link}
                to="/staff/transaction/"
                aria-current="page"
                className={`w-full text-start justify-start font-semibold ${
                  isActive("/staff/transaction/") ? "bg-slate-900 text-slate-100" : "bg-white"
                }`}
                variant="light"
              >
                <GrTransaction size={22} className="mr-2" />
                Transaction
              </Button>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button
                as={Link}
                to="/staff/withdraw/"
                aria-current="page"
                className={`w-full text-start justify-start font-semibold ${
                  isActive("/staff/withdraw/") ? "bg-slate-900 text-slate-100" : "bg-white"
                }`}
                variant="light"
              >
                <PiHandWithdraw size={22} className="mr-2" />
                Withdraw
              </Button>
            </NavbarItem>

            <NavbarItem className="mt-8">
              <Link color="foreground">Master Data</Link>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button
                as={Link}
                to="/staff/profile/"
                aria-current="page"
                className={`w-full text-start justify-start font-semibold ${
                  isActive("/staff/profile/") ? "bg-slate-900 text-slate-100" : "bg-white"
                }`}
                variant="light"
              >
                <CgProfile size={22} className="mr-2" />
                Profile
              </Button>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button
                as={Link}
                to="/staff/gallery/"
                aria-current="page"
                className={`w-full text-start justify-start font-semibold ${
                  isActive("/staff/gallery/") ? "bg-slate-900 text-slate-100" : "bg-white"
                }`}
                variant="light"
              >
                <GrGallery size={22} className="mr-2" />
                Gallery
              </Button>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button
                as={Link}
                to="/staff/schedule/"
                aria-current="page"
                className={`w-full text-start justify-start font-semibold ${
                  isActive("/staff/schedule/") ? "bg-slate-900 text-slate-100" : "bg-white"
                }`}
                variant="light"
              >
                <TbClockHour10 size={22} className="mr-2" />
                Schedule & Services
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </div>
  );
};

export default Sidebar;
