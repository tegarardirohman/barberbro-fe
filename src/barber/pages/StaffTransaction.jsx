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

  useEffect(() => {
    // Simulate fetching data
    const initialDatas = [
      {
        booking_id: "1a2b3c4d5e6f7g8h9i0j",
        customer: {
          id: "cust_001",
          firstName: "John",
          surname: "Doe",
          email: "john.doe@example.com",
          phone: "+1234567890",
          address: "123 Main St, Springfield",
          about: "Regular customer, loves a good haircut.",
          is_male: true,
          date_of_birth: 631152000000,
        },
        barber_id: "barb_001",
        services: [
          {
            service_id: "serv_001",
            service_name: "Haircut",
            price: 150000,
          },
        ],
        bookingDate: 1693776000000,
        bookingTime: "10:00",
        status: "Confirmed",
        totalPrice: 150000,
        createdAt: 1693660800000,
        updatedAt: 1693660800000,
      },
      {
        booking_id: "2b3c4d5e6f7g8h9i0j1k",
        customer: {
          id: "cust_002",
          firstName: "Jane",
          surname: "Smith",
          email: "jane.smith@example.com",
          phone: "+0987654321",
          address: "456 Elm St, Springfield",
          about: "New customer, excited for a hair color change.",
          is_male: false,
          date_of_birth: 725846400000,
        },
        barber_id: "barb_002",
        services: [
          {
            service_id: "serv_002",
            service_name: "Hair Color",
            price: 300000,
          },
        ],
        bookingDate: 1725392400000, // Today’s date in milliseconds
        bookingTime: "10:00",
        status: "Confirmed",
        totalPrice: 300000,
        createdAt: 1693747200000,
        updatedAt: 1693747200000,
      },
      {
        booking_id: "3c4d5e6f7g8h9i0j1k2l",
        customer: {
          id: "cust_003",
          firstName: "Alice",
          surname: "Johnson",
          email: "alice.johnson@example.com",
          phone: "+1122334455",
          address: "789 Oak St, Springfield",
          about: "Looking for a quick haircut.",
          is_male: false,
          date_of_birth: 438408000000,
        },
        barber_id: "barb_003",
        services: [
          {
            service_id: "serv_001",
            service_name: "Haircut",
            price: 150000,
          },
        ],
        bookingDate: 1693833600000,
        bookingTime: "09:00",
        status: "Pending",
        totalPrice: 150000,
        createdAt: 1693833600000,
        updatedAt: 1693833600000,
      },
      {
        booking_id: "4d5e6f7g8h9i0j1k2l3m",
        customer: {
          id: "cust_004",
          firstName: "Bob",
          surname: "Williams",
          email: "bob.williams@example.com",
          phone: "+5566778899",
          address: "101 Pine St, Springfield",
          about: "Prefers beard trims and facials.",
          is_male: true,
          date_of_birth: 499574400000,
        },
        barber_id: "barb_004",
        services: [
          {
            service_id: "serv_004",
            service_name: "Beard Trim",
            price: 75000,
          },
          {
            service_id: "serv_005",
            service_name: "Facial",
            price: 120000,
          },
        ],
        bookingDate: 1694006400000,
        bookingTime: "16:00",
        status: "Cancelled",
        totalPrice: 195000,
        createdAt: 1693920000000,
        updatedAt: 1693920000000,
      },
      {
        booking_id: "5e6f7g8h9i0j1k2l3m4n",
        customer: {
          id: "cust_005",
          firstName: "Emma",
          surname: "Brown",
          email: "emma.brown@example.com",
          phone: "+6677889900",
          address: "202 Maple St, Springfield",
          about: "Enjoys scalp massages and hair washes.",
          is_male: false,
          date_of_birth: 825302400000,
        },
        barber_id: "barb_005",
        services: [
          {
            service_id: "serv_006",
            service_name: "Scalp Massage",
            price: 100000,
          },
          {
            service_id: "serv_007",
            service_name: "Hair Wash",
            price: 50000,
          },
        ],
        bookingDate: 1694092800000,
        bookingTime: "13:00",
        status: "Confirmed",
        totalPrice: 150000,
        createdAt: 1694006400000,
        updatedAt: 1694006400000,
      },
      {
        booking_id: "6f7g8h9i0j1k2l3m4n5o",
        customer: {
          id: "cust_006",
          firstName: "Chris",
          surname: "Davis",
          email: "chris.davis@example.com",
          phone: "+2233445566",
          address: "303 Birch St, Springfield",
          about: "Regular customer, prefers evening appointments.",
          is_male: true,
          date_of_birth: 725846400000,
        },
        barber_id: "barb_006",
        services: [
          {
            service_id: "serv_008",
            service_name: "Haircut",
            price: 150000,
          },
        ],
        bookingDate: 1725392400000, // Today’s date in milliseconds
        bookingTime: "15:00",
        status: "Confirmed",
        totalPrice: 150000,
        createdAt: 1693660800000,
        updatedAt: 1693660800000,
      },
      {
        booking_id: "7g8h9i0j1k2l3m4n5o6p",
        customer: {
          id: "cust_007",
          firstName: "Katie",
          surname: "Martin",
          email: "katie.martin@example.com",
          phone: "+3344556677",
          address: "404 Cedar St, Springfield",
          about: "Looking for a stylish haircut.",
          is_male: false,
          date_of_birth: 695875200000,
        },
        barber_id: "barb_007",
        services: [
          {
            service_id: "serv_009",
            service_name: "Haircut",
            price: 150000,
          },
        ],
        bookingDate: 1725392400000, // Today’s date in milliseconds
        bookingTime: "10:00",
        status: "Confirmed",
        totalPrice: 150000,
        createdAt: 1693660800000,
        updatedAt: 1693660800000,
      },
      {
        booking_id: "8h9i0j1k2l3m4n5o6p7q",
        customer: {
          id: "cust_008",
          firstName: "Michael",
          surname: "Lee",
          email: "michael.lee@example.com",
          phone: "+4455667788",
          address: "505 Fir St, Springfield",
          about: "Prefers early morning appointments.",
          is_male: true,
          date_of_birth: 620560800000,
        },
        barber_id: "barb_008",
        services: [
          {
            service_id: "serv_010",
            service_name: "Haircut",
            price: 150000,
          },
        ],
        bookingDate: 1693833600000,
        bookingTime: "09:00",
        status: "Confirmed",
        totalPrice: 150000,
        createdAt: 1693833600000,
        updatedAt: 1693833600000,
      },
      {
        booking_id: "9i0j1k2l3m4n5o6p7q8r",
        customer: {
          id: "cust_009",
          firstName: "Laura",
          surname: "Wilson",
          email: "laura.wilson@example.com",
          phone: "+5566778899",
          address: "606 Spruce St, Springfield",
          about: "Enjoys luxury hair treatments.",
          is_male: false,
          date_of_birth: 783116800000,
        },
        barber_id: "barb_009",
        services: [
          {
            service_id: "serv_011",
            service_name: "Hair Treatment",
            price: 200000,
          },
        ],
        bookingDate: 1693920000000,
        bookingTime: "11:00",
        status: "Confirmed",
        totalPrice: 200000,
        createdAt: 1693920000000,
        updatedAt: 1693920000000,
      },
      {
        booking_id: "0j1k2l3m4n5o6p7q8r9s",
        customer: {
          id: "cust_010",
          firstName: "Daniel",
          surname: "Taylor",
          email: "daniel.taylor@example.com",
          phone: "+6677889900",
          address: "707 Willow St, Springfield",
          about: "Looking for a complete makeover.",
          is_male: true,
          date_of_birth: 545238400000,
        },
        barber_id: "barb_010",
        services: [
          {
            service_id: "serv_012",
            service_name: "Makeover",
            price: 350000,
          },
        ],
        bookingDate: 1693833600000,
        bookingTime: "10:00",
        status: "Confirmed",
        totalPrice: 350000,
        createdAt: 1693833600000,
        updatedAt: 1693833600000,
      },
      {
        booking_id: "1k2l3m4n5o6p7q8r9s0t",
        customer: {
          id: "cust_011",
          firstName: "Olivia",
          surname: "Moore",
          email: "olivia.moore@example.com",
          phone: "+7788990011",
          address: "808 Redwood St, Springfield",
          about: "Prefers spa treatments.",
          is_male: false,
          date_of_birth: 862547200000,
        },
        barber_id: "barb_011",
        services: [
          {
            service_id: "serv_013",
            service_name: "Spa Treatment",
            price: 250000,
          },
        ],
        bookingDate: 1725296400000,
        bookingTime: "10:00",
        status: "Confirmed",
        totalPrice: 250000,
        createdAt: 1693833600000,
        updatedAt: 1693833600000,
      },
      {
        booking_id: "2l3m4n5o6p7q8r9s0t1u",
        customer: {
          id: "cust_012",
          firstName: "Ethan",
          surname: "Anderson",
          email: "ethan.anderson@example.com",
          phone: "+8899001122",
          address: "909 Ash St, Springfield",
          about: "Looking for a fresh look.",
          is_male: true,
          date_of_birth: 753648000000,
        },
        barber_id: "barb_012",
        services: [
          {
            service_id: "serv_014",
            service_name: "Haircut & Beard Trim",
            price: 200000,
          },
        ],
        bookingDate: 1725296400000,
        bookingTime: "10:00",
        status: "Confirmed",
        totalPrice: 200000,
        createdAt: 1693833600000,
        updatedAt: 1693833600000,
      },
    ];

    console.log(initialDatas[11].bookingDate);
    console.log(convertToLong(1693718400000));
    console.log(getTodayLong());

    setDatas(initialDatas);
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
    console.log(convertToLong(newDate));
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
