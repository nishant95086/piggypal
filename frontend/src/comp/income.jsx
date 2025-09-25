import React, { useState } from "react";
import { DollarSign } from "lucide-react";
import CustomButton from "./Button";
import AddIncome from "./AddIncome";
import { deleteIncome, updateIncome } from "../api/incomeApi";

const IncomeList = ({ data = [], onDelete, onEdit, onAdd }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ amount: "", date: "" });

  const totalAmount = data.reduce(
    (sum, income) => sum + Number(income.amount || 0),
    0
  );

  const handleDelete = async (id) => {
    try {
      await deleteIncome(id);
      if (onDelete) await onDelete(id);
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const handleEditClick = (income) => {
    setEditingId(income._id);
    setEditForm({
      amount: income.amount,
      date: income.date ? new Date(income.date).toISOString().split("T")[0] : "",
    });
  };

  const handleSave = async (id) => {
    try {
      const payload = {
        amount: Number(editForm.amount),
        date: new Date(editForm.date).toISOString(),
      };

      const res = await updateIncome(id, payload);
      const updatedIncome = res.data || res;
      if (onEdit) onEdit(updatedIncome);

      setEditingId(null);
    } catch (error) {
      console.error("Error updating income:", error);
    }
  };

  const handleCancel = () => setEditingId(null);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500 to-violet-600 p-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">
          Income & Pocket Money
        </h2>
        <div className="bg-white bg-opacity-20 text-black px-3 py-1 rounded-full text-sm">
          {data.length} items
        </div>
      </div>

      {/* Total */}
      {data.length > 0 && (
        <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between rounded-t-lg">
          <span className="text-gray-700 font-medium">Total Income:</span>
          <span className="font-bold text-violet-600">
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
              No income yet. Start tracking your pocket money!
            </p>
          </div>
        ) : (
          data.map((income) => (
            <div
              key={income._id}
              className="bg-gray-50 hover:bg-gray-200 rounded-xl p-4 border border-gray-100"
            >
              {editingId === income._id ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
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
                      onClick={() => handleSave(income._id)}
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
                  <div className="md:col-span-2">
                    ₹{Number(income.amount).toLocaleString()}
                  </div>
                  <div className="md:col-span-3">
                    {income.date
                      ? new Date(income.date).toLocaleDateString()
                      : "-"}
                  </div>
                  <div className="md:col-span-2 flex space-x-5">
                    <button
                      onClick={() => handleEditClick(income)}
                      className="text-blue-600 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(income._id)}
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
          label="Add Income"
          color="#8B5CF6"
          FormComponent={AddIncome}
          onAdd={onAdd}
        />
      </div>
    </div>
  );
};

export default IncomeList;
