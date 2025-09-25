import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "./Button";
import AddTodo from "./Addtodo";
import { updateTodo, deleteTodo } from "../api/todoApi";

const ToDoList = ({ data = [], onDelete, onEdit, onAdd }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ work: "", deadline: "" });

  const handleEditClick = (task) => {
    setEditingId(task._id);
    setEditForm({
      work: task.work,
      deadline: task.deadline || "",
    });
  };

  const handleSave = async (id) => {
    try {
      const payload = { work: editForm.work, deadline: editForm.deadline };
      await updateTodo(id, payload);
      if (onEdit) await onEdit({ ...payload, id });
      setEditingId(null);
      setEditForm({ work: "", deadline: "" });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ work: "", deadline: "" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      if (onDelete) await onDelete(id);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Your To-Do 📝</h2>
        <div className="bg-white bg-opacity-20 text-black px-3 py-1 rounded-full text-sm">
          {data.length} items
        </div>
      </div>

      {/* Items */}
      <div className="p-6 space-y-3 max-h-60 md:max-h-80 overflow-auto">
        {data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks yet. Add a task to get started!</p>
          </div>
        ) : (
          <AnimatePresence>
            {data.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 hover:bg-gray-200 rounded-xl p-4 border border-gray-100 flex justify-between items-center"
              >
                {editingId === task._id ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center w-full">
                    <input
                      type="text"
                      value={editForm.work}
                      onChange={(e) =>
                        setEditForm({ ...editForm, work: e.target.value })
                      }
                      className="md:col-span-5 border p-2 rounded"
                    />
                    <input
                      type="date"
                      value={editForm.deadline}
                      onChange={(e) =>
                        setEditForm({ ...editForm, deadline: e.target.value })
                      }
                      className="md:col-span-4 border p-2 rounded"
                    />
                    <div className="md:col-span-3 flex justify-center space-x-3">
                      <button
                        onClick={() => handleSave(task._id)}
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
                    <div className="md:col-span-5">{task.work}</div>
                    <div className="md:col-span-4">
                      {task.deadline ? new Date(task.deadline).toLocaleDateString() : "-"}
                    </div>
                    <div className="md:col-span-3 flex space-x-5">
                      <button
                        onClick={() => handleEditClick(task)}
                        className="text-blue-600 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
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
        <CustomButton
          label="Add ToDo"
          color="#10B981"
          FormComponent={AddTodo}
          onAdd={onAdd}
        />
      </div>
    </div>
  );
};

export default ToDoList;
