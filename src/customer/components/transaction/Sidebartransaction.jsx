import {Button, Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import React from "react";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { AiOutlineCheckCircle, AiOutlineFire, AiOutlineInfoCircle } from "react-icons/ai";
import { ImSad } from "react-icons/im";


const SideBarTransaction = ({status, setStatus}) => {

    const getButtonClass = (currentStatus) => {
        return status === currentStatus 
            ? "w-full text-start justify-start bg-slate-900 text-white font-semibold shadow-lg"
            : "w-full text-start justify-start";
    };

    return (
        <div className="h-full py-6 flex flex-col">
            <div className="pt-2">
                <Navbar>
                    <NavbarContent className="gap-2 flex-col items-start" justify="start">
                        <NavbarItem className="w-full px-0">
                            <Button onClick={() => setStatus("all")} aria-current="page"
                                    className={getButtonClass("all")} variant="light">
                                <AiOutlineFire size={22} className="mr-2"/>
                                All Transactions
                            </Button>
                        </NavbarItem>
                        <NavbarItem className="w-full px-0">
                            <Button onClick={() => setStatus("pending")} aria-current="page"
                                    className={getButtonClass("pending")} variant="light">
                                <AiOutlineInfoCircle size={22} className="mr-2"/>
                                Pending
                            </Button>
                        </NavbarItem>
                        <NavbarItem className="w-full px-0">
                            <Button onClick={() => setStatus("settlement")} aria-current="page"
                                    className={getButtonClass("settlement")} variant="light">
                                <AiOutlineCheckCircle size={22} className="mr-2"/>
                                Settlement
                            </Button>
                        </NavbarItem>
                        <NavbarItem className="w-full px-0">
                            <Button onClick={() => setStatus("completed")} aria-current="page"
                                    className={getButtonClass("completed")} variant="light">
                                <FaRegFaceSmileBeam size={22} className="mr-2"/>
                                Completed
                            </Button>
                        </NavbarItem>
                        <NavbarItem className="w-full px-0">
                            <Button onClick={() => setStatus("cancelled")} aria-current="page"
                                    className={getButtonClass("cancelled")} variant="light">
                                <ImSad size={22} className="mr-2"/>
                                Cancelled
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            </div>
        </div>
    );
};

export default SideBarTransaction;
