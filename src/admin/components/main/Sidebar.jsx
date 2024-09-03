import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { GrTransaction } from "react-icons/gr";
import { PiHandWithdraw } from "react-icons/pi";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbClockHour10 } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen py-6 bg-white shadow-md w-full relative flex flex-col">
      {/* navbar */}
      <div className="w-full bg-slate-50 pt-2">
        <Navbar>
          <NavbarContent className="gap-2 flex-col items-start" justify="start">
            <NavbarItem className="mb-12">
              <Link color="foreground" to="/admin/">
                <h1 className="font-bold text-xl">Barberbro Admin</h1>
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link color="foreground">
                Overview
              </Link>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button
                as={Link}
                to="/admin/"
                aria-current="page"
                className={`w-full text-start justify-start font-semibold ${isActive("/admin/") ? "bg-slate-200" : ""}`}
                variant="light"
              >
                <AiOutlineDashboard size={22} className="mr-2" />
                Dashboard
              </Button>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button
                as={Link}
                to="/admin/transaction/"
                aria-current="page"
                className={`w-full text-start justify-start font-semibold ${isActive("/admin/transaction/") ? "bg-slate-200" : ""}`}
                variant="light"
              >
                <GrTransaction size={22} className="mr-2" />
                Transaction
              </Button>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button
                as={Link}
                to="/admin/withdraw/"
                aria-current="page"
                className={`w-full text-start justify-start font-semibold ${isActive("/admin/withdraw/") ? "bg-slate-200" : ""}`}
                variant="light"
              >
                <PiHandWithdraw size={22} className="mr-2" />
                Withdraw
              </Button>
            </NavbarItem>

            <NavbarItem className="mt-8">
              <Link color="foreground">
                Master Data
              </Link>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button
                as={Link}
                to="/admin/barbershop/"
                aria-current="page"
                className={`w-full text-start justify-start font-semibold ${isActive("/admin/barbershop/") ? "bg-slate-200" : ""}`}
                variant="light"
              >
                <CgProfile size={22} className="mr-2" />
                Barbershop
              </Button>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button
                as={Link}
                to="/admin/customer/"
                aria-current="page"
                className={`w-full text-start justify-start font-semibold ${isActive("/admin/customer/") ? "bg-slate-200" : ""}`}
                variant="light"
              >
                <TbClockHour10 size={22} className="mr-2" />
                Customer
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </div>
  );
};

export default Sidebar;
