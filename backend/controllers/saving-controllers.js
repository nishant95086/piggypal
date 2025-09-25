const Saving = require("../model/saving");

const addSaving = async (req, res) => {
  try {
    const { amount, date } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const newSaving = new Saving({
      amount,
      date: date || Date.now(),
      userId: req.user.id,
    });

    await newSaving.save();

    res.status(201).json({
      success: true,
      message: "Saving added successfully",
      saving: newSaving, // ✅ fixed
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error adding saving",
    });
  }
};

const updateSaving = async (req, res) => {
  try {
    const id = req.params.id;
    const { amount, date } = req.body;

    const updateData = {};
    if (amount !== undefined) updateData.amount = amount;
    if (date !== undefined) updateData.date = date;

    const updatedSaving = await Saving.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // ✅ fixed method
      updateData,
      { new: true }
    );

    if (!updatedSaving) {
      return res.status(404).json({
        success: false,
        message: "Saving not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Saving updated successfully",
      saving: updatedSaving, // ✅ fixed
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error updating saving",
    });
  }
};

const getAllSaving = async (req, res) => {
  try {
    const savings = await Saving.find({ userId: req.user.id }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: "All savings fetched successfully",
      savings, // ✅ fixed
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error getting all savings",
    });
  }
};

const deleteSaving = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedSaving = await Saving.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedSaving) {
      return res.status(404).json({
        success: false,
        message: "Saving not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Saving deleted successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error deleting saving",
    });
  }
};

module.exports = { addSaving, updateSaving, getAllSaving, deleteSaving };
