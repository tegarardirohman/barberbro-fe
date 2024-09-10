import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import useAxios from "../../../hooks/useAxios";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";

export default function ModalInputGallery({ onRefresh }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImages, setSelectedImages] = useState([]);
  const { request } = useAxios();
  const [loading, setLoading] = useState(false);

  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    let toastId;
    if (uploadLoading) {
      toastId = toast.loading("Uploading...");
    } else {
      toast.dismiss(toastId);
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };

  }, [uploadLoading]);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const compressedFiles = [];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      setLoading(true);
      for (let file of files) {
        const compressedFile = await imageCompression(file, options);
        compressedFiles.push(compressedFile);
      }
      setSelectedImages(compressedFiles);
    } catch (error) {
      console.error("Error compressing images:", error);
    } finally {
      setLoading(false);
    }
  };

  const onUpload = async () => {

    setUploadLoading(true);

    const formData = new FormData();

    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    console.log("formData", formData);

    try {
      const response = await request(`/gallery-image`, "POST", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      if (response.statusCode === 200) {
        onOpenChange(false);
        toast.success("Images uploaded successfully");
        onRefresh();
      }

      setSelectedImages([]);
    } catch (error) {
      toast.error("Error uploading images", error);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-slate-900 text-white">
        Add Images
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Images to Gallery
              </ModalHeader>
              <ModalBody className="min-h-40">
                {loading ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <Spinner label="Uploading & Compressing Images.." color="primary" labelColor="primary"/>
                  </div>
                ) : (
                  <>
                    {selectedImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {selectedImages.map((image, index) => (
                          <div
                            key={index}
                            className="w-full h-40 bg-gray-200 flex justify-center items-center"
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Selected ${index + 1}`}
                              className="object-contain h-full"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="mb-4"
                      onChange={handleImageChange}
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button onPress={onUpload} disabled={loading || selectedImages.length === 0} isDisabled={loading || selectedImages.length === 0} className="bg-slate-900 text-white">
                  Add Images
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
