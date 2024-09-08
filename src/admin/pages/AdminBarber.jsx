import React, { useEffect, useState } from "react";
import TableComponent from "../components/table/TableComponent";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useAxios from "../../hooks/useAxios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  Image,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@nextui-org/react";
import RowComponent from "../components/table/RowComponent";
import LittleStatItem from "../components/stat/LittleStatItem";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import MapComponent from "../components/map/MapComponent";
import { CiPhone } from "react-icons/ci";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoMdPin } from "react-icons/io";
import { PiCityLight } from "react-icons/pi";
import { TbZip } from "react-icons/tb";
import { getImageUrl } from "../../utils/utils";

const AdminBarber = () => {
  useDocumentTitle("Admin - Barbershop Data");

  const [data, setData] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState(null);

  const { response, error, loading, request } = useAxios();

  const fetchData = async () => {
    try {
      const res = await request("/barbers");

      console.log(res.data);

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    try {
      await request(`/customers/${id}`, "DELETE");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // Convert date_of_birth to readable format
  const processedData = data.map((data) => ({
    ...data,
    barbershop_profile_picture_path: data?.barbershop_profile_picture_id?.path ? (
      <img
        src={
          getImageUrl(data?.barbershop_profile_picture_id?.path)
        }
        alt="Barbershop Profile"
        className="w-12 aspect-square object-cover rounded-md"
      />
    ) : (
      <FaUserCircle size={24} />
    ),
  }));

  const columns = [
    { uid: "id", name: "#", sortable: true },
    { uid: "barbershop_profile_picture_path", name: "Images", sortable: true },
    { uid: "name", name: "Name", sortable: true },
    { uid: "email", name: "Email", sortable: true },
    { uid: "contact_number", name: "Contact", sortable: true },
    { uid: "street_address", name: "Street Address", sortable: false },
    { uid: "city", name: "City", sortable: false },
    { uid: "state_province_region", name: "Province", sortable: false },
    { uid: "postal_zip_code", name: "ZIP Code", sortable: false },
    { uid: "description", name: "Description", sortable: false },
    { uid: "actions", name: "Actions", sortable: false },
  ];

  const INITIAL_VISIBLE_COLUMNS = [
    "barbershop_profile_picture_path",
    "name",
    "email",
    "contact_number",
    "city",
    "actions",
  ];

  function handleView(selectedData) {
    onOpen();
    setSelected(selectedData);
    console.log(selected);
  }

  function handleEdit(id) {
    console.log(`Edit user with id ${id}`);
  }

  function handleDelete(id) {
    console.log(`Delete user with id ${id}`);
  }

  function handleAdd() {
    console.log("Add new user");
  }

  return (
    <div className="p-8">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="5xl"
        className="py-4 px-8"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                {" "}
                Detail of {selected?.name}{" "}
              </ModalHeader>

              <ModalBody className="flex flex-col gap-4">
                <div className="flex w-full gap-4 justify-between">
                  <div className="w-1/2">
                    <div className="flex w-full gap-4">
                      <Image
                        src={
                          getImageUrl(selected?.barbershop_profile_picture_id.path)
                          
                        }
                        alt="Barbershop Profile"
                        className="w-40 aspect-square object-cover rounded-lg"
                      />
                      <div>
                        <h1 className="text-xl font-bold mb-4">
                          {" "}
                          {selected?.name}{" "}
                        </h1>

                        <div dangerouslySetInnerHTML={{ __html: selected?.description }}></div>
                      </div>
                    </div>

                    <Card
                      className="py-4 mt-4 w-full px-0"
                      shadow="none"
                    >
                      <h2 className="text-sm font-bold mb-1">
                        Opertional Hours
                      </h2>

                      <Table aria-label="Example static collection table" shadow="none" radius="sm" className="-ml-4 pl-0">
                        <TableHeader className="w-full bg-slate-950">
                          <TableColumn>DAY</TableColumn>
                          <TableColumn>OPEN</TableColumn>
                          <TableColumn>CLOSED</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {selected?.operational_hours.map((hour, index) => (
                            <TableRow key={index}>
                              <TableCell> {hour.day} </TableCell>
                              <TableCell> {hour.opening_time} </TableCell>
                              <TableCell> {hour.closing_time} </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  </div>

                  <div className="">
                    <MapComponent
                      longitude={selected?.longitude}
                      latitude={selected?.latitude}
                      name={selected?.name}
                    />

                    <Card className="pt-4 w-full" shadow="none">
                      <h2 className="text-sm font-bold mb-0">Services</h2>

                      <Table aria-label="Example static collection table" shadow="none" radius="sm" className="-ml-4 pl-0">
                        <TableHeader className="w-full bg-slate-950">
                          <TableColumn>SERVICE</TableColumn>
                          <TableColumn>PRICE</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {selected?.services.map((service, index) => (
                            <TableRow key={index}>
                              <TableCell> {service.service_name} </TableCell>
                              <TableCell> {service.price} </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>


                    </Card>
                  </div>
                </div>

                <div className="w-full flex justify-between">
                  <div>
                    <h1 className="text-md font-bold mb-4"> Contact </h1>
                    <p className="font-light text-sm flex gap-2 items-center"> <CiPhone />  {selected?.contact_number} </p>
                    <p className="font-light text-sm flex gap-2 items-center"> <MdOutlineAlternateEmail /> {selected?.email} </p>
                    <p className="font-light text-sm flex gap-2 items-center"> <IoMdPin /> {selected?.street_address} </p>
                    <p className="font-light text-sm flex gap-2 items-center"> <PiCityLight /> {selected?.city}, {selected?.state_province_region} </p>
                    <p className="font-light flex gap-2 items-center"> <TbZip /> {selected?.postal_zip_code} </p>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color=""
                  variant="flat"
                  onPress={onClose}
                  className="w-full bg-slate-900 text-white"
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* <Card className='w-full flex flex-row gap-8 justify-between border-separate mb-6 py-6 px-8 border-y-1' shadow='sm'>
          <LittleStatItem icon={<FaUsers />} color="green" title="Total Users" value={data.length} />
          <LittleStatItem icon={<FaUsers />} color="green" title="Total Users" value={data.length} />
          <LittleStatItem icon={<FaUsers />} color="slate" title="Total Users" value={data.length} />
          <LittleStatItem icon={<FaUsers />} color="slate" title="Total Users" value={data.length} />
      </Card> */}

      <Card className="p-4">
        <TableComponent
          data={processedData}
          columns={columns}
          INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
          onView={handleView}
          // onEdit={handleEdit}
          onDelete={handleDelete}
          // onAdd={handleAdd}
        />
      </Card>
    </div>
  );
};

export default AdminBarber;
