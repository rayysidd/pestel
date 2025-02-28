const express = require("express");
const router = express.Router();
const Analysis = require("../models/Analysis");
const { getPESTELAnalysis } = require("../controllers/geminiController");

// Route to save PESTEL analysis
router.post("/", async (req, res) => {
  try {
    const { company, analysis } = req.body;
    
    if (!company || !analysis) {
      return res.status(400).json({ message: "Company and analysis are required." });
    }

    const newAnalysis = new Analysis({ company, analysis });
    await newAnalysis.save();

    res.status(201).json({ message: "Analysis saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const analyses = await Analysis.find(); // Fetch all documents from MongoDB
    res.json(analyses); // Send them as JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Send error if something goes wrong
  }
});

router.post("/generate", getPESTELAnalysis);
module.exports = router;
