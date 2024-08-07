const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    todo: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "all",
    },
    isStarChecked: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
