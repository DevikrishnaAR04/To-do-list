// Mongoose model for a Task (assignment item A3)
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },        // task text, mandatory
  completed: { type: Boolean, default: false },   // false until ticked off
  createdAt: { type: Date, default: Date.now },   // set automatically
});

module.exports = mongoose.model("Task", taskSchema);
