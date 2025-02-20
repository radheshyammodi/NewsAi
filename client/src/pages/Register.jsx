import React, { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Button, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../redux/Slices/authSlice";
import {useDispatch, useSelector} from "react-redux"

export const Register = () => {

  const dispatch = useDispatch()
  const {loading} = useSelector((state)=>state.auth)

  const RegisterSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is required." }),

    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email("This is not a valid email."),

    password: z.string()
          .min(1, { message: "Password is required." }),

    confirmPassword: z.string()
              .min(1, { message: "Please confirm Password." }),
  });

  const [isEyeClick, setIsEyeClick] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterSchema) });

  const handleEyeClick = () => {
    setIsEyeClick(!isEyeClick);
  };

  const onSubmit = (data) => {
    dispatch(signUp(data))
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-96 bg-white rounded-2xl p-4 shadow-md"
      >
        <h1 className="font-semibold text-2xl text-center mb-2">
          Welcome to the NEWSAI
        </h1>

        <p className="text-md text-center mb-4 text-gray-700 font-semibold">
          Create a new account
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 items-center border-b border-gray-200">
            <User className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              className="focus:outline-none w-full"
              {...register("name")}
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <div className="flex gap-2 items-center border-b border-gray-200 ">
            <Mail className="text-gray-400 mr-2" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              className="focus:outline-none w-full"
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <div className="flex gap-2 relative items-center border-b border-gray-200 ">
            <Lock className="text-gray-400 mr-2" size={18} />
            <div
              onClick={handleEyeClick}
              className="absolute right-2 text-gray-400"
            >
              {isEyeClick ? <Eye size={18} /> : <EyeOff size={18} />}
            </div>
            <input
              type={isEyeClick ? "text" : "password"}
              placeholder="Password"
              className="focus:outline-none w-full"
              {...register("password")}
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <div className="flex gap-2 relative items-center border-b border-gray-200 ">
            <Lock className="text-gray-400 mr-2" size={18} />
            <div
              onClick={handleEyeClick}
              className="absolute right-2 text-gray-400"
            >
              {isEyeClick ? <Eye size={18} /> : <EyeOff size={18} />}
            </div>
            <input
              type={isEyeClick ? "text" : "password"}
              placeholder="Confirm Password"
              className="focus:outline-none w-full"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

          <Button type="submit" fullWidth className="mb-6">
          {loading ? <Loader size={16} color="white"/> : "Register"}
          </Button>
        </form>

        <p className="text-center text-gray-700">
          Already have account ?{" "}
          <Link className="text-sky-500 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
