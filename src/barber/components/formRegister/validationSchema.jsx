import { z } from 'zod';

const validationSchema = z.object({
  barbershop: z.object({
    name: z.string().min(1, "Barbershop name is required"),
    contact_number: z.string().min(1, "Contact number is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Password must be at least 6 characters"),
    street_address: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state_province_region: z.string().min(1, "State/Province/Region is required"),
    postal_zip_code: z.string().min(1, "Postal/ZIP code is required"),
    country: z.string().min(1, "Country is required"),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    description: z.string().optional(),
  }).refine((data) => data.confirm_password === data.password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  }).transform((data) => {
    const { confirm_password, ...rest } = data;
    return rest;
  })
  
  
  ,
  operational_hours: z.array(z.object({
    day: z.string().min(1, "Day is required"),
    opening_time: z.string().min(1, "Opening time is required"),
    closing_time: z.string().min(1, "Closing time is required"),
  })).min(1, "At least one operational hour is required"),
  services: z.array(z.object({
    service_name: z.string().min(1, "Service name is required"),
    price: z.string().min(1, "Price is required"),
  })).min(1, "At least one service is required"),
  social_media: z.array(z.object({
    platform_name: z.string().min(1, "Platform name is required"),
    platform_url: z.string().optional(),
  })).optional(),

});

export default validationSchema;
