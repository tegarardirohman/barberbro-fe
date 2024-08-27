import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { FaMailBulk } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

export default function ModalLogin({props}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} className={`bg-transparent px-0 font-bold ${props ? 'text-black' : 'text-white'}`}>LOGIN</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top"
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
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
                    // <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="default" variant="flat" className="bg-slate-900 text-white" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
