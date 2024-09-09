import {
  Button,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import TimeSlider from "./TimeSlider.jsx";
import { useEffect, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { convertDateToLong, getDayName, rupiah } from "../../../utils/utils.js";
import useAxios from "../../../hooks/useAxios.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { toast } from "react-toastify";
import ProfileSection from "../profile/ProfileSection.jsx";

export default function ModalBooking({ data }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDayName, setSelectedDayName] = useState(
    getDayName(new Date())
  );
  const [error, setError] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [profileComplete, setProfileComplete] = useState(false);

  const { response, error: axiosError, loading, request } = useAxios();
  const { user, userDetail, refreshUserDetail } = useAuth();


  const [availableBookingTime, setAvailableBookingTime] = useState([]);


  const fetchAvailableBookingTime = async () => {
    try {
      const res = await request(`/bookings/${data.id}/${convertDateToLong(selectedDate)}`);
      setAvailableBookingTime(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (data.id) {
      fetchAvailableBookingTime();
    }

  }, [selectedDate, data]);



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

  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId);
  };

  const requestBooking = async (data) => {
    try {
      const res = await request("/bookings", "POST", requestData);

      if (res.statusCode === 201) {
        toast.success("Booking success, please pay via midtrans");

        window.open(res.data.midtrans_payment_url, "_blank");
        onClose();
      } else {
        toast.error("Booking failed");
      }
    } catch (error) {
      toast.error("Booking failed");
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !selectedService || !data) {
      setError("Please select a date, time, and service.");
      return;
    }

    if (!user) {
      toast.error("Please login first");
      return;
    }
    console.log(requestData);

    requestBooking(requestData);
  };

  const handleProfileSubmit = () => {
    setProfileComplete(true);
    refreshUserDetail(); 
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

  useEffect(() => {
    if (user) {
      // Check user detail to set profileComplete
      const isProfileComplete = checkUserDetail();
      setProfileComplete(isProfileComplete);
    }
  }, [user, userDetail]);

  const checkUserDetail = () => {
    return userDetail.firstName && userDetail.phone && userDetail.address;
  };

  const handleOpenModal = () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    onOpen();
  };

  return (
    <>
      <Button
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-zinc-800 px-8 py-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onPress={handleOpenModal}
      >
        Book Now
      </Button>

      <Modal
        size="4xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent className="p-4">
          {profileComplete && (
            <ModalHeader className="flex flex-col gap-1">Booking</ModalHeader>
          )}
          <ModalBody>
            {!profileComplete ? (
              <ProfileSection
                title="Complete your profile"
                handleEdit={(status) => setProfileComplete(status)}
              />
            ) : (
              <>
                <p>Please select service</p>

                <div className="flex flex-wrap gap-4 w-full py-4">
                  {data.services?.map((service) => (
                    <label
                      key={service.service_id}
                      className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer
                      ${
                        selectedService === service.service_id
                          ? "bg-slate-800 shadow-sm text-slate-100"
                          : "border-gray-300"
                      }
                      `}
                      onClick={() => handleServiceChange(service.service_id)}
                    >
                      <div className="flex flex-col items-center">
                        <input
                          type="radio"
                          name="service"
                          value={service.service_id}
                          checked={selectedService === service.service_id}
                          onChange={() =>
                            handleServiceChange(service.service_id)
                          }
                          className="sr-only"
                        />

                        <span className="text-sm font-medium block">
                          {service.service_name}
                        </span>
                        <span className="font-bold text-sm">{`${rupiah(
                          service.price
                        )}`}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <DatePicker
                  onChange={handleDateChange}
                  minValue={today(getLocalTimeZone())}
                  size="lg"
                  label="Booking Date"
                  labelPlacement="outside"
                  description="Select booking date"
                  isRequired
                  className="py-3"
                />

                <TimeSlider
                  availableBookingTime={availableBookingTime}
                  operatingHours={data.operational_hours}
                  day={selectedDayName}
                  selectedDate={selectedDate}
                  setSelectedTime={setSelectedTime}
                />
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="light" onPress={onOpenChange}>
              Close
            </Button>
            {profileComplete && (
              <Button
                onPress={handleSubmit}
                className="bg-slate-800 text-white"
                disabled
              >
                Submit
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
