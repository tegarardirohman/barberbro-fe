import { Card, CardBody, CardHeader, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import React, { useState } from 'react'
import { FaServicestack } from 'react-icons/fa';
import { Fa42Group } from 'react-icons/fa6';
import OperationalHoursInput from '../components/formRegister/OperationalHoursInput';
import { useAuth } from '../../context/AuthContext';

const StaffOpsService = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [operationalHours, setOperationalHours] = useState([]);

    const {user, userDetail} = useAuth();

    console.log(userDetail)

    const rows = [
        {
          key: "1",
          name: "Tony Reichert",
          role: "CEO",
          status: "Active",
        },
        {
          key: "2",
          name: "Zoey Lang",
          role: "Technical Lead",
          status: "Paused",
        },
        {
          key: "3",
          name: "Jane Fisher",
          role: "Senior Developer",
          status: "Active",
        },
        {
          key: "4",
          name: "William Howard",
          role: "Community Manager",
          status: "Vacation",
        },
      ];
      
      const columns = [
        {
          key: "name",
          label: "NAME",
        },
        {
          key: "role",
          label: "ROLE",
        },
        {
          key: "status",
          label: "STATUS",
        },
      ];

  return (
    <div className='w-full flex gap-8 py-4 px-4'>

        {/* left */}
        <Card className='w-full p-4'>
            <CardHeader className='border-b-1'>
                <h2 className="text-lg font-bold w-full text-left py-1">Services</h2>
                <Button onPress={onOpen} color="primary">Add Service</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <FaServicestack className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <Fa42Group className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
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
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
            </CardHeader>
            <CardBody>
                <Table aria-label="Example table with dynamic content">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                        )}
                </TableBody>
                </Table>
            </CardBody>
        </Card>


        {/* right */}

        <Card className='w-full p-4'>
            <CardHeader className='border-b-1 flex w-full justify-between'>
                <h2 className="text-lg font-bold w-full text-left py-1">Operational Hours</h2>
                <Button color="primary">Save</Button>
            </CardHeader>
            <CardBody className='flex flex-col gap-4'>
                <OperationalHoursInput operationalHours={operationalHours} setOperationalHours={setOperationalHours} />
            </CardBody>
        </Card>
                
    </div>
  )
}

export default StaffOpsService