// import { Button, Input } from "@nextui-org/react";
// import React, { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import validationSchema from "./formRegister/validationSchema";

// const Step1 = ({ nextStep, handleChange, values, errors, setErrors }) => {
//   const validateStep1 = () => {
//     const newErrors = {};
//     if (!values.barbershopName)
//       newErrors.barbershopName = "Barbershop name is required";
//     if (!values.contactNumber)
//       newErrors.contactNumber = "Contact number is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   return (
//     <div className="w-full h-full">
//       <h2 className="font-extrabold uppercase pb-8">
//         Step 1: Account Information
//       </h2>

//       <div className="flex w-full justify-between gap-4">
//         <div className="w-full">
//           <Input
//             {...register("barbershopName")}
//             placeholder="Enter barbershop name"
//             isInvalid={!!errors.barbershopName}
//             label="Barbershop Name"
//           />
//         </div>

//         <div>test</div>
//       </div>

//       <input
//         type="tel"
//         name="contactNumber"
//         value={values.contactNumber}
//         onChange={handleChange}
//         placeholder="Enter contact number"
//         required
//       />
//       {errors.contactNumber && <p className="error">{errors.contactNumber}</p>}

//       <div className="absolute bottom-0 right-0">
//         <button
//           size="md"
//           type="button"
//           onClick={() => validateStep1() && nextStep()}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// const Step2 = ({
//   nextStep,
//   prevStep,
//   handleChange,
//   values,
//   errors,
//   setErrors,
// }) => {
//   const validateStep2 = () => {
//     const newErrors = {};
//     if (!values.streetAddress)
//       newErrors.streetAddress = "Street address is required";
//     if (!values.city) newErrors.city = "City is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   return (
//     <div className="w-full h-full">
//       <h2>Step 2: Address Details</h2>
//       <input
//         type="text"
//         name="streetAddress"
//         value={values.streetAddress}
//         onChange={handleChange}
//         placeholder="Enter street address"
//         required
//       />
//       {errors.streetAddress && <p className="error">{errors.streetAddress}</p>}
//       <input
//         type="text"
//         name="city"
//         value={values.city}
//         onChange={handleChange}
//         placeholder="Enter city name"
//         required
//       />
//       {errors.city && <p className="error">{errors.city}</p>}

//       <div className="flex w-full justify-between absolute bottom-0 px-0">
//         <Button type="button" onClick={prevStep}>
//           Previous
//         </Button>
//         <Button type="button" onClick={() => validateStep2() && nextStep()}>
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// const Step3 = ({ prevStep, handleChange, values, errors, setErrors }) => {
//   const validateStep3 = () => {
//     const newErrors = {};
//     if (!values.priceRange) newErrors.priceRange = "Price range is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   return (
//     <div>
//       <h2>Step 3: Additional Information</h2>
//       <input
//         type="text"
//         name="specialties"
//         value={values.specialties}
//         onChange={handleChange}
//         placeholder="Enter specialties"
//       />
//       <input
//         type="text"
//         name="priceRange"
//         value={values.priceRange}
//         onChange={handleChange}
//         placeholder="Enter price range"
//         required
//       />
//       {errors.priceRange && <p className="error">{errors.priceRange}</p>}
//       <button type="button" onClick={prevStep}>
//         Previous
//       </button>
//       <button type="submit" onClick={() => validateStep3()}>
//         Submit
//       </button>
//     </div>
//   );
// };

// const MultiStepForm = () => {
//   const [step, setStep] = useState(1);
//   const [formValues, setFormValues] = useState({
//     barbershopName: "",
//     contactNumber: "",
//     streetAddress: "",
//     city: "",
//     specialties: "",
//     priceRange: "",
//   });
//   const [formErrors, setFormErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value,
//     });
//   };

//   const nextStep = () => {
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log("Form submitted:", formValues);
//   };

//   switch (step) {
//     case 1:
//       return (
//         <form onSubmit={handleSubmit}>
//           <Step1
//             nextStep={nextStep}
//             handleChange={handleChange}
//             values={formValues}
//             errors={formErrors}
//             setErrors={setFormErrors}
//           />
//         </form>
//       );
//     case 2:
//       return (
//         <form onSubmit={handleSubmit}>
//           <Step2
//             nextStep={nextStep}
//             prevStep={prevStep}
//             handleChange={handleChange}
//             values={formValues}
//             errors={formErrors}
//             setErrors={setFormErrors}
//           />
//         </form>
//       );
//     case 3:
//       return (
//         <form onSubmit={handleSubmit}>
//           <Step3
//             prevStep={prevStep}
//             handleChange={handleChange}
//             values={formValues}
//             errors={formErrors}
//             setErrors={setFormErrors}
//           />
//         </form>
//       );
//     default:
//       return null;
//   }
// };

// export default MultiStepForm;
