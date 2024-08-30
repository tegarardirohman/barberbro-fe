import { Button, Image, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { GrTransaction } from "react-icons/gr";
import { PiHandWithdraw } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbClockHour10 } from "react-icons/tb";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen py-6 bg-white shadow-md w-full relative flex flex-col">

      {/* navbar  */}
      <div className="w-full bg-slate-50 pt-2">
        <Navbar>

          <NavbarContent className="gap-2 flex-col items-start" justify="start">


            <NavbarItem className="mb-12">
              <Link color="foreground" to="/staff/">
                <h1 className="font-bold text-xl">Hans Barbershop</h1>
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link color="foreground">
                Overview
              </Link>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button as={Link} to="/staff/transaction/" aria-current="page" className="w-full text-start justify-start font-semibold" variant="light">
                <GrTransaction size={22} className="mr-2"/>
                Transaction
              </Button>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button as={Link} to="/staff/withdraw/" aria-current="page" className="w-full text-start justify-start font-semibold" variant="light">
                <PiHandWithdraw size={22} className="mr-2"/>
                Withdraw
              </Button>
            </NavbarItem>

            <NavbarItem className="mt-8">
              <Link color="foreground">
                Master Data
              </Link>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button as={Link} to="/staff/profile/" aria-current="page" className="w-full text-start justify-start font-semibold" variant="light">
                <CgProfile size={22} className="mr-2"/>
                Barbershop Profile
              </Button>
            </NavbarItem>

            <NavbarItem className="w-full px-0">
              <Button as={Link} to="/staff/schedule/" aria-current="page" className="w-full text-start justify-start font-semibold" variant="light">
                <TbClockHour10 size={22} className="mr-2"/>
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
