import React, { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const Login = () => {
  const LoginSchema = z.object({
    email: z
      .string() 
      .min(1, { message: "Email is Required" })
      .email("This is not a valid email."),

    password: z.string()
            .min(1, { message: "Password is Required" })
  });

  const [isEyeClick, setIsEyeClick] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const handleEyeClick = () => {
    setIsEyeClick(!isEyeClick);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-96 bg-white rounded-2xl p-4 shadow-md"
      >
        <h1 className="font-semibold text-2xl text-center mb-4">
          Welcome Back
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 items-center">
            <Mail className="text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Enter Email..."
              className="focus:outline-none border-b border-gray-200 w-full"
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <div className="flex gap-2 relative items-center">
            <Lock className="text-gray-500" size={20} />
            <div
              onClick={handleEyeClick}
              className="absolute right-2 text-gray-500"
            >
              {isEyeClick ? <Eye size={18} /> : <EyeOff size={18} />}
            </div>
            <input
              type={isEyeClick ? "text" : "password"}
              placeholder="Enter Password..."
              className="focus:outline-none border-b border-gray-200 w-full"
              {...register("password")}
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <Button type="submit" fullWidth className="mb-6">
            Login
          </Button>
        </form>

        <p className="text-center text-gray-700">
          Don't have account ?{" "}
          <Link className="text-sky-500 hover:underline" to="/register">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
