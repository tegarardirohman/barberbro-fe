import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { FaLock, FaMailBulk } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../context/AuthContext";
import logoGold from "../../assets/images/logo-gold.png";
import { Link } from "react-router-dom";

const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string()
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      path: ["confirmPassword"],
      message: "Passwords don't match",
      code: z.ZodIssueCode.custom,
    });
  }
});

export default function ModalRegister({ props }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { request } = useAxios();

  const { user, error, loading, login, register, logout } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data) => {
    try {
      await register(data.email, data.password);
      onClose();
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  };

  const handleSwitch = () => {
    onClose();
    onOpenChange();
  }

  return (
    <>
      <Button onPress={onOpen} variant="bordered" className={`bg-transparent px-6 font-bold ${props ? 'text-black' : 'text-white'}`}>
        SIGN UP
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        backdrop="opaque"
        radius="none"
        className="px-6 py-4"
        size="5xl"
      >
        <ModalContent className="flex flex-row justify-between">
          <div className=" bg-black w-full">
            <img src={ logoGold } alt="barber" className="w-full h-full object-cover" />
          </div>

          <div className="w-full">
            <form onSubmit={form.handleSubmit(handleRegister)}>
              <ModalHeader className="flex flex-col gap-1 text-2xl font-bold">Sign Up</ModalHeader>
              <ModalBody>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      autoFocus
                      endContent={<FaMailBulk />}
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                      isInvalid={Boolean(fieldState.error)}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      endContent={<FaLock />}
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                      isInvalid={Boolean(fieldState.error)}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      endContent={<FaLock />}
                      label="Confirm Password"
                      placeholder="Retype your password"
                      type="password"
                      variant="bordered"
                      isInvalid={Boolean(fieldState.error)}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
              </ModalBody>
              <ModalFooter className="block">
                <div className="flex w-full flex-col gap-4 justify-end">
                  <Button size="lg" type="submit" variant="solid" className="bg-slate-800 text-white px-8 w-full">
                    Sign Up
                  </Button>

                  <Button size="lg" variant="bordered" onPress={onClose}>
                    Already have an account? Sign In
                  </Button>

                </div>

              </ModalFooter>
            </form>

          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
