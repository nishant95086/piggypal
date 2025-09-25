import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "./Button";
import AddUdhar from "./AddUdhar";
import { updateUdhar, deleteUdhar } from "../api/udharApi";

const UdharList = ({ data = [], onDelete, onEdit, onAdd }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", amount: "", date: "" });

  const totalAmount = data.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

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
      const payload = {
        name: editForm.name,
        amount: editForm.amount,
        date: editForm.date,
      };
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
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-lg font-semibold text-white">Udhar List 🤝</h2>
        <div className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
          {data.length} {data.length === 1 ? "item" : "items"}
        </div>
      </div>

      {/* Total */}
      {data.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center flex-wrap text-base">
          <span className="text-gray-700 font-medium">Total Udhar:</span>
          <span className="font-bold text-orange-600">
            ₹{totalAmount.toLocaleString()}
          </span>
        </div>
      )}

      {/* Items */}
      <div className="p-4 space-y-3 max-h-64 md:max-h-80 overflow-y-auto">
        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No udhars yet. Add an entry to get started!
          </div>
        ) : (
          <AnimatePresence>
            {data.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border border-gray-100"
              >
                {editingId === item._id ? (
                  <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-12 gap-3 items-center">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="col-span-4 border p-2 rounded w-full"
                      placeholder="Name"
                    />
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) =>
                        setEditForm({ ...editForm, amount: e.target.value })
                      }
                      className="col-span-3 border p-2 rounded w-full"
                      placeholder="Amount"
                    />
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) =>
                        setEditForm({ ...editForm, date: e.target.value })
                      }
                      className="col-span-3 border p-2 rounded w-full"
                    />
                    <div className="col-span-2 flex justify-center space-x-2">
                      <button
                        onClick={() => handleSave(item._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-12 gap-3 items-center text-sm md:text-base">
                    <div className="col-span-4 font-medium break-words">
                      {item.name}
                    </div>
                    <div className="col-span-3 text-orange-700">
                      ₹{Number(item.amount).toLocaleString()}
                    </div>
                    <div className="col-span-3 text-gray-600">
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "-"}
                    </div>
                    <div className="col-span-2 flex space-x-4 justify-start md:justify-center">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Add Button */}
      <div className="p-4">
        <CustomButton
          label="Add Udhar"
          color="#EF4444"
          FormComponent={AddUdhar}
          onAdd={onAdd}
        />
      </div>
    </div>
  );
};

export default UdharList;
