import React, { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export const Register = () => {
  const [isEyeClick, setIsEyeClick] = useState(false);

  const handleEyeClick = () => {
    setIsEyeClick(!isEyeClick);
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

        <p className="text-md text-center mb-4 text-gray-700 font-semibold">Create a new account</p>

        <form className="space-y-6">

          <div className="flex gap-2 items-center border-b border-gray-200">
            <User className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              className="focus:outline-none w-full"
            />
          </div>

          <div className="flex gap-2 items-center border-b border-gray-200 ">
            <Mail className="text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              className="focus:outline-none w-full"
            />
          </div>

          <div className="flex gap-2 relative items-center border-b border-gray-200 ">
            <Lock className="text-gray-400" size={18} />
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
            />
          </div>

          <div className="flex gap-2 relative items-center border-b border-gray-200 ">
            <Lock className="text-gray-400" size={18} />
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
            />
          </div>

          <Button fullWidth className="mb-6">
            Register
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
