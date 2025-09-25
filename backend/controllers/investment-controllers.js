const Investment = require("../model/investment");

const addInvestment = async (req, res) => {
  try {
    const { amount, work, date } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }
    if (!work) {
      return res.status(400).json({
        success: false,
        message: "Work is required",
      });
    }

    const newInvestment = new Investment({
      amount,
      work,
      date: date || Date.now(),
      userId: req.user.id,
    });

    await newInvestment.save();

    res.status(201).json({
      success: true,
      message: "Investment added successfully",
      investment: newInvestment, // ✅ fixed
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error adding investment",
    });
  }
};

const updateInvestment = async (req, res) => {
  try {
    const id = req.params.id;
    const { amount, work, date } = req.body;

    const updateData = {};
    if (amount !== undefined) updateData.amount = amount;
    if (work !== undefined) updateData.work = work;
    if (date !== undefined) updateData.date = date;

    const updateinvestment = await Investment.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true }
    );

    if (!updateinvestment) {
      return res.status(404).json({
        success: false,
        message: "Investment not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Investment updated successfully",
      investment: updateinvestment, // ✅ fixed
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error updating investment",
    });
  }
};

const getAllInvestment = async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user.id }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: "All investments fetched successfully",
      investments, // ✅ fixed
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error getting all investments",
    });
  }
};

const deleteInvestment = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteinvestment = await Investment.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deleteinvestment) {
      return res.status(404).json({
        success: false,
        message: "Investment not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Investment deleted successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error deleting investment",
    });
  }
};

module.exports = { addInvestment, updateInvestment, getAllInvestment, deleteInvestment };
