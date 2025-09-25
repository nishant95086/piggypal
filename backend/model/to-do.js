const mongoose = require("mongoose");

const Todo = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Todo", Todo);
