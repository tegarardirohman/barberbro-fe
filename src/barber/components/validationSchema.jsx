import { z } from "zod";

const validationSchema = z.object({
  barbershopName: z.string().min(1, "Barbershop name is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  emailAddress: z.string().email("Invalid email address"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  stateProvinceRegion: z.string().min(1, "State/Province/Region is required"),
  postalCode: z.string().min(1, "Postal/ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  mapLocation: z.string().min(1, "Map location is required"),
  operatingHours: z.array(z.object({
    day: z.string().min(1),
    openingTime: z.string().min(1),
    closingTime: z.string().min(1),
  })).nonempty("Operating hours are required"),
  holidayClosedDays: z.array(z.string()).optional(),
  listOfServices: z.array(z.object({
    serviceName: z.string().min(1),
    description: z.string().min(1),
  })).nonempty("At least one service is required"),
  priceRange: z.string().min(1, "Price range is required"),
  availableFacilities: z.array(z.string()).optional(),
  specialties: z.string().optional(),
  barbershopLogo: z.instanceof(File).optional(),
  galleryImages: z.array(z.instanceof(File)).optional(),
  promotionalVideo: z.string().url().optional(),
  socialMediaLinks: z.object({
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }).optional(),
  description: z.string().optional(),
  promotions: z.string().optional(),
  additionalNotes: z.string().optional(),
  termsAndConditions: z.boolean().refine(val => val, "You must agree to the terms and conditions"),
});

export default validationSchema
