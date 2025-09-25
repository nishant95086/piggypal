import React, { useState } from "react";
import { motion } from "framer-motion";
import { addIncome } from "../api/incomeApi";

const AddIncome = ({ onAdd }) => {
  const [formData, setFormData] = useState({ amount: ""});

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount) return;

    try {
      const payload = {
        amount: Number(formData.amount),
      };

      const res = await addIncome(payload);
      if (onAdd) onAdd(res.data || res);
      setFormData({ amount: ""});
    } catch (err) {
      console.error("Error adding income:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#EDE9FE] p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto"
    >
      <h2 className="text-black text-lg font-semibold text-center mb-4">
        Enter Your Income & Pocket Money 💵
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <motion.input
          whileFocus={{ scale: 1.03 }}
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-purple-200 focus:outline-none"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-6 py-2 cursor-pointer rounded-lg bg-purple-500 font-medium text-white shadow-md hover:bg-purple-600"
        >
          Add
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddIncome;
