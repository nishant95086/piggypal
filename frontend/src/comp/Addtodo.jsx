import React, { useState } from "react";
import { motion } from "framer-motion";
import { addTodo } from "../api/todoApi";

const AddTodo = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    work: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.work || !formData.deadline) return;
    const res = await addTodo(formData); // call API
    if (onAdd) onAdd(res.data);
    setFormData({ work: "", deadline: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#DCFCE7] p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto"
    >
      <h2 className="text-black text-lg font-semibold text-center mb-4">
        Enter Your To-Do📝
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Wish Name */}
        <motion.input
          whileFocus={{ scale: 1.03 }}
          type="text"
          name="work"
          placeholder="Enter your work"
          value={formData.work}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-green-200 focus:outline-none"
        />

        {/* Wish Link */}
        <motion.input
          whileFocus={{ scale: 1.03 }}
          type="date"
          name="deadline"
          placeholder="Enter deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-green-200 focus:outline-none"
        />

        {/* Add Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-6 py-2 rounded-lg bg-green-500 font-medium text-white shadow-md hover:bg-green-600"
        >
          Add
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddTodo;
