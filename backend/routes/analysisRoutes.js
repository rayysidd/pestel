const express = require("express");
const router = express.Router();
const Analysis = require("../models/Analysis");
const { getPESTELAnalysis } = require("../controllers/geminiController");

// Route to save PESTEL analysis
router.post("/", async (req, res) => {
  try {
    const newAnalysis = new Analysis(req.body);
    await newAnalysis.save();
    res.status(201).json({ message: "Analysis saved successfully!" });
  } catch (error) {
    console.error("Error saving analysis:", error);
    res.status(500).json({ error: "Failed to save analysis." });
  }
});

router.get("/", async (req, res) => {
  try {
    const analyses = await Analysis.find();
    res.json(analyses);
  } catch (error) {
    console.error("Error fetching analyses:", error);
    res.status(500).json({ error: "Failed to fetch analyses." });
  }
});

router.post("/generate", getPESTELAnalysis);
module.exports = router;
