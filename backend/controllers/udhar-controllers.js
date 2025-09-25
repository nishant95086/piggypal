const Udhar = require("../model/udhar");

// Add a new Udhar
const addUdhar = async (req, res) => {
  try {
    const { name, amount, date } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!amount) {
      return res.status(400).json({ success: false, message: "Amount is required" });
    }

    let udharDate = date ? new Date(date) : new Date();
    if (isNaN(udharDate)) {
      return res.status(400).json({ success: false, message: "Invalid date" });
    }

    const newUdhar = new Udhar({
      name,
      amount,
      date: udharDate,
      userId: req.user.id,
    });

    await newUdhar.save();

    res.status(201).json({
      success: true,
      message: "Udhar added successfully",
      udhar: newUdhar,
    });
  } catch (e) {
    console.error("❌ Error in addUdhar:", e);
    res.status(500).json({
      success: false,
      message: "Error adding udhar",
      error: e.message,
    });
  }
};

// Update an existing Udhar
const updateUdhar = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, amount, date } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (amount !== undefined) updateData.amount = amount;
    if (date !== undefined) {
      const udharDate = new Date(date);
      if (isNaN(udharDate)) {
        return res.status(400).json({ success: false, message: "Invalid date" });
      }
      updateData.date = udharDate;
    }

    const updatedUdhar = await Udhar.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true }
    );

    if (!updatedUdhar) {
      return res.status(404).json({
        success: false,
        message: "Udhar not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Udhar updated successfully",
      udhar: updatedUdhar,
    });
  } catch (e) {
    console.error("❌ Error in updateUdhar:", e);
    res.status(500).json({
      success: false,
      message: "Error updating udhar",
      error: e.message,
    });
  }
};

// Get all Udhars
const getAllUdhar = async (req, res) => {
  try {
    const udhars = await Udhar.find({ userId: req.user.id }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      message: "All udhars fetched successfully",
      udhars,
    });
  } catch (e) {
    console.error("❌ Error in getAllUdhar:", e);
    res.status(500).json({
      success: false,
      message: "Error getting all udhars",
      error: e.message,
    });
  }
};

// Delete Udhar
const deleteUdhar = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUdhar = await Udhar.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedUdhar) {
      return res.status(404).json({
        success: false,
        message: "Udhar not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Udhar deleted successfully",
    });
  } catch (e) {
    console.error("❌ Error in deleteUdhar:", e);
    res.status(500).json({
      success: false,
      message: "Error deleting udhar",
      error: e.message,
    });
  }
};

module.exports = { addUdhar, updateUdhar, getAllUdhar, deleteUdhar };
