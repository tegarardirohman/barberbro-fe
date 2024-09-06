import {
  Button,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import TimeSlider from "./TimeSlider.jsx";
import { useEffect, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { convertDateToLong, getDayName } from "../../../utils/utils.js";
import useAxios from "../../../hooks/useAxios.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function ModalBooking({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDayName, setSelectedDayName] = useState(
    getDayName(new Date())
  );
  const [error, setError] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const { response, error: axiosError, loading, request } = useAxios();
  const {user, logout} = useAuth();

  const [requestData, setRequestData] = useState({
    barber_id: "",
    services: [],
    booking_date: 0,
    booking_time: "",
  });

  const handleDateChange = (dateObj) => {
    const selected = new Date(dateObj.year, dateObj.month - 1, dateObj.day);

    if (isNaN(selected.getTime())) {
      setError("Not valid.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      setError("Min date is today.");
    } else {
      setError("");
      setSelectedDate(selected);
      setSelectedDayName(getDayName(selected));
    }
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const requestBooking = async(data) => {
      try {
        const res = await request("/bookings", "POST", data);
        console.log(res)
      } catch (error) {
        console.log(error);
      }
  }

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !selectedService || !data) {
      console.log("error", selectedDate, selectedTime);
      setError("Please select a date and time.");
      return;
    }

    console.log(requestData);


    requestBooking(requestData);
  };

  const handleOpen = () => {

    if(user) {
        onOpen();
    } else {
        alert('Please login first!')
    }
  };


  useEffect(() => {
    const newRequestData = {
        barber_id: data.id,
        services: [selectedService],
        booking_date: convertDateToLong(selectedDate),
        booking_time: selectedTime,
      };

    setRequestData(newRequestData);
  }, [selectedTime, selectedDate, selectedService, data]);

  return (
    <>
      <Button
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-zinc-800 px-8 py-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onPress={handleOpen}
      >
        Book Now
      </Button>

      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <ModalHeader className=" flex flex-col gap-1">Booking</ModalHeader>
          <ModalBody>
            <p>Please complete the form below!</p>

            <Select
              size="md"
              label="Select Services"
              placeholder="Select Services"
              labelPlacement="outside"
              isRequired
              selectedKeys={[selectedService]}
              onChange={handleServiceChange}
            >
              {data.services?.map((service) => (
                <SelectItem key={service.service_id}>
                  {service.service_name}
                </SelectItem>
              ))}
            </Select>

            <DatePicker
              onChange={handleDateChange}
              minValue={today(getLocalTimeZone())}
              size="md"
              label="Booking Date"
              labelPlacement="outside"
              description="Select booking date"
              isRequired
            />

            <TimeSlider
              operatingHours={data.operational_hours}
              day={selectedDayName}
              selectedDate={selectedDate}
              setSelectedTime={setSelectedTime}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onOpenChange}>
              Close
            </Button>
            <Button
              color="primary"
              type="submit"
              onPress={() => handleSubmit()}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
