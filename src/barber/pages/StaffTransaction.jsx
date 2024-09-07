import { Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Scheduler from "../components/scheduler/Scheduler";
import SlotScheduler from "../components/scheduler/SlotScheduler";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { addOneHour, convertDateToLong, convertLongToDate, rupiah } from "../../utils/utils";
import useAxios from "../../hooks/useAxios";
import { FaFaceDizzy } from "react-icons/fa6";

const StaffTransaction = () => {
  const convertToLong = (dateString) => {
    const dateConverted = new Date(dateString);
    return dateConverted.setHours(0, 0, 0, 0);
  };

  const getTodayLong = () => {
    return convertToLong(new Date()); // Get today's date in long format
  };

  const [datas, setDatas] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [date, setDate] = useState(getTodayLong());

  // useAxios
  const { response, error, loading, request } = useAxios();


  const fetchData = async () => {
    try {
      const res = await request(`/bookings/current`);

      setDatas(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter and group data based on the selected date
    const filteredData = datas.filter((data) => data.bookingDate === date);

    const grouped = Object.values(
      filteredData.reduce((acc, data) => {
        if (!acc[data.bookingTime]) {
          acc[data.bookingTime] = {
            bookingTime: data.bookingTime,
            bookings: [],
          };
        }
        acc[data.bookingTime].bookings.push(data);
        return acc;
      }, {})
    );

    setGroupedData(grouped);
  }, [date, datas]);

  const handleDateChange = (newDate) => {
    console.log(convertDateToLong(newDate));
    setDate(convertToLong(newDate));
  };

  // modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [modalData, setModalData] = useState({});

  const handleModal = (data) => {
    console.log(data);
    setModalData(data);
    onOpen();
  };

  const handleCancel = async (booking_id) => {

    try {
      const res = await request(`/bookings/${booking_id}/cancel`, "PUT");
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    alert('cancel booking ' + booking_id);
  };

  const handleCompleted = async (booking_id) => {

    try {
      const res = await request(`/bookings/${booking_id}/completed`, "PUT");
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    alert('confirm booking ' + booking_id);
  };

  return (
    <>
      {/* modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent className="w-full p-4">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                Booking Data
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
                        <td>{modalData.bookingTime + " - " + addOneHour(modalData.bookingTime)}</td>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td>{convertLongToDate(modalData.bookingDate)}</td>
                      </tr>
                      <tr>
                        <td>Total Price</td>
                        <td className="font-bold">{ rupiah(modalData.totalPrice) }</td>
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
                <Button color="danger" variant="flat" onPress={() => handleCancel(modalData.booking_id)}>
                  Cancel Booking
                </Button>
                <Button onPress={() => handleCompleted(modalData.booking_id)} className="bg-slate-900 text-white px-12">
                  Completed
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* content */}
      <div className="flex px-4 w-full">
        <div className="w-full py-4 px-4 flex flex-col gap-4" shadow="none">
          <Card className="w-full py-4 px-4">
            <Scheduler setDate={handleDateChange} />
          </Card>

          <Card className="w-full max-w-full py-4 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {groupedData.length > 0 ? (
              groupedData.map((data, index) => (
                <SlotScheduler
                  key={index}
                  data={data}
                  handleModal={handleModal}
                />
              ))
            ) : (
              <p>No bookings found for this date.</p>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default StaffTransaction;
