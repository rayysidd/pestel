const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  company: { type: String, required: true },
  analysis: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Analysis", analysisSchema);
