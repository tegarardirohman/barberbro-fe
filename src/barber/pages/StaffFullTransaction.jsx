import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import useAxios from '../../hooks/useAxios';
import TableComponent from '../../admin/components/table/TableComponent';
import { convertDateToLong, convertLongToDate, rupiah } from '../../utils/utils';
import { Table, Button, Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react';
import ProfileItem from '../components/profile/ProfileItem';
import { FaHashtag } from 'react-icons/fa6';
import ModalViewTransaction from '../components/transaction/ModalViewTransaction';

const StaffFullTransaction = () => {

    const {user, userDetail, refreshUserDetail} = useAuth();
    const {response, error, loading, request} = useAxios();
    const [modalData, setModalData] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    

    // table
    const [tableData, setTableData] = useState([]);

    const columns = [
        { uid: "booking_id", name: "#", sortable: true },
        { uid: "customer.firstName", name: "Customer Name", sortable: false },
        { uid: "customer.surname", name: "LastName", sortable: false },
        { uid: "customer.email", name: "Customer Email", sortable: false },
        { uid: "customer.phone", name: "Customer Phone", sortable: false },
        { uid: "customer.is_male", name: "isMale", sortable: false },
        { uid: "booking_date", name: "Booking Date", sortable: true },
        { uid: "booking_time", name: "Booking Time", sortable: true },
        { uid: "services", name: "Service Name", sortable: false },
        { uid: "total_price", name: "Total Price", sortable: true },
        { uid: "status", name: "Status", sortable: false },
        { uid: "actions", name: "Actions", sortable: false },
      ];

      const statusColorMap = {
        Pending: "warning", 
        Settlement: "primary",
        Canceled: "danger",
        Completed: "success"
      };

      const statusOptions = [
        { uid: 'Pending', name: 'Pending' },
        { uid: 'Settlement', name: 'Settlement' },
        { uid: 'Canceled', name: 'Canceled' },
        { uid: 'Completed', name: 'Completed' }
      ];
    
      const INITIAL_VISIBLE_COLUMNS = ["customer.firstName", "customer.surname", "booking_date", "booking_time", "services", "total_price", "status", "actions"];


    // get table data
    const fetchTableData = async () => {
        try {
            const res = await request(`/bookings/current`);

            const transformedData = res.data.map(item => ({
                ...item,
                booking_date: convertLongToDate(item.booking_date),
              }));

            setTableData(transformedData);
            console.log(transformedData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, [])


    // handle tabel
    const handleView = (item) => {
        setModalData(item);
        onOpen();
    }

    const handleAdd = () => {
        
    }

  return (
    <div className='px-8'>
        <h2 className='text-xl font-bold mb-4'>Staff Full Transaction</h2>

        <TableComponent
            data={tableData}
            columns={columns}
            INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
            statusColorMap={statusColorMap}
            statusOptions={statusOptions}
            statusFilterDefault="all"
            // onAdd={() => handleAdd()}
            onView={(item) => handleView(item)}

          />


          {/* modal */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent className="w-full py-4 px-8">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                Booking Data
              </ModalHeader>
              <ModalBody className="w-full">
                <Card className="" shadow="none">

                <ProfileItem icon={<FaHashtag size={24} className='text-slate-400' />} name="Booking ID" value={modalData.booking_id} />

                  <table className="w-full border-spacing-y-2">
                    <tbody className="w-full space-y-4">
                      <tr>
                        <td>Name</td>
                        <td>
                          {modalData.customer.firstName +
                            " " +
                            modalData.customer.surname}
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>
                          {modalData.customer.email}
                        </td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>
                          {modalData.customer.phone}
                        </td>
                      </tr>
                      <tr>
                        <td>Time</td>
                        <td>{modalData.booking_time + " - " + modalData.booking_time}</td>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td>{convertLongToDate(modalData.booking_date)}</td>
                      </tr>
                      <tr>
                        <td>Total Price</td>
                        <td className="font-bold">{ rupiah(modalData.total_price) }</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td className="font-bold">{ modalData.status }</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>

                <h2>Services</h2>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>SERVICES</TableColumn>
                    <TableColumn>PRICE</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {modalData.services.map((service) => (  
                      <TableRow key={service.service_id}>
                        <TableCell>{service.service_name}</TableCell>
                        <TableCell>{service.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

              </ModalBody>
              <ModalFooter className="flex justify-between py-8">

                {
                    modalData.status.toLowerCase() === "pending" &&
                    <Button color="danger" variant="flat" onPress={() => handleCancel(modalData.booking_id)} className='w-full'>
                    Cancel Booking
                  </Button>
                }


                {
                    (modalData.status.toLowerCase() === "settlement" && modalData.booking_date === convertDateToLong(new Date()) )&&
                    <Button onPress={() => handleCompleted(modalData.booking_id)} className="bg-slate-900 text-white px-12 w-full">
                    Completed
                    </Button>
                }

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  )
}

export default StaffFullTransaction