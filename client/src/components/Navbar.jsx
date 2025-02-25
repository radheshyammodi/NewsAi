import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@mantine/core";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { ProfileDropDown } from "./ProfileDropDown";

export const Navbar = () => {

  const {authenticated}= useSelector((state)=>state.auth)

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="h=16 p-2 sticky top-0 bg-white">
      <div className="flex justify-between items-center mx-5">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold"
        >
          NEWSAI
        </motion.h1>

        <ul className="hidden md:flex gap-4 font-semibold">
          {["Home", "Categories", "Channels", "About"].map((item) => (
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: "100" }}
              className="hover:text-gray-400"
              key={item}
            >
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center justify-center">

        {!authenticated && 
        <div className="flex gap-2">
          <Link to="/login" className="hidden md:block">
            <Button variant="white">Login</Button>
          </Link>
          <Link to="/register" className="hidden md:block">
            <Button variant="white">Register</Button>
          </Link></div>
          }

          {authenticated && <ProfileDropDown/>}

          <button className="md:hidden" onClick={handleClick}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && <div className="flex justify-center">

        <ul className="md:hidden flex flex-col gap-4 font-semibold">
          {["Home", "Categories", "Channels", "About"].map((item) => (
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: "100" }}
              className="hover:text-gray-400"
              key={item}
            >
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
            </motion.li>
          ))}
        </ul>

        <Link to="/login" className="md:hidden block" >
            <Button variant="white">Login</Button>
          </Link>
          <Link to="/register" className="md:hidden block">
            <Button variant="white">Register</Button>
          </Link>

      </div>}
    </nav>
  );
};
