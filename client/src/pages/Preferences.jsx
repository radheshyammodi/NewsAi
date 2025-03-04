import React, { useState } from "react";
import { motion } from "motion/react";
import { CircleCheck } from "lucide-react";
import { Button } from "@mantine/core";
import { Slide } from "react-awesome-reveal";
import { useDispatch } from "react-redux";
import { setPreferences } from "../redux/Slices/newsSlice.js";
import {useNavigate} from "react-router-dom"

export const Preferences = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const categories = [
    "Technology",
    "Politics",
    "Sports",
    "Business",
    "Health",
    "Entertainment",
  ];

  const toggleCategory = (category) => {
    setSelectedCategory(
      selectedCategory.includes(category)
        ? selectedCategory.filter((c) => c !== category)
        : [...selectedCategory, category]
    );
  };

    const handleSavePreferences = async()=>{
      await dispatch(setPreferences({preferences:selectedCategory}))
        navigate('/home')
    }

  return (

    <Slide>
    <div className="h-screen flex flex-col items-center justify-center bg-pink-100">
      <div>
        <h1 className="text-2xl font-semibold text-gray-700">
          Select Your Interests
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
        {categories.map((category) => (
          <motion.div
            whileHover={{ scale:1.1 }}
            whileTap={{ scale: 0.9}}
            transition={{duration:0.5}}
            className={`shadow-md rounded-2xl text-center px-4 py-2 flex justify-center items-center gap-2 ${selectedCategory.includes(category) ? "bg-orange-500 text-white" : "bg-white text-black"}`}
            onClick={() => toggleCategory(category)}
          >
          
            {category}
            {selectedCategory.includes(category) && <CircleCheck/>}
          </motion.div>
        ))}

        <Button onClick={handleSavePreferences}>Save Preferences</Button>
      </div>

      
    </div>
    </Slide>

  );
};
