import React, { useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { FaLock } from "react-icons/fa6";
import { FaMailBulk } from "react-icons/fa";
import useAxios from "../hooks/useAxios";

export default function ModalRegister({ props }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const { response, error, loading, request } = useAxios();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const register = request(`http://10.10.102.48:8080/api/register`, "POST", { email, password, role: "CUSTOMER" }, { "Content-Type": "application/json" });
  }

  useEffect(() => {
      console.log(response)
  }, [response])



  return (
    <>
      <Button onPress={onOpen} className={`bg-transparent px-0 font-bold ${props ? 'text-black' : 'text-white'}`}>REGISTER</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top"
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleRegister}>
              <ModalHeader className="flex flex-col gap-1">Sign Up </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <FaMailBulk />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />

                <Input
                  endContent={
                    <FaLock />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />

                <Input
                  endContent={
                    <FaLock />
                    // <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Retype your password"
                  type="password"
                  variant="bordered"
                />


              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary">
                  Sign Up
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
