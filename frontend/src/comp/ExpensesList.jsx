import React, { useState } from "react";
import { DollarSign } from "lucide-react";
import { deleteInvestment, updateInvestment } from "../api/investmentApi";
import CustomButton from "./Button";
import AddExpenses from "./AddExpenses";

const ExpensesList = ({ data = [], onDelete, onEdit, onAdd }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ amount: "", work: "", date: "" });

  const totalAmount = data.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  const handleDelete = async (id) => {
    try {
      await deleteInvestment(id);
      if (onDelete) await onDelete(id);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditClick = (exp) => {
    setEditingId(exp._id);
    setEditForm({
      amount: exp.amount,
      work: exp.work || "",
      date: exp.date ? new Date(exp.date).toISOString().split("T")[0] : "",
    });
  };

  const handleSave = async (id) => {
    try {
      const payload = {
        amount: Number(editForm.amount),
        work: editForm.work,
        date: new Date(editForm.date).toISOString(),
      };

      const res = await updateInvestment(id, payload);
      const updatedExpense = res.data || res;
      if (onEdit) onEdit(updatedExpense);

      setEditingId(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleCancel = () => setEditingId(null);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6 flex justify-between items-center">
        <h2 className="text-md lg:text-lg font-semibold text-white">
          Expenses & Investments
        </h2>
        <div className="bg-white bg-opacity-20 text-black px-3 py-1 rounded-full text-sm">
          {data.length} items
        </div>
      </div>

      {/* Total */}
      {data.length > 0 && (
        <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between rounded-t-lg">
          <span className="text-gray-700 font-medium">Total Amount:</span>
          <span className="font-bold text-pink-600">
            ₹{totalAmount.toLocaleString()}
          </span>
        </div>
      )}

      {/* Items */}
      <div className="p-6 space-y-3 max-h-60 md:max-h-80 overflow-auto">
        {data.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              No expenses yet. Start tracking your investments!
            </p>
          </div>
        ) : (
          data.map((exp) => (
            <div
              key={exp._id}
              className="bg-gray-50 hover:bg-gray-200 rounded-xl p-4 border border-gray-100"
            >
              {editingId === exp._id ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Work */}
                  <input
                    type="text"
                    value={editForm.work}
                    onChange={(e) =>
                      setEditForm({ ...editForm, work: e.target.value })
                    }
                    className="md:col-span-3 border p-2 rounded"
                  />
                  {/* Amount */}
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm({ ...editForm, amount: e.target.value })
                    }
                    className="md:col-span-2 border p-2 rounded"
                  />
                  {/* Date */}
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) =>
                      setEditForm({ ...editForm, date: e.target.value })
                    }
                    className="md:col-span-3 border p-2 rounded"
                  />
                  <div className="md:col-span-2 flex justify-center space-x-3">
                    <button
                      onClick={() => handleSave(exp._id)}
                      className="bg-green-600 cursor-pointer text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 cursor-pointer text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="md:col-span-3">{exp.work || "N/A"}</div>
                  <div className="md:col-span-2">
                    ₹{Number(exp.amount).toLocaleString()}
                  </div>
                  <div className="md:col-span-3">
                    {exp.date ? new Date(exp.date).toLocaleDateString() : "-"}
                  </div>
                  <div className="md:col-span-2 flex space-x-5">
                    <button
                      onClick={() => handleEditClick(exp)}
                      className="text-blue-600 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="text-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Button */}
      <div className="mb-5">
        <CustomButton
          label="Add Expense"
          color="#EC4899"
          FormComponent={AddExpenses}
          onAdd={onAdd}
        />
      </div>
    </div>
  );
};

export default ExpensesList;
