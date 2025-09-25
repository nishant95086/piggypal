import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "./Button";
import AddUdhar from "./AddUdhar";
import { updateUdhar, deleteUdhar } from "../api/udharApi";

const UdharList = ({ data = [], onDelete, onEdit, onAdd }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", amount: "", date: "" });

  const totalAmount = data.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditForm({
      name: item.name,
      amount: item.amount,
      date: item.date ? item.date.split("T")[0] : "",
    });
  };

  const handleSave = async (_id) => {
    try {
      const payload = { name: editForm.name, amount: editForm.amount, date: editForm.date };
      await updateUdhar(_id, payload);
      if (onEdit) await onEdit({ ...payload, _id });
      setEditingId(null);
      setEditForm({ name: "", amount: "", date: "" });
    } catch (err) {
      console.error("Error updating Udhar:", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ name: "", amount: "", date: "" });
  };

  const handleDelete = async (_id) => {
    try {
      await deleteUdhar(_id);
      if (onDelete) await onDelete(_id);
    } catch (err) {
      console.error("Error deleting Udhar:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Udhar List 🤝</h2>
        <div className="bg-white bg-opacity-20 text-black px-3 py-1 rounded-full text-sm">
          {data.length} items
        </div>
      </div>

      {/* Total */}
      {data.length > 0 && (
        <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between rounded-t-lg">
          <span className="text-gray-700 font-medium">Total Udhar:</span>
          <span className="font-bold text-orange-600">₹{totalAmount.toLocaleString()}</span>
        </div>
      )}

      {/* Items */}
      <div className="p-6 space-y-3 max-h-60 md:max-h-80 overflow-auto">
        {data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No udhars yet. Add an entry to get started!</p>
          </div>
        ) : (
          <AnimatePresence>
            {data.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 hover:bg-gray-200 rounded-xl p-4 border border-gray-100 flex justify-between items-center"
              >
                {editingId === item._id ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center w-full">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="md:col-span-4 border p-2 rounded"
                    />
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                      className="md:col-span-3 border p-2 rounded"
                    />
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      className="md:col-span-3 border p-2 rounded"
                    />
                    <div className="md:col-span-2 flex justify-center space-x-3">
                      <button
                        onClick={() => handleSave(item._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="md:col-span-4">{item.name}</div>
                    <div className="md:col-span-3">₹{Number(item.amount).toLocaleString()}</div>
                    <div className="md:col-span-3">{item.date ? new Date(item.date).toLocaleDateString() : "-"}</div>
                    <div className="md:col-span-2 flex space-x-5">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-blue-600 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Add Button */}
      <div className="mb-5">
        <CustomButton label="Add Udhar" color="#EF4444" FormComponent={AddUdhar} onAdd={onAdd} />
      </div>
    </div>
  );
};

export default UdharList;
