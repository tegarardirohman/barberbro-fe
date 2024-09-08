import React, { useEffect, useState } from 'react'
import NavbarBarber from '../components/NavbarBarber'
import useAxios from '../../hooks/useAxios';
import SideBarTransaction from '../components/transaction/Sidebartransaction';
import TransactionItem from '../components/transaction/TransactionItem';
import { FooterPage } from './FooterPage';
import { Button, Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure, Table, Chip, Textarea } from '@nextui-org/react';
import { addOneHour, convertLongToDate, rupiah } from '../../utils/utils';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Rating } from 'react-simple-star-rating';
import { Input } from 'ckeditor5';
import { toast } from 'react-toastify';

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
      const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();


      const getStatus = (status) => {
        switch(status.toLowerCase()) {
            case "pending":
                return <Chip color="warning"> Pending </Chip>
            case "settlement":
                return <Chip color="primary"> Settlement </Chip>
            case "canceled":
                return <Chip color="danger"> Cancelled </Chip>
            case "completed":
                return <Chip color="success"> Completed </Chip>
            default:
                return <Chip color="danger"> {status} </Chip>
        }
    }   



  const handleDetails = (data) => {
    setModalData(data);
    console.log("Modal data", data)
    onOpen();
  }

  // add reviews
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const [selectedReview, setSelectedReview] = useState({});
  const { isOpen: isOpenReview, onOpen: onOpenReview, onOpenChange: onOpenChangeReview, onClose: onCloseReview } = useDisclosure();

  const handleAddReview = (data) => {
    setSelectedReview(data);
    onClose();
    onOpenReview();
  }


  // handle rating
  const handleRating = (rate) => {
    setRating(rate)

    console.log(rate)
  }

  const handleReview = (e) => {
    setReview(e.target.value)
  }

  // add review

  const postReview = async() => {
    try {
      const res = await request('/reviews', 'POST', {
        id: "",
        comment: review,
        barbershop_id: selectedReview.barber.id,
        booking_id: selectedReview.booking_id,
        rating: rating
      })

      if(res.statusCode === 200) {
        toast.success('review added');
        fetchData();
        onCloseReview();
        setReview('');
        setRating(0);
      }

    } catch (error) {
      console.log(error)
    }
  }


  const handleSubmitReview = () => {
    postReview();
  }


  // handle Cancel
  const handleCancel = async (booking_id) => {

    try {
      const res = await request(`/bookings/${booking_id}/cancel`, "PUT");
      
      if (res.statusCode === 200) {
        toast.success('booking ' + booking_id + ' canceled');
        fetchData();
        onClose();
      }
      
    } catch (error) {
      toast.error('booking failed to cancel')
      console.log(error);
    }
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


                {modalData.status.toLowerCase() === "pending" && (
                  <>
                  <Button color="danger" variant="flat" onPress={() => handleCancel(modalData.booking_id)}>
                    Cancel Booking
                  </Button>

                  <Button as="a" className="bg-slate-900 text-white px-12" href={modalData.midtrans_payment_url} target="_blank">
                    Pay Booking Now
                  </Button>
                  </>
                )}

                {modalData.status.toLowerCase() === "completed" && (
                  <Button className="bg-slate-900 text-white px-12" onPress={() => handleAddReview(modalData)}>
                    Add Review
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>



      {/* modal review */}
      <Modal isOpen={isOpenReview} onOpenChange={onOpenChangeReview} size="xl">
        <ModalContent className="w-full p-4">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between pb-4">
                <h3>Add review to {modalData?.barber?.name}</h3>
              </ModalHeader>
              <ModalBody className="w-full">
                <div className="w-full flex justify-center py-4">
                  <Rating initialValue={rating} size={40} onClick={handleRating} />
                </div>

                <Textarea
                  clearable
                  bordered
                  label="Your Review"
                  placeholder="Enter your review here"
                  labelPlacement='outside'
                  fullWidth
                  size="lg"
                  onChange={(e) => handleReview(e)}
                />
                
              </ModalBody>
              <ModalFooter className="flex justify-between py-8">
              <Button color="danger" variant="flat" onPress={onCloseReview}>
                    Cancel
                  </Button>

                  <Button className="bg-slate-900 text-white px-12" onPress={() => handleSubmitReview(modalData)}>
                    Add Review
                  </Button>

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