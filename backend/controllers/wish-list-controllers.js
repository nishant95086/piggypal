const Wish = require("../model/wish-list");

const addWish = async (req, res) => {
  try {
    const { name, link, amount, date } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }
    if (!link) {
      return res.status(400).json({
        success: false,
        message: "Link is required",
      });
    }
    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const newWish = new Wish({
      name,
      amount,
      link,
      date: date || Date.now(),
      userId: req.user.id,
    });

    await newWish.save();

    res.status(201).json({
      success: true,
      message: "Wish added successfully",
      wish: newWish, // ✅ correct key
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error adding wish",
    });
  }
};

const updateWish = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, link, amount, date } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (link !== undefined) updateData.link = link;
    if (amount !== undefined) updateData.amount = amount;
    if (date !== undefined) updateData.date = date;

    const updatedWish = await Wish.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // ✅ correct method
      updateData,
      { new: true }
    );

    if (!updatedWish) {
      return res.status(404).json({
        success: false,
        message: "Wish not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Wish updated successfully",
      wish: updatedWish, // ✅ correct key
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error updating wish",
    });
  }
};

const getAllWish = async (req, res) => {
  try {
    const wishes = await Wish.find({ userId: req.user.id }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      message: "All wishes fetched successfully",
      wishes, // ✅ wrapped in object
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error getting all wishes",
    });
  }
};

const deleteWish = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedWish = await Wish.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedWish) {
      return res.status(404).json({
        success: false,
        message: "Wish not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Wish deleted successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error deleting wish",
    });
  }
};

module.exports = { addWish, updateWish, getAllWish, deleteWish };
