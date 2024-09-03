import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import validationSchema from "../formRegister/validationSchema";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import MapInput from "../formRegister/MapInput";
import ImageInput from "../formRegister/ImageInput";

const FormProfile = () => {
  // dummy data
  const data = {
    id: "barbershop-12345",
    name: "Urban Cuts",
    contact_number: "+628123456789",
    email: "urbancuts@example.com",
    street_address: "Jl. Kebon Jeruk No. 45",
    city: "Jakarta",
    state_province_region: "DKI Jakarta",
    postal_zip_code: "11530",
    country: "Indonesia",
    latitude: -6.202394,
    longitude: 106.65271,
    description: "A modern barbershop offering premium grooming services.",
    balance: 1500000,
    verified: true,
    barbershop_profile_picture_id: {
      id: "profile-pic-67890",
      name: "barbershop_logo.png",
      path: "/images/barbershop_logo.png",
      size: 102400,
      contentType: "image/png",
      createdAt: 1690995200000,
      updatedAt: 1690995200000,
    },
    operational_hours: [
      {
        operating_hours_id: "hours-001",
        barbershop_id: "barbershop-12345",
        day: "Monday",
        opening_time: "09:00",
        closing_time: "18:00",
      },
      {
        operating_hours_id: "hours-002",
        barbershop_id: "barbershop-12345",
        day: "Tuesday",
        opening_time: "09:00",
        closing_time: "18:00",
      },
      // Add more days as needed
    ],
    services: [
      {
        service_id: "service-123",
        service_name: "Haircut",
        price: 50000,
      },
      {
        service_id: "service-124",
        service_name: "Shave",
        price: 30000,
      },
    ],
    social_media: [
      {
        social_media_id: "social-001",
        platform_name: "Instagram",
        platform_url: "https://www.instagram.com/urbancuts",
      },
      {
        social_media_id: "social-002",
        platform_name: "Facebook",
        platform_url: "https://www.facebook.com/urbancuts",
      },
    ],
    createdAt: 1690995200000,
    updatedAt: 1693587200000,
  };

  //
  const [address, setAddress] = useState(null);
  const [socialMedia, setSocialMedia] = useState([
    { platform_name: "Facebook", platform_url: "" },
    { platform_name: "Instagram", platform_url: "" },
    { platform_name: "TikTok", platform_url: "" },
  ]);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      barbershop: {
        id: data.id,
        barbershop_profile_picture_id: data.barbershop_profile_picture_id,
        name: "",
        contact_number: "",
        email: "",
        password: "",
        street_address: "",
        city: "",
        state_province_region: "",
        postal_zip_code: "",
        country: "",
        latitude: "",
        longitude: "",
        description: "",
      },
      operational_hours: [],
      services: [],
      social_media: socialMedia,
    },
    mode: "onBlur",
  });

  const { response, error, loading, request } = useAxios();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    trigger();

    console.log(getValues());
    // Try-catch block for error handling
    // try {
    //   await request("/barber/register", "PUT", data);
    //   if (response) {
    //     console.log(response);
    //     alert("Registration successful");
    //     navigate("/");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const { fields: operatingHoursFields, append: appendOperatingHour } =
    useFieldArray({
      control,
      name: "operational_hours",
    });

  useEffect(() => {
    if (data) {
      setValue("barbershop.name", data.name);
      setValue("barbershop.contact_number", data.contact_number);
      setValue("barbershop.email", data.email);
      setValue("barbershop.description", data.description);
      setValue("barbershop.street_address", data.street_address);
      setValue("barbershop.city", data.city);
      setValue("barbershop.state_province_region", data.state_province_region);
      setValue("barbershop.country", data.country);
      setValue("barbershop.latitude", data.latitude);
      setValue("barbershop.longitude", data.longitude);
      fetchZipCode(data.latitude, data.longitude);

      setValue("operational_hours", data.operational_hours);

      setValue("services", data.services);

      setValue("social_media", data.social_media);
    }
  }, []);

  useEffect(() => {
    if (address) {
      const addressToSet = `${address?.address?.road || ""} ${
        address?.address?.neighbourhood || ""
      }`;
      setValue("barbershop.street_address", addressToSet);
      setValue("barbershop.city", address.address?.city);
      setValue("barbershop.state_province_region", address.address?.state);
      setValue("barbershop.country", address?.address.country);
      setValue("barbershop.latitude", address?.latitude);
      setValue("barbershop.longitude", address?.longitude);
      // fetchZipCode(address?.latitude, address?.longitude);
    }
  }, [address]);

  const fetchZipCode = async (lat, long) => {
    try {
      const res = await request(
        `https://kodepos.vercel.app/detect/?latitude=${lat}&longitude=${long}`
      );

      setValue("barbershop.postal_zip_code", res?.code?.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSocialMediaChange = (index, e) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia[index].platform_url = e.target.value;
    setSocialMedia(updatedSocialMedia);
    setValue("social_media", updatedSocialMedia);
  };

  return (
    <form className="w-full h-full px-6 py-6" onSubmit={(e) => onSubmit(e)}>
      <Card className="w-full h-full" shadow="sm">
        <CardHeader className="w-full justify-between border-b-slate-200 border-b-2 px-10 py-4">
          <h2 className="text-xl font-bold">Profile</h2>
        </CardHeader>

        <CardBody className="w-full flex justify-start items-start px-10 py-8">
          <div className="flex w-full justify-between gap-8">
            <div className="w-full flex flex-col gap-4">
              <h2 className="pb-1 font-semibold">Barbershop Profile</h2>

              <div className="w-full flex justify-start">
                {/* <div className="w-48 h-48">
                  <Image
                    src={data?.barbershop_profile_picture_id}
                    alt="Barbershop Profile Picture"
                    className="rounded-full"
                  />
                </div> */}

                <ImageInput />
              </div>

              <div className="flex flex-row gap-4">
                <Controller
                  name="barbershop.name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Barbershop Name"
                      placeholder="Enter business name"
                      labelPlacement="outside"
                      isInvalid={!!errors.barbershop?.name}
                      errorMessage={errors.barbershop?.name?.message}
                      fullWidth
                      bordered
                      size="md"
                    />
                  )}
                />

                <Controller
                  name="barbershop.contact_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Contacts"
                      placeholder="Enter barbershop contacts"
                      labelPlacement="outside"
                      isInvalid={!!errors.barbershop?.contact_number}
                      errorMessage={errors.barbershop?.contact_number?.message}
                      fullWidth
                      bordered
                      size="md"
                    />
                  )}
                />
              </div>

              <Controller
                name="barbershop.email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    placeholder="Enter business email"
                    labelPlacement="outside"
                    isInvalid={!!errors.barbershop?.email}
                    errorMessage={errors.barbershop?.email?.message}
                    fullWidth
                    bordered
                    size="md"
                  />
                )}
              />

              <div className="flex flex-row gap-4">
                <Controller
                  name="barbershop.password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Password"
                      type="password"
                      placeholder="********"
                      labelPlacement="outside"
                      isInvalid={!!errors.barbershop?.password}
                      errorMessage={errors.barbershop?.password?.message}
                      fullWidth
                      bordered
                      size="md"
                    />
                  )}
                />

                <Controller
                  name="barbershop.confirm_password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Retype Password"
                      type="password"
                      placeholder="********"
                      labelPlacement="outside"
                      isInvalid={!!errors.barbershop?.confirm_password}
                      errorMessage={
                        errors.barbershop?.confirm_password?.message
                      }
                      fullWidth
                      bordered
                      size="md"
                    />
                  )}
                />
              </div>

              <Controller
                name="barbershop.description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    placeholder="Enter business description"
                    labelPlacement="outside"
                    isInvalid={!!errors.barbershop?.description}
                    errorMessage={errors.barbershop?.description?.message}
                    bordered
                    size="md"
                  />
                )}
              />

              <h2 className="pb-1 font-semibold">Social Media</h2>
              {socialMedia.map((social, index) => (
                <div key={index} className="flex flex-row gap-4">


                  <Controller
                    name={`social_media.${index}.platform_url`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Platform URL"
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
            </div>

            <div className="w-full flex flex-col gap-4">
              <h2 className="pb-4 font-semibold">Barbershop Location</h2>
              <MapInput address={address} setAddress={setAddress} />

              <Controller
                name="barbershop.street_address"
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
                  name="barbershop.city"
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
                  name="barbershop.state_province_region"
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
                  name="barbershop.country"
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
                  name="barbershop.postal_zip_code"
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
          </div>
        </CardBody>

        <CardFooter className="w-full flex justify-end px-10 py-4">
          <Button type="submit" color="primary">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default FormProfile;
