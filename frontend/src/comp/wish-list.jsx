import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deleteWish, updateWish } from "../api/wishApi";
import CustomButton from "./Button";
import AddWish from "./addwish";

const WishList = ({ data = [], onDelete, onEdit, onAdd }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", amount: "", link: "", date: "" });

  const totalAmount = data.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const handleEditClick = (wish) => {
    setEditingId(wish._id);
    setEditForm({
      name: wish.name,
      amount: wish.amount,
      link: wish.link || "",
      date: wish.date ? wish.date.split("T")[0] : "",
    });
  };

  const handleSave = async (_id) => {
    try {
      const payload = { ...editForm };
      const res = await updateWish(_id, payload);
      if (onEdit) onEdit(res);
      setEditingId(null);
      setEditForm({ name: "", amount: "", link: "", date: "" });
    } catch (error) {
      console.error("Error updating wish:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await deleteWish(_id);
      if (onDelete) onDelete(_id);
    } catch (error) {
      console.error("Error deleting wish:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ name: "", amount: "", link: "", date: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-lg font-semibold text-white">Wish List 🎁</h2>
        <div className="bg-white bg-opacity-20 text-black px-3 py-1 rounded-full text-sm">
          {data.length} {data.length === 1 ? "item" : "items"}
        </div>
      </div>

      {/* Total */}
      {data.length > 0 && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center flex-wrap text-base">
          <span className="text-gray-700 font-medium">Total Wishes:</span>
          <span className="font-bold text-blue-600">₹{totalAmount.toLocaleString()}</span>
        </div>
      )}

      {/* Items */}
      <div className="p-4 space-y-3 max-h-64 md:max-h-80 overflow-y-auto">
        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No wishes yet. Add one to get started!
          </div>
        ) : (
          <AnimatePresence>
            {data.map((wish) => (
              <motion.div
                key={wish._id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border border-gray-100"
              >
                {editingId === wish._id ? (
                  <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-12 gap-3 items-center">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="col-span-3 border p-2 rounded w-full"
                      placeholder="Name"
                    />
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                      className="col-span-2 border p-2 rounded w-full"
                      placeholder="Amount"
                    />
                    <input
                      type="text"
                      value={editForm.link}
                      onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                      className="col-span-4 border p-2 rounded w-full"
                      placeholder="Link"
                    />
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      className="col-span-2 border p-2 rounded w-full"
                    />
                    <div className="col-span-1 flex justify-center space-x-2">
                      <button
                        onClick={() => handleSave(wish._id)}
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
                  <div className="flex justify-between flex-wrap gap-2 text-[12px] md:text-sm items-center">
                    <div className=" font-medium break-words">{wish.name}</div>
                    <div className=" text-blue-700">
                      ₹{Number(wish.amount).toLocaleString()}
                    </div>
                    <div className=" truncate">
                      {wish.link ? (
                        <a
                          href={wish.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline break-all"
                        >
                          View
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className=" text-gray-600">
                      {wish.date ? new Date(wish.date).toLocaleDateString() : "-"}
                    </div>
                    <div className=" flex space-x-4 justify-center">
                      <button
                        onClick={() => handleEditClick(wish)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(wish._id)}
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
        <CustomButton label="Add Wish" color="#3B82F6" FormComponent={AddWish} onAdd={onAdd} />
      </div>
    </div>
  );
};

export default WishList;
