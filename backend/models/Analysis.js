const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  company: String,
  sector: String,
  date: String,
  analysis: Object,
});

// ✅ Use `mongoose.models.Analysis` to prevent re-compiling
const Analysis = mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema);

module.exports = Analysis;
