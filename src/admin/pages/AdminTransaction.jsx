import React, { useEffect, useState } from "react";
import {
  convertDateToLong,
  convertLongToDate,
  rupiah,
} from "../../utils/utils";
import {
  Table,
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { FaHashtag } from "react-icons/fa6";
import useAxios from "../../hooks/useAxios";
import TableComponent from "../components/table/TableComponent";
import { useAuth } from "../../context/AuthContext";
import ProfileItem from "../../barber/components/profile/ProfileItem";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const AdminTransaction = () => {
  const { user, userDetail, refreshUserDetail } = useAuth();
  const { response, error, loading, request } = useAxios();
  const [modalData, setModalData] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useDocumentTitle("Transaction");

  // table
  const [tableData, setTableData] = useState([]);

  const columns = [
    { uid: "booking_id", name: "#", sortable: true },
    { uid: "barber.name", name: "Barber Name", sortable: false },
    { uid: "barber.city", name: "Barber Location", sortable: false },
    { uid: "customer.firstName", name: "Customer Name", sortable: false },
    { uid: "customer.surname", name: "LastName", sortable: false },
    { uid: "customer.email", name: "Customer Email", sortable: false },
    { uid: "customer.phone", name: "Customer Phone", sortable: false },
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
    Completed: "success",
  };

  const statusOptions = [
    { uid: "Pending", name: "Pending" },
    { uid: "Settlement", name: "Settlement" },
    { uid: "Canceled", name: "Canceled" },
    { uid: "Completed", name: "Completed" },
  ];

  const INITIAL_VISIBLE_COLUMNS = [
    "barber.name",
    "barber.city",
    "customer.firstName",
    "customer.surname",
    "booking_date",
    "booking_time",
    "services",
    "total_price",
    "status",
    "actions",
  ];

  // get table data
  const fetchTableData = async () => {
    try {
      const res = await request(`/bookings`);

      const transformedData = res.data.map((item) => ({
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
  }, []);

  // handle tabel
  const handleView = (item) => {

    console.log("data", item)
    setModalData(item);
    onOpen();
  };

  const handleAdd = () => {};

  return (
    <div className="px-8">
      <h2 className="text-xl font-bold mb-4">Transactions Data</h2>

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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent className="w-full py-4 px-8">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">Booking Data</ModalHeader>
              <ModalBody className="w-full">
                <Card className="" shadow="none">
                  <ProfileItem
                    icon={<FaHashtag size={24} className="text-slate-400" />}
                    name="Booking ID"
                    value={modalData.booking_id}
                  />

                  <div className="w-full flex justify-between">
                    {/* customer data */}
                    <div className="w-1/2">
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
                            <td>{modalData.customer.email}</td>
                          </tr>
                          <tr>
                            <td>Phone</td>
                            <td>{modalData.customer.phone}</td>
                          </tr>
                          <tr>
                            <td>Time</td>
                            <td>
                              {modalData.booking_time +
                                " - " +
                                modalData.booking_time}
                            </td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td>{convertLongToDate(modalData.booking_date)}</td>
                          </tr>
                          <tr>
                            <td>Total Price</td>
                            <td className="font-bold">
                              {rupiah(modalData.total_price)}
                            </td>
                          </tr>
                          <tr>
                            <td>Status</td>
                            <td className="font-bold">{modalData.status}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* barber data */}
                    <div className="w-1/2">
                      <table className="w-full border-spacing-y-2">
                        <tbody className="w-full border-spacing-y-8">
                          <tr className="w-full">
                            <td>Barber</td>
                            <td>
                              {modalData.barber.name}
                            </td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>{modalData.barber.email}</td>
                          </tr>
                          <tr>
                            <td>Phone</td>
                            <td>{modalData.barber.contact_number}</td>
                          </tr>
                          <tr>
                            <td>Address</td>
                            <td className="ps-2 text-sm">
                              {modalData.barber.street_address}
                            </td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>{modalData.barber.city}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminTransaction;
