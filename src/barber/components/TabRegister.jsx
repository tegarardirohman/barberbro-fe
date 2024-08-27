import React from "react";
import { Tabs, Tab, Card, CardBody, Button, Input, Textarea, Select, Checkbox, Divider, SelectItem } from "@nextui-org/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import validationSchema  from "./validationSchema"; 
import { Link } from "react-router-dom";

export default function TabRegister() {
  const { control, handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const { fields: operatingHoursFields, append: appendOperatingHour, remove: removeOperatingHour } = useFieldArray({
    control,
    name: "operatingHours",
  });

  const { fields: listOfServicesFields, append: appendService, remove: removeService } = useFieldArray({
    control,
    name: "listOfServices",
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div className="flex flex-col relative">
      {/* <Button as={Link} to={'/'} size="md" className="absolute top-3 left-3 z-10">Cancel</Button> */}

      <form className="w-full p-4" onSubmit={handleSubmit(onSubmit)}>
        <Tabs aria-label="Options" placement="right" initialValue="account" className="w-full flex justify-end">

          <Tab key="account" title="Account">
            <Card className="w-full" shadow="none">
              <CardBody className="p-0 flex gap-4">
                <h2 className="text-xl font-bold">Account Information</h2>
                
                <Input
                  {...register("barbershopName")}
                  placeholder="Enter barbershop name"
                  isInvalid={!!errors.barbershopName}
                  label="Barbershop Name"
                />
                {errors.barbershopName && <p>{errors.barbershopName.message}</p>}
                
                <Input
                  {...register("contactNumber")}
                  type="tel"
                  placeholder="Enter contact number"
                  isInvalid={!!errors.contactNumber}
                  label="Contact Number"
                />
                {errors.contactNumber && <p>{errors.contactNumber.message}</p>}
                
                <Input
                  {...register("emailAddress")}
                  type="email"
                  placeholder="Enter business email address"
                  isInvalid={!!errors.emailAddress}
                  label="Email Address"
                />
                {errors.emailAddress && <p>{errors.emailAddress.message}</p>}

                <label className="block mb-2">Barbershop Logo:</label>
                <Input type="file" {...register('barbershopLogo')} />
                {errors.barbershopLogo && <p>{errors.barbershopLogo.message}</p>}
                
                <label className="block mb-2">Gallery Images:</label>
                <Input type="file" {...register('galleryImages')} multiple />
                {errors.galleryImages && <p>{errors.galleryImages.message}</p>}
                
                
              </CardBody>
            </Card>
          </Tab>

          <Tab key="detil" title="Detil">
            <Card className="w-full" shadow="none">
              <CardBody className="p-0 flex gap-4">
              <Input
                  {...register("streetAddress")}
                  placeholder="Enter street address"
                  isInvalid={!!errors.streetAddress}
                />
                {errors.streetAddress && <p>{errors.streetAddress.message}</p>}
                
                <Input
                  {...register("city")}
                  placeholder="Enter city name"
                  isInvalid={!!errors.city}
                />
                {errors.city && <p>{errors.city.message}</p>}
                
                <Input
                  {...register("stateProvinceRegion")}
                  placeholder="Enter state, province, or region"
                  isInvalid={!!errors.stateProvinceRegion}
                />
                {errors.stateProvinceRegion && <p>{errors.stateProvinceRegion.message}</p>}
                
                <Input
                  {...register("postalCode")}
                  placeholder="Enter postal or ZIP code"
                  isInvalid={!!errors.postalCode}
                />
                {errors.postalCode && <p>{errors.postalCode.message}</p>}
                
                <Select
                  {...register("country")}
                  placeholder="Select country"
                  isInvalid={!!errors.country}
                >
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>



                </Select>
                {errors.country && <p>{errors.country.message}</p>}
                
                <Input
                  {...register("mapLocation")}
                  placeholder="Pin your barbershop location on the map"
                  isInvalid={!!errors.mapLocation}
                />
                {errors.mapLocation && <p>{errors.mapLocation.message}</p>}
                
                {/* Operating Hours */}
                {operatingHoursFields.map((item, index) => (
                  <div key={item.id} className="mb-4">
                    <Input
                      {...register(`operatingHours.${index}.day`)}
                      placeholder="Day of the week"
                      isInvalid={!!errors.operatingHours?.[index]?.day}
                    />
                    {errors.operatingHours?.[index]?.day && <p>{errors.operatingHours[index]?.day?.message}</p>}
                    
                    <Input
                      {...register(`operatingHours.${index}.openingTime`)}
                      placeholder="Opening Time"
                      isInvalid={!!errors.operatingHours?.[index]?.openingTime}
                    />
                    {errors.operatingHours?.[index]?.openingTime && <p>{errors.operatingHours[index]?.openingTime?.message}</p>}
                    
                    <Input
                      {...register(`operatingHours.${index}.closingTime`)}
                      placeholder="Closing Time"
                      isInvalid={!!errors.operatingHours?.[index]?.closingTime}
                    />
                    {errors.operatingHours?.[index]?.closingTime && <p>{errors.operatingHours[index]?.closingTime?.message}</p>}
                    
                    <Button type="button" onClick={() => removeOperatingHour(index)}>Remove</Button>
                  </div>
                ))}
                <Button type="button" onClick={() => appendOperatingHour({ day: "", openingTime: "", closingTime: "" })}>
                  Add Operating Hour
                </Button>
                
                {/* List of Services */}
                {listOfServicesFields.map((item, index) => (
                  <div key={item.id} className="mb-4">
                    <Input
                      {...register(`listOfServices.${index}.serviceName`)}
                      placeholder="Service Name"
                      isInvalid={!!errors.listOfServices?.[index]?.serviceName}
                    />
                    {errors.listOfServices?.[index]?.serviceName && <p>{errors.listOfServices[index]?.serviceName?.message}</p>}
                    
                    <Textarea
                      {...register(`listOfServices.${index}.description`)}
                      placeholder="Service Description"
                      isInvalid={!!errors.listOfServices?.[index]?.description}
                    />
                    {errors.listOfServices?.[index]?.description && <p>{errors.listOfServices[index]?.description?.message}</p>}
                    
                    <Button type="button" onClick={() => removeService(index)}>Remove</Button>
                  </div>
                ))}
                <Button type="button" onClick={() => appendService({ serviceName: "", description: "" })}>
                  Add Service
                </Button>
                
                <Input
                  {...register("priceRange")}
                  placeholder="Enter price range"
                  isInvalid={!!errors.priceRange}
                />
                {errors.priceRange && <p>{errors.priceRange.message}</p>}
                
                <Select
                  {...register("availableFacilities")}
                  placeholder="Select facilities"
                  isInvalid={!!errors.availableFacilities}
                  multiple
                >
                  <SelectItem value="WiFi">WiFi</SelectItem>
                  <SelectItem value="Parking">Parking</SelectItem>
                  {/* Add more options as needed */}
                </Select>
                {errors.availableFacilities && <p>{errors.availableFacilities.message}</p>}
                
                <Input
                  {...register("specialties")}
                  placeholder="Enter specialties"
                  isInvalid={!!errors.specialties}
                />
                {errors.specialties && <p>{errors.specialties.message}</p>}
                
               
               </CardBody>
            </Card>
          </Tab>

          <Tab key="last" title="Last">
                <Card className="w-full" shadow="none">
                  <CardBody className="w-full flex gap-4 p-0">

                
                <Input
                  {...register("promotionalVideo")}
                  placeholder="Enter promotional video URL"
                  isInvalid={!!errors.promotionalVideo}
                />
                {errors.promotionalVideo && <p>{errors.promotionalVideo.message}</p>}
                
                <Input
                  {...register("socialMediaLinks.facebook")}
                  placeholder="Facebook URL"
                  isInvalid={!!errors.socialMediaLinks?.facebook}
                />
                {errors.socialMediaLinks?.facebook && <p>{errors.socialMediaLinks.facebook.message}</p>}
                
                <Input
                  {...register("socialMediaLinks.instagram")}
                  placeholder="Instagram URL"
                  isInvalid={!!errors.socialMediaLinks?.instagram}
                />
                {errors.socialMediaLinks?.instagram && <p>{errors.socialMediaLinks.instagram.message}</p>}
                
                <Input
                  {...register("socialMediaLinks.twitter")}
                  placeholder="Twitter URL"
                  isInvalid={!!errors.socialMediaLinks?.twitter}
                />
                {errors.socialMediaLinks?.twitter && <p>{errors.socialMediaLinks.twitter.message}</p>}
                
                <Textarea
                  {...register("description")}
                  placeholder="Enter description"
                  isInvalid={!!errors.description}
                />
                {errors.description && <p>{errors.description.message}</p>}
                
                <Textarea
                  {...register("promotions")}
                  placeholder="Enter promotions"
                  isInvalid={!!errors.promotions}
                />
                {errors.promotions && <p>{errors.promotions.message}</p>}
                
                <Textarea
                  {...register("additionalNotes")}
                  placeholder="Additional notes"
                  isInvalid={!!errors.additionalNotes}
                />
                {errors.additionalNotes && <p>{errors.additionalNotes.message}</p>}
                
                <Checkbox {...register("termsAndConditions")}>
                  I agree to the terms and conditions
                </Checkbox>
                {errors.termsAndConditions && <p>{errors.termsAndConditions.message}</p>}
                    
                <Button type="submit" className="mt-4">Submit Listing</Button>

                  </CardBody>
                </Card>
            </Tab>
            


          {/* Add other tabs as necessary */}
        </Tabs>

        
      </form>
    </div>
  );
}
