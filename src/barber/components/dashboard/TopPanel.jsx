import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@nextui-org/react'
import React from 'react'
import { useAuth } from '../../../context/AuthContext';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

const TopPanel = () => {

    const { user, logout } = useAuth();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();


    console.log(user)
    
  return (
    <div className='w-full flex justify-between py-4 border-slate-200 border-b-2 px-8'>

            <div className="flex justify-between gap-8">
                <Tooltip color="success" content="Tooltip 1" delay={1000}>
                    <Button color="success" variant="flat" >
                        Transactions:  10
                    </Button>
                </Tooltip>

                <Tooltip color="primary" content="Tooltip 1" delay={1000}>
                    <Button color="primary" variant="flat" >
                        Balance: Rp. 200.000
                    </Button>
                </Tooltip>
            </div>

            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    name={user?.email || 'user email'}
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" textValue='Profile' className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold"> {user?.email || 'user email'} </p>
                    </DropdownItem>
                    <DropdownItem key="logout" textValue='Logout' color="danger">
                        <Button className='w-full' color='danger' onPress={logout}>Logout</Button>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
    </div>
  )
}

export default TopPanel