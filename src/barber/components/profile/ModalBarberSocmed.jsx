import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import CKEditorComponent from "../ckeditor/CKEditorComponent";
import { Controller } from "react-hook-form";
import { convertLongToDate, getImageUrl } from "../../../utils/utils";
import ImageInput from "../formRegister/ImageInput";

export default function ModalBarberSocmed({ control, errors, onSubmit, setValue }) {
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
              <ModalHeader className="flex flex-col gap-1 px-10 py-8">Update Social Media</ModalHeader>
              <ModalBody className="px-10 pb-10">

              <h2 className="pb-1 font-semibold">Social Media</h2>
              {socialMedia.map((social, index) => (
                <div key={index} className="flex flex-row gap-4">
                  <Controller
                    name={`social_media.${index}.platform_url`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={social.platform_name}
                        placeholder="Enter platform URL"
                        labelPlacement="outside"
                        fullWidth
                        bordered
                        size="md"
                      />
                    )}
                  />
                </div>
              ))}

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
