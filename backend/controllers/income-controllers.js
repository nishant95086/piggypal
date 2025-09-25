const Income = require("../model/income");

const addIncome = async (req, res) => {
  try {
    const { amount , date} = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const newIncome = new Income({
      amount,
      date,
      userId: req.user.id,
    });

    await newIncome.save();

    res.status(201).json({
      success: true,
      message: "Income added successfully",
      income: newIncome,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error adding income",
    });
  }
};

const updateIncome = async (req, res) => {
  try {
    const id = req.params.id;
    const { amount, date } = req.body;

    const updateData = {};
    if (amount !== undefined) updateData.amount = amount;
    if (date !== undefined) updateData.date = date;

    const updatedIncome = await Income.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({
        success: false,
        message: "Income not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Income updated successfully",
      income: updatedIncome,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error updating income",
    });
  }
};

const getAllIncome = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      message: "All incomes fetched successfully",
      incomes,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error getting all income",
    });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedIncome = await Income.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedIncome) {
      return res.status(404).json({
        success: false,
        message: "Income not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error deleting income",
    });
  }
};

module.exports = { addIncome, updateIncome, getAllIncome, deleteIncome };
