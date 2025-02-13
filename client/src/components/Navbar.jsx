import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export const Navbar = () => {
  return (
    <nav className="h=16 p-2">
      <div className="flex justify-between items-center mx-5">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold"
        >
          NEWSAI
        </motion.h1>

        <ul className="flex gap-4 font-semibold">
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

        <div>
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
    </nav>
  );
};
