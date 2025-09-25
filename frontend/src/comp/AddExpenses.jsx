import React, { useState } from "react";
import { motion } from "framer-motion";
import { addInvestment } from "../api/investmentApi";
import { useNavigate } from "react-router-dom";
const AddExpenses = ({ onAdd }) => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({ amount: "", work: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.work || !formData.amount) return;

    try {
      const res = await addInvestment(formData); 
      if (onAdd) onAdd(res); 
      setFormData({ work: "", amount: "" });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#FBCFE8] p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto"
    >
      <h2 className="text-black text-lg font-semibold text-center mb-4">
        Enter Your Expenses & Investment 💸
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <motion.input
          whileFocus={{ scale: 1.03 }}
          type="text"
          name="work"
          placeholder="Enter your work"
          value={formData.work}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-pink-100 focus:outline-none"
        />
        <motion.input
          whileFocus={{ scale: 1.03 }}
          type="number"
          name="amount"
          placeholder="Enter your amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-pink-100 focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-6 py-2 rounded-lg cursor-pointer bg-pink-500 font-medium text-white shadow-md hover:bg-pink-600"
        >
          Add
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddExpenses;
