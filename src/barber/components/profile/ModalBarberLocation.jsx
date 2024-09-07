import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import CKEditorComponent from "../ckeditor/CKEditorComponent";
import { Controller } from "react-hook-form";
import { convertLongToDate, getImageUrl } from "../../../utils/utils";
import MapInput from "../formRegister/MapInput";

export default function ModalBarberLocation({ control, errors, onSubmit, setValue, address, setAddress }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [socialMedia, setSocialMedia] = useState([
    { platform_name: "Facebook", platform_url: "" },
    { platform_name: "Instagram", platform_url: "" },
    { platform_name: "TikTok", platform_url: "" },
  ]);


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
              <ModalHeader className="flex flex-col gap-1 px-10 py-8">Update Barbershop Location</ModalHeader>
              <ModalBody className="px-10 pb-10">

              <div className="w-full flex flex-col gap-4">
              <MapInput address={address} setAddress={setAddress} setValue={setValue} />

              <Controller
                name="street_address"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Street Address"
                    placeholder="Enter Street Address"
                    labelPlacement="outside"
                    fullWidth
                    bordered
                    size="md"
                  />
                )}
              />

              <div className="flex w-full gap-4">
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="City"
                      placeholder="Enter City"
                      labelPlacement="outside"
                      fullWidth
                      bordered
                      size="md"
                    />
                  )}
                />

                <Controller
                  name="state_province_region"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="State"
                      placeholder="Enter State"
                      labelPlacement="outside"
                      fullWidth
                      bordered
                      size="md"
                    />
                  )}
                />
              </div>

              <div className="flex w-full gap-4">
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Country"
                      placeholder="Enter Country"
                      labelPlacement="outside"
                      fullWidth
                      bordered
                      size="md"
                    />
                  )}
                />

                <Controller
                  name="postal_zip_code"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Postal Code"
                      placeholder="Enter Postal Code"
                      labelPlacement="outside"
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
