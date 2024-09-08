import {
  Card,
  CardBody,
  CardHeader,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaServicestack } from "react-icons/fa";
import { Fa42Group } from "react-icons/fa6";
import OperationalHoursInput from "../components/formRegister/OperationalHoursInput";
import { useAuth } from "../../context/AuthContext";
import ModalAddService from "../components/service/ModalAddService";
import TableComponent from "../../admin/components/table/TableComponent";
import useAxios from "../../hooks/useAxios";
import { rupiah } from "../../utils/utils";
import { Controller, useForm } from "react-hook-form";
import { ImFoursquare } from "react-icons/im";
import { toast } from "react-toastify";

const StaffOpsService = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [operationalHours, setOperationalHours] = useState([]);

  const { user, userDetail, refreshUserDetail } = useAuth();
  const { request } = useAxios();
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);
  const [updateCount, setUpdateCount] = useState(0);
  const [processCount, setProcessCount] = useState(0);

  console.log(userDetail);

  useEffect(() => {
    if (!userDetail) {
      refreshUserDetail();
    } else {
      setServices(userDetail.services);
      setOperationalHours(userDetail.operational_hours);
    }
  }, [userDetail]);

  const columns = [
    { uid: "service_id", name: "#", sortable: true },
    { uid: "service_name", name: "Service Name", sortable: true },
    { uid: "price", name: "Price", sortable: true },
    { uid: "actions", name: "Actions", sortable: false },
  ];

  const INITIAL_VISIBLE_COLUMNS = ["service_name", "price", "actions"];

  // input
  const { control, setValue, getValues } = useForm({
    defaultValues: {
      service_id: "",
      service_name: "",
      price: 0,
    },
  });

  const onCancel = () => {
    setSelectedItem(null);
    onOpenChange(false);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);

    setValue("service_id", item.service_id);
    setValue("service_name", item.service_name);
    setValue("price", item.price);
    onOpen();
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setValue("service_id", "");
    setValue("service_name", "");
    setValue("price", 0);
    onOpen();
  };

  const handleDelete = (item) => {
    setDeletedItem(item);
    onOpen();
  };

  // Function to handle adding a new service input
  const handleUpdateService = async () => {
    const data = getValues();
    console.log(data);

    try {
      const res = await request("/barbers/services/current", "PUT", data);

      if (res.statusCode === 200) {
        refreshUserDetail();
        toast.success("Profile successfully updated");
        onClose();
      }
    } catch (error) {
      toast.error("Service failed to update", error);
    }
  };

  const handleAddService = async () => {
    const data = getValues();
    console.log(data);

    try {
      const res = await request("/barbers/services/current", "POST", data);

      if (res.statusCode === 200) {
        refreshUserDetail();
        toast.success("Profile successfully updated");
        onClose();
      }
    } catch (error) {
      toast.error("Service failed to add", error);
    }
  };

  const handleDeleteService = async () => {
    try {
      const res = await request(`/barbers/services/current/${deletedItem.service_id}`, "DELETE");
      if (res.statusCode === 200) {
        refreshUserDetail();
        setDeletedItem(null);
        toast.success("Service deleted");
        onClose();
      }
    } catch (error) {
      toast.error("Service failed to delete", error);
    }
  };

  // PUT
  const putHour = async (data) => {

    try {
      const res = await request(`/barbers/operational-hour/current`, "PUT", data);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateCount(updateCount + 1);
    }
  };

  // POST
  const postHour = async (data) => {
    try {
      const res = await request(`/barbers/operational-hour/current`, "POST", data);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateCount(updateCount + 1);
    }
  };

  // DELETE
  const deleteHour = async (data) => {
    try {
      const res = await request(`/barbers/operational-hours/current/${data.operational_hours_id}`, "DELETE");
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateCount(updateCount + 1);
    }
  };

  // operational hours
  const handleUpdateOperationalHours = () => {
    const updatedData = operationalHours.map(({ barbershop_id, ...rest }) => rest); // Data setelah diedit
    const initialData = userDetail.operational_hours.map(({ barbershop_id, ...rest }) => rest); // Data awal
  
    // Periksa data yang baru (updatedData) dan bandingkan dengan data awal (initialData)
    updatedData.forEach((hour) => {
      const existingData = initialData.find((initialHour) => initialHour.day === hour.day);
  
      if (!existingData) {
        // Jika data tidak ada di initialData, maka POST
        if (!hour.operational_hours_id) {
          setProcessCount(processCount + 1);
          postHour(hour);
        }
      } else {
        // Jika data ada, bandingkan untuk PUT
        if (
          existingData.opening_time !== hour.opening_time ||
          existingData.closing_time !== hour.closing_time ||
          existingData.limit_per_session !== hour.limit_per_session
        ) {
          setProcessCount(processCount + 1);
          putHour(hour);
        }
      }
    });
  
    // Periksa data awal (initialData) dan bandingkan dengan data yang baru (updatedData)
    initialData.forEach((initialHour) => {
      const currentData = updatedData.find((hour) => hour.day === initialHour.day);
      if (!currentData) {
        setProcessCount(processCount + 1);
        deleteHour(initialHour);
      }
    });
  
  };

  useEffect(() => {
    if (updateCount === processCount && processCount > 0) {
      refreshUserDetail();
      toast.success("Operational hours updated");
      setProcessCount(0);
      setUpdateCount(0);
    }
  }, [updateCount]);
  
  
  

  return (
    <div className="w-full flex gap-8 py-4 px-4">
      {/* left */}
      <Card className="w-full p-4 border-1" shadow="none">
        <div className="w-full flex justify-between">
          <h2 className="text-md font-bold">Services</h2>
        </div>
        <CardBody>
          <TableComponent
            data={services}
            columns={columns}
            INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
            onAdd={() => handleAdd()}
            onEdit={(item) => handleEdit(item)}
            onDelete={(item) => handleDelete(item)}
          />
        </CardBody>
      </Card>

      {/* right */}

      <Card className="w-full p-4 border-1" shadow="none">
        <CardHeader className="border-b-1 flex w-full justify-between">
          <h2 className="text-lg font-bold w-full text-left py-1">
            Operational Hours
          </h2>
          <Button color="primary" onClick={handleUpdateOperationalHours}>Save</Button>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <OperationalHoursInput
            operationalHours={operationalHours}
            setOperationalHours={setOperationalHours}
          />
        </CardBody>
      </Card>

      {/* modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selectedItem
                  ? "Update Service"
                  : deletedItem
                  ? "Delete Service"
                  : "Create Service"}
              </ModalHeader>
              <ModalBody>
                {deletedItem ? (
                  <p className="text-sm">
                    Are you sure you want to delete this service?
                  </p>
                ) : (
                  <>
                    <Controller
                      name="service_name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Service Name"
                          placeholder="Enter service name"
                          variant="bordered"
                          isRequired
                        />
                      )}
                    />

                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          label="Price"
                          placeholder="Enter price"
                          variant="bordered"
                          isRequired
                          validate={(val) => val >= 0}
                        />
                      )}
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button color="danger" variant="flat" onPress={onCancel}>
                  Cancel
                </Button>

                {selectedItem ? (
                  <Button color="primary" onPress={handleUpdateService}>
                    Update
                  </Button>
                ) : deletedItem ? (
                  <Button color="danger" onPress={handleDeleteService}>
                    Delete
                  </Button>
                ) : (
                  <Button color="success" onPress={handleAddService}>
                    Create
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default StaffOpsService;
