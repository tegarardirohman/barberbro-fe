import { z } from 'zod';

const validationSchema = z.object({
  barbershop: z.object({
    name: z.string().min(1, "Barbershop name is required"),
    contact_number: z.string().min(7, "Contact number is required").max(15, "Contact number is too long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string().min(8, "Password must be at least 8 characters"),
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
  }),
  
  operational_hours: z.array(
    z.object({
      day: z.string().min(1, "Day is required"),
      opening_time: z.string().min(1, "Opening time is required"),
      closing_time: z.string().min(1, "Closing time is required"),
      limit_per_session: z.number().min(1, "Limit per session is required"),
    }).refine((data) => {
      const [openingHour] = data.opening_time.split(':').map(Number);
      const [closingHour] = data.closing_time.split(':').map(Number);
      return closingHour >= openingHour + 1;
    }, {
      message: "Closing time must be at least 1 hour after opening time",
      path: ["closing_time"],
    })
  ).min(1, "At least one operational hour is required"),

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
