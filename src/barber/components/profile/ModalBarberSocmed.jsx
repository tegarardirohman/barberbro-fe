import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import CKEditorComponent from "../ckeditor/CKEditorComponent";
import { Controller } from "react-hook-form";
import { convertLongToDate, getImageUrl } from "../../../utils/utils";
import ImageInput from "../formRegister/ImageInput";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import useAxios from "../../../hooks/useAxios";

export default function ModalBarberSocmed() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [socialMedia, setSocialMedia] = useState([]);
  const {userDetail, refreshUserDetail} = useAuth();

  // data socmed
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");



  useEffect(() => {
    if (userDetail && userDetail.social_media) {
      setSocialMedia(userDetail.social_media);
      setFacebook(userDetail.social_media[0].platform_url);
      setInstagram(userDetail.social_media[1].platform_url);
      setTiktok(userDetail.social_media[2].platform_url);
      console.log(userDetail)
    } else {
      refreshUserDetail();
    }

    console.log(socialMedia)
  }, [userDetail]);



  const {request} = useAxios();

  const putData = async (data) => {
    try {
      const res = await request("/barbers/social-media/current", "PUT", data);
    } catch (error) {
      console.log(error);
    }
  }



  // submit
  const onSubmit = () => {
    socialMedia.forEach((media) => {
      let url = "";
  
      // Sesuaikan URL berdasarkan platform
      if (media.platform_name === "Facebook") {
        url = facebook;
      } else if (media.platform_name === "Instagram") {
        url = instagram;
      } else if (media.platform_name === "Tiktok") {
        url = tiktok;
      }
  
      const data = {
        social_media_id: media.social_media_id,
        platform_name: media.platform_name,
        platform_url: url
      };
  
      putData(data);
    });

    toast.success("Social Media Updated");
    refreshUserDetail();
    onClose();
  };
  


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

              <Input  
                label="Facebook"
                placeholder="Enter facebook URL"
                labelPlacement="outside"
                fullWidth
                bordered
                value={facebook}
                onValueChange={setFacebook}
                size="md"
              />


              <Input  
                label="Instagram"
                placeholder="Enter instagram URL"
                labelPlacement="outside"
                fullWidth
                bordered
                value={instagram}
                onValueChange={setInstagram}
                size="md"
              />


              <Input  
                label="TikTok"
                placeholder="Enter tiktok URL"
                labelPlacement="outside"
                fullWidth
                bordered
                value={tiktok}
                onValueChange={setTiktok}
                size="md"
              />




              {/* {socialMedia.map((social, index) => (
                <div key={index} className="flex flex-row gap-4">
                  <Controller
                    name={`social_media.${index}.platform_url`}
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
              ))} */}

              </ModalBody>
              <ModalFooter className="justify-between px-8 py-4">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button onPress={() => {
                  onSubmit();
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
