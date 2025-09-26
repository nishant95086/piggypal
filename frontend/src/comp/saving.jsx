import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "./Button";
import AddSaving from "./AddSaving";
import { deleteSaving, updateSaving } from "../api/savingApi";

const SavingList = ({ data = [], onDelete, onEdit, onAdd }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ amount: "", date: "" });

  const totalAmount = data.reduce(
    (sum, saving) => sum + Number(saving.amount || 0),
    0
  );

  const handleDelete = async (id) => {
    try {
      await deleteSaving(id);
      if (onDelete) await onDelete(id);
    } catch (error) {
      console.error("Error deleting saving:", error);
    }
  };

  const handleEditClick = (saving) => {
    setEditingId(saving._id);
    setEditForm({
      amount: saving.amount,
      date: saving.date ? saving.date.split("T")[0] : "",
    });
  };

  const handleSave = async (id) => {
    try {
      const payload = {
        amount: Number(editForm.amount),
        date: new Date(editForm.date).toISOString(),
      };
      const res = await updateSaving(id, payload);
      const updatedSaving = res.data || res;
      if (onEdit) onEdit(updatedSaving);

      setEditingId(null);
      setEditForm({ amount: "", date: "" });
    } catch (error) {
      console.error("Error updating saving:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ amount: "", date: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">My Savings 💰</h2>
        <div className="bg-white bg-opacity-20 text-black px-3 py-1 rounded-full text-sm">
          {data.length} {data.length === 1 ? "item" : "items"}
        </div>
      </div>

      {/* Total */}
      {data.length > 0 && (
        <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between rounded-t-lg">
          <span className="text-gray-700 font-medium">Total Saving:</span>
          <span className="font-bold text-yellow-600">
            ₹{totalAmount.toLocaleString()}
          </span>
        </div>
      )}

      {/* Items */}
      <div className="p-6 space-y-3 max-h-60 md:max-h-80 overflow-auto">
        {data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No savings yet. Start tracking your money!</p>
          </div>
        ) : (
          <AnimatePresence>
            {data.map((saving) => (
              <motion.div
                key={saving._id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 hover:bg-gray-200 rounded-xl p-4 border border-gray-100 flex justify-between items-center"
              >
                {editingId === saving._id ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center w-full">
                    {/* Amount */}
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) =>
                        setEditForm({ ...editForm, amount: e.target.value })
                      }
                      className="md:col-span-4 border p-2 rounded"
                      placeholder="Amount"
                    />
                    {/* Date */}
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) =>
                        setEditForm({ ...editForm, date: e.target.value })
                      }
                      className="md:col-span-4 border p-2 rounded"
                    />
                    <div className="md:col-span-4 flex justify-center space-x-3">
                      <button
                        onClick={() => handleSave(saving._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between flex-wrap gap-2 text-[12px] md:text-sm items-center">
                    <div className=" text-gray-800">
                      ₹{Number(saving.amount).toLocaleString()}
                    </div>
                    <div className=" text-gray-600">
                      {saving.date
                        ? new Date(saving.date).toLocaleDateString()
                        : "-"}
                    </div>
                    <div className=" flex space-x-5">
                      <button
                        onClick={() => handleEditClick(saving)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(saving._id)}
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
      <div className="mb-5">
        <CustomButton
          label="Add Saving"
          color="#F59E0B"
          FormComponent={AddSaving}
          onAdd={onAdd}
        />
      </div>
    </div>
  );
};

export default SavingList;
