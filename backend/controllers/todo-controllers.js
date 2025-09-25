const Todo = require("../model/to-do");

// Add a new Todo
const addTodo = async (req, res) => {
  try {
    const { work, deadline } = req.body;

    if (!work) {
      return res.status(400).json({ success: false, message: "Work is required" });
    }
    if (!deadline) {
      return res.status(400).json({ success: false, message: "Deadline is required" });
    }

    // Convert deadline to Date object
    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate)) {
      return res.status(400).json({ success: false, message: "Invalid deadline date" });
    }

    const newTodo = new Todo({
      work,
      deadline: deadlineDate,
      userId: req.user.id,
    });

    await newTodo.save();

    res.status(201).json({
      success: true,
      message: "Todo added successfully",
      todo: newTodo,
    });
  } catch (e) {
    console.error("❌ Error in addTodo:", e);
    res.status(500).json({
      success: false,
      message: "Error adding todo",
      error: e.message,
    });
  }
};

// Update an existing Todo
const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { work, deadline } = req.body;

    const updateData = {};
    if (work !== undefined) updateData.work = work;
    if (deadline !== undefined) {
      const deadlineDate = new Date(deadline);
      if (isNaN(deadlineDate)) {
        return res.status(400).json({ success: false, message: "Invalid deadline date" });
      }
      updateData.deadline = deadlineDate;
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (e) {
    console.error("❌ Error in updateTodo:", e);
    res.status(500).json({
      success: false,
      message: "Error updating todo",
      error: e.message,
    });
  }
};

// Get all Todos for the logged-in user
const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({ deadline: 1 }); // nearest deadlines first

    res.status(200).json({
      success: true,
      message: "All todos fetched successfully",
      todos,
    });
  } catch (e) {
    console.error("❌ Error in getAllTodo:", e);
    res.status(500).json({
      success: false,
      message: "Error getting all todos",
      error: e.message,
    });
  }
};

// Delete a Todo
const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (e) {
    console.error("❌ Error in deleteTodo:", e);
    res.status(500).json({
      success: false,
      message: "Error deleting todo",
      error: e.message,
    });
  }
};

module.exports = { addTodo, updateTodo, getAllTodo, deleteTodo };
