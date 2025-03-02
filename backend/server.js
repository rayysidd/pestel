require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express(); // Move this line to the top!

app.use(cors({ 
  origin: "*", // Allow all origins (for now)
  methods: ["GET", "POST"], // Allow only necessary methods
  allowedHeaders: ["Content-Type"] // Restrict headers
}));
app.use(bodyParser.json());

// Import routes (AFTER app is initialized)
const analysisRoutes = require("./routes/analysisRoutes");
app.use("/api/analysis", analysisRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
