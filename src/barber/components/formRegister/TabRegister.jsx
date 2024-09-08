import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Card,
  CardBody,
  SelectItem,
  CardFooter,
  Spacer,
  CardHeader,
  CheckboxGroup,
} from "@nextui-org/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import validationSchema from "./validationSchema";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MapInput from "./MapInput";
import OperationalHoursInput from "./OperationalHoursInput";
import useAxios from "../../../hooks/useAxios";
import FormResults from "./FormResults";
import { toast } from "react-toastify";

export default function MultiStepForm() {
  const [operationalHours, setOperationalHours] = useState([]);
  const [socialMedia, setSocialMedia] = useState([
    {
      platform_name: "Facebook",
      platform_url: "",
    },
    {
      platform_name: "Instagram",
      platform_url: "",
    },
    {
      platform_name: "TikTok",
      platform_url: "",
    },
  ]);

  // location
  const [address, setAddress] = useState(null);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateProvinceRegion, setStateProvinceRegion] = useState("");
  const [postalZipCode, setPostalZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  //agreement
  const [agreement, setAgreement] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    watch,
    getValues,
    trigger,
    setValue,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      barbershop: {
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
      operational_hours: [
        // { day: "", opening_time: "", closing_time: "" },
      ],
      services: [
        // { service_name: "", price: "" },
      ],
      social_media: [
        // { platform_name: "", platform_url: "" },
      ],
    },
    mode: "onBlur",
  });

  // use AXIOS
  const { response, error, loading, request } = useAxios();
  const navigate = useNavigate();

  const onSubmit = async (data) => {

    console.log(data)

    try {
      await request("/barber/register", "POST", data);

      if (response) {
        console.log(response);

        toast.success("Registration successful");

        navigate('/')
      }

    } catch (error) {
      console.log(error);
    }

  };

  const {
    fields: operatingHoursFields,
    append: appendOperatingHour,
    remove: removeOperatingHour,
  } = useFieldArray({
    control,
    name: "operational_hours",
  });

  useEffect(() => {
    setValue("operational_hours", operationalHours);
  }, [operationalHours]);

  const [step, setStep] = useState(1);

  const handleNext = async () => {
    const result = await trigger();

    if (result) {
      setStep((prevStep) => prevStep + 1);
    } else {
      console.log("validation failed", errors);
    }
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // service
  const [services, setServices] = useState([{ service_name: "", price: "" }]);

  // Function to handle adding a new service input
  const handleAddService = () => {
    setServices([...services, { service_name: "", price: "" }]);
  };

  // Function to handle input changes for services
  const handleServiceChange = (index, event) => {
    const { name, value } = event.target;
    const updatedServices = services.map((service, i) =>
      i === index ? { ...service, [name]: value } : service
    );
    setServices(updatedServices);
    setValue("services", updatedServices);
  };

  // Function to handle removing a service input
  const handleRemoveService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };
  // end of services


  const fetchZipCode = async (lat, long) => {
    try {
      await request(
        `https://kodepos.vercel.app/detect/?latitude=${lat}&longitude=${long}`
      );

      setPostalZipCode(response?.data?.code);
      setValue("barbershop.postal_zip_code", response?.data?.code?.toString());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (address) {
      console.log(address);
      const addressToSet =
        (address?.address?.road ? address?.address?.road + " " : "") +
          (address?.address?.neighbourhood
            ? address?.address?.neighbourhood
            : "") || "";

      setValue("barbershop.street_address", addressToSet);
      setValue("barbershop.city", address.address?.city);
      setValue("barbershop.state_province_region", address.address?.state);
      setValue("barbershop.country", address?.address.country);
      setValue("barbershop.latitude", address.lat);
      setValue("barbershop.longitude", address?.lon);
      setValue("barbershop.city", address.address?.city);
      setValue("barbershop.state_province_region", address.address?.state);
      setValue("barbershop.country", address?.address.country);
      setValue("services", services);
      setValue("social_media", socialMedia);

      fetchZipCode(address?.lat, address?.lon);

      setStreetAddress(addressToSet);
      setCity(address.address?.city);
      setStateProvinceRegion(address.address?.state);
      setCountry(address?.address.country);
      setLatitude(address?.latitude);
      setLongitude(address?.longitude);
    }
  }, [address]);

  //
  const handleSocialMediaChange = (socmed, e) => {
    if (socmed === "facebook") {
      socialMedia[0].platform_url = e.target.value;
    } else if (socmed === "instagram") {
      socialMedia[1].platform_url = e.target.value;
    } else if (socmed === "tiktok") {
      socialMedia[2].platform_url = e.target.value;
    }

    setValue("social_media", socialMedia);
  };

  return (
    <form className="w-full h-full" onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <Card className="w-full h-full" shadow="none">
          <CardHeader className="w-full justify-between border-b-slate-200 border-2 px-10 py-4">
            <Button as={Link} to={"/"}>
              <FaArrowLeft /> Back
            </Button>
            <h2 className="text-xl font-bold">Join With Us </h2>
          </CardHeader>

          <CardBody className="w-full flex justify-start items-start px-10 py-8">
            <div className="flex w-full justify-between gap-8">
              <div className="w-full flex flex-col gap-4">
                <h2 className="pb-1 font-semibold">Business Information</h2>
                <div className="flex flex-row gap-4">
                  {/* name */}
                  <Input
                    {...register("barbershop.name")}
                    label="Barbershop Name"
                    placeholder="Enter business name"
                    labelPlacement="outside"
                    isInvalid={!!errors.barbershop?.name}
                    errorMessage={errors.barbershop?.name?.message}
                    fullWidth
                    bordered
                    size="md"
                  />

                  {/* name */}
                  <Input
                    {...register("barbershop.contact_number")}
                    label="Contacts"
                    placeholder="Enter business contacts"
                    labelPlacement="outside"
                    isInvalid={!!errors.barbershop?.contact_number}
                    errorMessage={errors.barbershop?.contact_number?.message}
                    fullWidth
                    bordered
                    size="md"
                  />
                </div>

                {/* email */}
                <Input
                  {...register("barbershop.email")}
                  label="Email"
                  placeholder="Enter business email"
                  labelPlacement="outside"
                  isInvalid={!!errors.barbershop?.email}
                  errorMessage={errors.barbershop?.email?.message}
                  fullWidth
                  bordered
                  size="md"
                />

                <div className="flex flex-row gap-4">
                  {/* name */}
                  <Input
                    {...register("barbershop.password")}
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

                  {/* name */}
                  <Input
                    {...register("barbershop.confirm_password")}
                    label="Retype Password"
                    type="password"
                    placeholder="********"
                    labelPlacement="outside"
                    isInvalid={!!errors.barbershop?.confirm_password}
                    errorMessage={errors.barbershop?.confirm_password?.message}
                    fullWidth
                    bordered
                    size="md"
                  />
                </div>

                {/* description */}

                <Textarea
                  {...register("barbershop.description")}
                  label="Description"
                  placeholder="Enter business description"
                  labelPlacement="outside"
                  isInvalid={!!errors.barbershop?.description}
                  errorMessage={errors.barbershop?.description?.message}
                  bordered
                  size="md"
                />

                <h2 className="pt-4 font-semibold">Operational Hours</h2>

                {/* Operational Hours Error */}
                {errors.operational_hours && (
                  <p className="text-red-500">{errors.operational_hours?.message}</p>
                )}

                <OperationalHoursInput
                  operationalHours={operationalHours}
                  setOperationalHours={setOperationalHours}
                />

                <div>
                  <h2 className="pt-4 font-semibold">Barbershop Services</h2>

                  { errors.services && (
                    <p className="text-red-500 pb-4">{errors.services[0]?.message}</p>
                  )}


                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="flex w-full gap-4 mb-4 justify-between"
                    >
                      <Input
                        type="text"
                        id={`services-${index}`}
                        name="service_name"
                        label="Services"
                        labelPlacement="outside"
                        placeholder="Enter Services"
                        className="flex-1"
                        value={service.service}
                        onChange={(e) => handleServiceChange(index, e)}
                        isInvalid={!!errors.services?.[index]?.service_name}
                        errorMessage={errors.services?.[index]?.service_name?.message}
                      />
                      <Input
                        type="number"
                        id={`price-${index}`}
                        name="price"
                        label="Price"
                        labelPlacement="outside"
                        placeholder="Enter Price"
                        className="w-1/3"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, e)}
                        isInvalid={!!errors.services?.[index]?.price}
                        errorMessage={errors.services?.[index]?.price?.message}
                      />
                      <Button
                        type="button"
                        color="danger"
                        auto
                        onClick={() => handleRemoveService(index)}
                        className="self-center mt-6"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    onPress={handleAddService}
                    className="mt-2 bg-blue-500 text-white rounded-md"
                  >
                    Add Service
                  </Button>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <h2 className="pb-4 font-semibold">Barbershop Location</h2>
                <MapInput address={address} setAddress={setAddress} />

                <Controller
                  name="barbershop.street_address"
                  control={control}
                  defaultValue={streetAddress}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Street Address"
                      placeholder="Enter Street Address"
                      labelPlacement="outside"
                      fullWidth
                      bordered
                      size="md"
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value || ""}
                      isInvalid={!!errors.barbershop?.street_address}
                      errorMessage={errors.barbershop?.street_address?.message}
                    />
                  )}
                />

                <div className="flex w-full gap-4">
                  <Controller
                    name="barbershop.city"
                    control={control}
                    defaultValue={city}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="City"
                        placeholder="Enter City"
                        labelPlacement="outside"
                        fullWidth
                        bordered
                        size="md"
                        value={field.value} // Controlled value from field
                        onChange={(e) => {
                          field.onChange(e); // Update react-hook-form state
                          setCity(e.target.value);
                        }}
                        isInvalid={!!errors.barbershop?.city}
                        errorMessage={errors.barbershop?.city?.message}
                      />
                    )}
                  />

                  <Controller
                    name="barbershop.state_province_region"
                    control={control}
                    defaultValue={city}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="State"
                        placeholder="Enter State"
                        labelPlacement="outside"
                        fullWidth
                        bordered
                        size="md"
                        value={field.value} // Controlled value from field
                        onChange={(e) => {
                          field.onChange(e); // Update react-hook-form state
                          setStateProvinceRegion(e.target.value);
                        }}
                        isInvalid={!!errors.barbershop?.state_province_region}
                        errorMessage={errors.barbershop?.state_province_region?.message}
                      />
                    )}
                  />
                </div>

                <div className="flex w-full gap-4">
                  <Controller
                    name="barbershop.country"
                    control={control}
                    defaultValue={city}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Country"
                        placeholder="Enter Country"
                        labelPlacement="outside"
                        fullWidth
                        bordered
                        size="md"
                        value={field.value} // Controlled value from field
                        onChange={(e) => {
                          field.onChange(e); // Update react-hook-form state
                          setCountry(e.target.value);
                        }}
                        isInvalid={!!errors.barbershop?.country}
                        errorMessage={errors.barbershop?.country?.message}
                      />
                    )}
                  />

                  <Controller
                    name="barbershop.postal_zip_code"
                    control={control}
                    defaultValue={city}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="ZIP Code"
                        placeholder="Enter Zip Code"
                        labelPlacement="outside"
                        fullWidth
                        bordered
                        size="md"
                        value={field.value} // Controlled value from field
                        onChange={(e) => {
                          field.onChange(e); // Update react-hook-form state
                          setPostalZipCode(e.target.value);
                        }}
                        isInvalid={!!errors.barbershop?.postal_zip_code}
                        errorMessage={errors.barbershop?.postal_zip_code?.message}
                      />
                    )}
                  />
                </div>

                {/* socmed */}
                <h2 className="pt-4 font-semibold">Social Media</h2>

                <div className="flex flex-col w-full gap-4">
                  <Input
                    label="Facebook"
                    placeholder="Enter Facebook URL"
                    labelPlacement="outside"
                    fullWidth
                    bordered
                    size="md"
                    onChange={(e) => {
                      handleSocialMediaChange("facebook", e);
                    }}
                  />

                  <Input
                    label="Instagram"
                    placeholder="Enter Instagram URL"
                    labelPlacement="outside"
                    fullWidth
                    bordered
                    size="md"
                    onChange={(e) => {
                      handleSocialMediaChange("instagram", e);
                    }}
                  />

                  <Input
                    label="Tik-Tok"
                    placeholder="Enter Tik-Tok URL"
                    labelPlacement="outside"
                    fullWidth
                    bordered
                    size="md"
                    onChange={(e) => {
                      handleSocialMediaChange("tiktok", e);
                    }}
                  />
                </div>
              </div>
            </div>
          </CardBody>

          <CardFooter className="w-full justify-end pb-8 pt-8 px-10">
            <Button
              type="button"
              className="bg-slate-700 text-white px-12"
              size="md"
              onPress={handleNext}
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card className="w-full h-full flex flex-col" shadow="none">
          <CardHeader className="sticky top-0 z-10 bg-white shadow-md py-6 flex-col justify-start items-start px-12">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Applicant Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal details and application.
            </p>
          </CardHeader>

          <CardBody className="flex-1 overflow-y-auto p-4">
            <FormResults data={getValues()} />
          </CardBody>

          <CardFooter className="sticky bottom-0 z-10 bg-white  w-full justify-end pb-8 pt-8 px-10 gap-16 border-t-2">
            <div className="flex flex-col gap-6 w-full justify-end">
              <div className="flex justify-end px-8">
                <CheckboxGroup>
                  <Checkbox
                    id="terms"
                    name="terms"
                    label="I agree with the terms and conditions"
                    onChange={(e) => {
                      setAgreement(e.target.checked);
                    }}
                  >
                    I agree with the terms and conditions
                  </Checkbox>
                </CheckboxGroup>
              </div>

              <div className="flex justify-between px-8">
                <Button variant="bordered" size="md" onPress={handlePrev}>
                  Back to Form
                </Button>
                <Button
                  type="submit"
                  className="bg-slate-700 text-white px-12"
                  isDisabled={!agreement}
                  size="md"
                  disabled={!agreement}
                >
                  Submit
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </form>
  );
}
