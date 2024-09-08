import React, { useEffect, useState } from 'react'
import NavbarBarber from '../components/NavbarBarber'
import useAxios from '../../hooks/useAxios';
import SideBarTransaction from '../components/transaction/Sidebartransaction';
import TransactionItem from '../components/transaction/TransactionItem';
import { FooterPage } from './FooterPage';
import { Button, Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure, Table, Chip } from '@nextui-org/react';
import { addOneHour, convertLongToDate, rupiah } from '../../utils/utils';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const TransactionPage = () => {

      const [transactions, setTransactions] = useState([]);
      const { response, error, loading, request } = useAxios();
      const [status, setStatus] = useState("all");
      const [filteredData, setFilteredData] = useState([]);
      useDocumentTitle("Transactions");

      const fetchData = async () => {
        try {
          const res = await request('/bookings/current');
          console.log(res)
          setTransactions(res.data);
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
        fetchData();
      }, [])


      useEffect(() => {
        const filtered = transactions.filter((transaction) => {
          switch (status.toLowerCase()) {
            case "all":
              return true;
            case "settlement":
              return transaction.status.toLowerCase() === "settlement";
            case "pending":
              return transaction.status.toLowerCase() === "pending";
            case "cancelled":
              return transaction.status.toLowerCase() === "cancelled";
            case "completed":
              return transaction.status.toLowerCase() === "completed";
            default:
              return false;
          }
        });
      
        const sorted = filtered.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
      
        setFilteredData(sorted);
      }, [status, transactions]);

      // for modal
      const [modalData, setModalData] = useState({});
      const { isOpen, onOpen, onOpenChange } = useDisclosure();


      const getStatus = (status) => {
        switch(status.toLowerCase()) {
            case "pending":
                return <Chip color="warning"> Pending </Chip>
            case "settlement":
                return <Chip color="primary"> Settlement </Chip>
            case "cancelled":
                return <Chip color="danger"> Cancelled </Chip>
            default:
                return <Chip color="success"> {status} </Chip>
        }
    }   



  const handleDetails = (data) => {
    setModalData(data);
    console.log("Modal data", data)
    onOpen();
  }

   
  return (
    <>
          {/* modal */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent className="w-full p-4">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between pb-1">
                <h3>Booking Details</h3>
                {getStatus(modalData.status)}
              </ModalHeader>
              <ModalBody className="w-full">
                <Card className="p-4 border-1" shadow="none">
                  <table>
                    <tbody className="w-full">
                      <tr>
                        <td> Booking ID</td>
                        <td>{modalData.booking_id}</td>
                      </tr>
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
                        <td>{modalData.booking_time + " - " + addOneHour(modalData.booking_time)}</td>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td>{convertLongToDate(modalData.booking_date)}</td>
                      </tr>
                      <tr>
                        <td>Total Price</td>
                        <td className="font-bold">{ rupiah(modalData.total_price) }</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>

                <h2>Services</h2>
                <Card className='w-full border-1' shadow='none'>
                  <Table aria-label='Services' shadow='none'>
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
                </Card>

              </ModalBody>
              <ModalFooter className="flex justify-between py-8">
                <Button color="danger" variant="flat" onPress={() => handleCancel(modalData.booking_id)}>
                  Cancel Booking
                </Button>


                {modalData.status.toLowerCase() === "pending" && (
                  <Button as="a" className="bg-slate-900 text-white px-12" href={modalData.midtrans_payment_url} target="_blank">
                    Pay Booking Now
                  </Button>
                )}


              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>






        <NavbarBarber />
        <main className="max-w-screen-xl mx-auto pt-32 flex min-h-[40rem]">
            <div className="w-60 fixed">
                <SideBarTransaction status={status} setStatus={setStatus} />
            </div>

            <div className="flex-1 ml-60">
                <TransactionItem data={filteredData} handleDetails={handleDetails}/>
            </div>
        </main>


      <FooterPage />
    </>
  )
}

export default TransactionPage