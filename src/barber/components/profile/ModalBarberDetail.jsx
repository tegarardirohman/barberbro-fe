import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import CKEditorComponent from "../ckeditor/CKEditorComponent";
import { Controller } from "react-hook-form";
import { convertLongToDate } from "../../../utils/utils";

export default function ModalBarberDetail({ data, control, errors, onSubmit, setValue }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="default" variant="bordered" size="sm" className='w-24 p-4 absolute top-8 right-8'>Edit</Button>
      <Modal 
        isOpen={isOpen} 
        isDismissable={false}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="3xl"
        className="min-h-[30rem] z-[1050]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 px-10 py-8">Update Barber Detail</ModalHeader>
              <ModalBody className="px-10">

              <div className="flex flex-row gap-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Barbershop Name"
                      placeholder="Enter business name"
                      labelPlacement="outside"
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message}
                      fullWidth
                      bordered
                      size="md"
                    />
                  )}
                />

                <Controller
                  name="contact_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Contacts"
                      placeholder="Enter barbershop contacts"
                      labelPlacement="outside"
                      isInvalid={!!errors.contact_number}
                      errorMessage={errors.contact_number?.message}
                      fullWidth
                      bordered
                      size="md"
                    />
                  )}
                />
              </div>

                  <h4 className="text-lg font-semibold">Description</h4>
                <CKEditorComponent data={data} setValue={setValue} />

              </ModalBody>
              <ModalFooter className="justify-between px-8 py-4">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button onPress={onSubmit} className="w-24 bg-slate-900 text-white">
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
