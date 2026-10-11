// Entry point of the backend (assignment items A1, A2, A6)
require("dotenv").config(); // loads variables from .env into process.env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();

// A6: allow only our React frontend, not every origin
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));

// A1: parse JSON request bodies
app.use(express.json());

app.use("/api/tasks", taskRoutes);

// Fallback for unknown routes
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5000;

// A2: connect to MongoDB using the connection string from .env
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
