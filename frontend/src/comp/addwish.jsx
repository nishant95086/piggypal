import React, { useState } from "react";
import { motion } from "framer-motion";
import { addWish } from "../api/wishApi";

const AddWish = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.link || !formData.amount) return;
    const res = await addWish(formData); // call API
    if (onAdd) onAdd(res.data);
    setFormData({ name: "", link: "", amount: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#E0F2FE] p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto"
    >
      <h2 className="text-black text-lg font-semibold text-center mb-4">
        Enter Your Wish🎁
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Wish Name */}
        <motion.input
          whileFocus={{ scale: 1.03 }}
          type="text"
          name="name"
          placeholder="Enter your wish name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-blue-200 focus:outline-none"
        />

        {/* Wish Link */}
        <motion.input
          whileFocus={{ scale: 1.03 }}
          type="text"
          name="link"
          placeholder="Enter your wish link"
          value={formData.link}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-blue-200 focus:outline-none"
        />

        {/* Wish Price */}
        <motion.input
          whileFocus={{ scale: 1.03 }}
          type="number"
          name="amount"
          placeholder="Enter your wish price"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-blue-200 focus:outline-none"
        />

        {/* Add Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-6 py-2 rounded-lg bg-blue-500 font-medium text-white shadow-md hover:bg-blue-600"
        >
          Add
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddWish;
