import { Avatar, Button, Card, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@nextui-org/react'
import React from 'react'
import { useAuth } from '../../../context/AuthContext';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { getImageUrl, rupiah } from '../../../utils/utils';

const TopPanel = () => {

    const { user, userDetail, logout } = useAuth();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();



    
  return (
        <div className='w-full flex justify-between py-6 px-8 border-b-1'>
                <div className="flex justify-between gap-8">
                    <Tooltip color="success" content="Transactions today: 10" delay={1000}>
                        <Button color="success" variant="flat" radius='sm' >
                            Transactions:  10
                        </Button>
                    </Tooltip>

                    <Tooltip color="primary" content="Balance" delay={1000}>
                        <Button color="primary" variant="flat" radius='sm' >
                            Balance: { rupiah(userDetail?.balance) }
                        </Button>
                    </Tooltip>
                </div>


                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <div className='flex gap-4 items-center'>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            name={user?.email || 'user email'}
                            src={ getImageUrl(userDetail?.barbershop_profile_picture_id?.path)}
                            size="md"
                        />

                        <div className='cursor-pointer'>
                            <h3 className='font-bold'>{userDetail?.name || 'user name'}</h3>
                            <h3 className='font-light'>{user?.email || 'user email'}</h3>
                        </div>

                        
                        </div>


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