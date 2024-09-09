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

const AdminWithdraw = () => {
  const { user, userDetail, refreshUserDetail } = useAuth();
  const { response, error, loading, request } = useAxios();
  const [modalData, setModalData] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useDocumentTitle("Transaction");

  // table
  const [tableData, setTableData] = useState([]);

  const columns = [
    { uid: "id", name: "#", sortable: false },
    { uid: "barber.name", name: "Barber Name", sortable: false },
    { uid: "barber.city", name: "Barber City", sortable: false },
    { uid: "account_number", name: "Account Number", sortable: false },
    { uid: "account_name", name: "Account Name", sortable: true },
    { uid: "bank_name", name: "Bank Name", sortable: false },
    { uid: "withdrawal_amount", name: "Amount", sortable: false },
    { uid: "created_at", name: "Date", sortable: false },
    { uid: "status", name: "Status", sortable: false },
    { uid: "actions", name: "Actions", sortable: false },
  ];

  const statusColorMap = {
    PENDING: "warning",
    APPROVED: "success",
  };

  const statusOptions = [
    { uid: "PENDING", name: "Pending" },
    { uid: "APPROVED", name: "Approved" },
  ];

  const INITIAL_VISIBLE_COLUMNS = [
    "barber.name",
    "account_number",
    "account_name",
    "bank_name",
    "withdrawal_amount",
    "created_at",
    "status",
    "actions",
  ];

  // get table data
  const fetchTableData = async () => {
    try {
      const res = await request(`/withdrawals`);

      const transformedData = res.data.map((item) => ({
        ...item,
        created_at: convertLongToDate(item.created_at),
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

  const handleAccWithdrawl = async () => {
    try {
      const res = await request(`/withdrawals/${modalData.id}/approve`, "PUT");

      if (res.statusCode === 200) {
        toast.success("Withdrawal success");
        fetchTableData();
      }

      console.log(res);
      refreshUserDetail();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-8">
      <h2 className="text-xl font-bold mb-4">Withdrawal Data</h2>

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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent className="w-full py-4 px-8">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">Withdraw request</ModalHeader>
              <ModalBody className="w-full">
                <Card className="" shadow="none">
                  <ProfileItem
                    icon={<FaHashtag size={24} className="text-slate-400" />}
                    name="Barber Name"
                    value={modalData.barber.name}
                  />

                  <div className="w-full flex justify-between">
                    {/* customer data */}
                    <div className="w-1/2">
                      <table className="w-full border-spacing-y-2">
                        <tbody className="w-full space-y-4">
                          <tr>
                            <td>Bank Name</td>
                            <td>{modalData.bank_name}</td>
                          </tr>
                          <tr>
                            <td>Account Name</td>
                            <td>{modalData.account_name}</td>
                          </tr>
                          <tr>
                            <td>Account Number</td>
                            <td>
                              {modalData.account_number}
                            </td>
                          </tr>
                          <tr>
                            <td>Date </td>
                            <td>{modalData.created_at}</td>
                          </tr>
                          <tr>
                            <td>Amount </td>
                            <td className="font-bold">
                              {rupiah(modalData.withdrawal_amount)}
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
              </ModalBody>

              <ModalFooter className="mt-8 justify-between">
                <Button color="danger" variant="ghost" size="lg" onClick={onClose}>
                  Close
                </Button>


                {
                  modalData.status === "PENDING" && (
                    <Button
                    color="default"
                    variant="ghost"
                    size="lg"
                    onClick={handleAccWithdrawl}
                    className="px-4 bg-slate-800 text-slate-100"
                  >
                    Acc Withdrawl
                  </Button>
                  )
                }


              </ModalFooter>

            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminWithdraw;
