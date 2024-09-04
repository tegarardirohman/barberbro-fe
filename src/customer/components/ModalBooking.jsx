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
    useDisclosure
} from "@nextui-org/react";
import TimeSlider from "./TimeSlider.jsx";
import {useState} from "react";

export default function ModalBooking() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    }

    const handlePrev = () => {
        setStep(step - 1);
    }

    return (
        <>
            <Button
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-zinc-800 px-8 py-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onPress={onOpen}>
                Book Now
            </Button>

            {step === 1 && (
                <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}
                       isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className=" flex flex-col gap-1">Booking</ModalHeader>
                                <ModalBody>
                                    <p>Please complete the form below!</p>
                                    <Select size="sm" label="Select Services">
                                        <SelectItem>Hair Cut</SelectItem>
                                        <SelectItem>Shaving</SelectItem>
                                        <SelectItem>Bleaching</SelectItem>
                                    </Select>
                                    <DatePicker size="sm" label="Booking Date"/>
                                    <p>Select time</p>
                                    <TimeSlider/>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={handleNext}>
                                        Continue
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}

            {step === 2 && (
                <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}
                       isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className=" flex flex-col gap-1">Please Review Your Booking</ModalHeader>
                                <ModalBody>
                                    <p>Please complete the form below!</p>
                                    <Select size="sm" label="Select Services">
                                        <SelectItem>Hair Cut</SelectItem>
                                        <SelectItem>Shaving</SelectItem>
                                        <SelectItem>Bleaching</SelectItem>
                                    </Select>
                                    <DatePicker size="sm" label="Booking Date"/>
                                    <p>Select time</p>
                                    <TimeSlider/>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={handlePrev}>
                                        Back
                                    </Button>
                                    <Button color="primary" onPress={handleNext}>
                                        Continue
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}

            {step === 1 && (
                <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}
                       isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className=" flex flex-col gap-1">Booking</ModalHeader>
                                <ModalBody>
                                    <p>Please complete the form below!</p>
                                    <Select size="sm" label="Select Services">
                                        <SelectItem>Hair Cut</SelectItem>
                                        <SelectItem>Shaving</SelectItem>
                                        <SelectItem>Bleaching</SelectItem>
                                    </Select>
                                    <DatePicker size="sm" label="Booking Date"/>
                                    <p>Select time</p>
                                    <TimeSlider/>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={handleNext}>
                                        Continue
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}