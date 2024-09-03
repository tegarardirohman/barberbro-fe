import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { FaMailBulk, FaLock, FaEye } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { FaEyeLowVision, FaLockOpen } from "react-icons/fa6";
import logoBlack from "../../assets/images/logo-black.png";

export default function ModalLogin({ props }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { user, error, loading, login, register, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    remember: z.boolean(),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    try {
      const res = await login(data.email, data.password, data.remember);

      if(res === "success") {
        alert("Login successful");
        onClose();
      } else {
        form.setError("email", { type: "manual", message: res || "Login failed" });
      }

    } catch (e) {
      console.error("Login failed:", e);
    }
  };


  return (
    <>
      <Button
        onPress={onOpen}
        className={`bg-transparent px-0 font-bold ${
          props ? "text-black" : "text-white"
        }`}
      >
        LOGIN
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        backdrop="opaque"
        radius="none"
        size="xl"
        className="px-6 py-6"
      >
        <ModalContent>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <ModalHeader className="flex flex-col gap-1">
              <img src={logoBlack} alt="logo" className="w-44 m-auto -my-12" />
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-sm">Login to your account</p>
            </ModalHeader>
            <ModalBody>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    autoFocus
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
                    type={showPassword ? "text" : "password"}
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    endContent={
                      <>
                        <Button
                          variant="light"
                          onPress={() => setShowPassword((prev) => !prev)}
                          className="bg-transparent px-0"
                        >
                          {showPassword ? <FaEye /> : <FaEyeLowVision/>}
                        </Button>
                      </>
                    }
                    label="Password"
                    placeholder="Enter your password"
                    variant="bordered"
                  />
                )}
              />

              <div className="flex py-2 px-1 justify-between">
                <Controller
                  name="remember"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox {...field} className="text-sm">
                      Remember me
                    </Checkbox>
                  )}
                />

                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
            </ModalBody>
            <ModalFooter className="gap-8">
              <Button color="default" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                color="default"
                variant="flat"
                className="bg-slate-900 text-white px-8"
              >
                Sign in
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
