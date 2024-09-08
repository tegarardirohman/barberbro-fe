import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import CKEditorComponent from "../ckeditor/CKEditorComponent";
import { Controller } from "react-hook-form";
import { convertLongToDate, getImageUrl } from "../../../utils/utils";
import ImageInput from "../formRegister/ImageInput";

export default function ModalBarberProfile({ image, control, errors, onSubmit, setValue }) {
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
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 px-10 py-8">Update Barber Profile and Email</ModalHeader>
              <ModalBody className="px-10 pb-10">

                <div className="w-full flex justify-between gap-8">

                    <ImageInput imageUrl={image} />

                    <div className="flex-1 flex-row gap-4">
                        <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                            {...field}
                            label="Email"
                            placeholder="Enter email"
                            labelPlacement="outside"
                            isInvalid={!!errors?.email}
                            errorMessage={errors?.email?.message}
                            fullWidth
                            bordered
                            size="md"
                            />
                        )}
                        />
                    </div>

                </div>
              </ModalBody>
              <ModalFooter className="justify-between px-8 py-4">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button onPress={() => {
                  onSubmit();
                  onClose();
                }} className="w-24 bg-slate-900 text-white">
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
