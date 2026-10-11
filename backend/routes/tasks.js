// REST API routes for tasks (assignment item A4 and A5)
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// Convert to string, trim, and return the clean title (A5)
const cleanTitle = (value) => String(value ?? "").trim();

// GET /api/tasks - fetch all tasks (newest first)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching tasks" });
  }
});

// POST /api/tasks - add a new task
router.post("/", async (req, res) => {
  try {
    const title = cleanTitle(req.body.title);
    if (!title) {
      return res.status(400).json({ message: "Title cannot be empty" });
    }
    const task = await Task.create({ title });
    res.status(201).json(task); // 201 = Created
  } catch (err) {
    res.status(500).json({ message: "Server error while creating task" });
  }
});

// PUT /api/tasks/:id - edit the title and/or toggle completed
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updates = {};

    // Only validate the title if the client actually sent one
    if (req.body.title !== undefined) {
      const title = cleanTitle(req.body.title);
      if (!title) {
        return res.status(400).json({ message: "Title cannot be empty" });
      }
      updates.title = title;
    }
    if (req.body.completed !== undefined) {
      updates.completed = Boolean(req.body.completed);
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true, // return the updated document
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error while updating task" });
  }
});

// DELETE /api/tasks/:id - remove a task
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Task not found" });
    }
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted", id: task._id });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting task" });
  }
});

module.exports = router;
