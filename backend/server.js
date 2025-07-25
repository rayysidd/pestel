require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express(); // Move this line to the top!

app.use(express.json());
app.use(cors()); // Allow frontend requests

MONGO_URI = "mongodb://127.0.0.1:27017/pestelDB";
mongoose.connect(MONGO_URI);


const analysisSchema = new mongoose.Schema({
  company: String,
  sector: String,
  date: String,
  analysis: Object,
  savedAt: String,
});

const Analysis = mongoose.model("Analysis", analysisSchema);


app.post("/api/generate-pestel", async (req, res) => {
  const { company, sector } = req.body;

  if (!company || !sector) {
    return res.status(400).json({ error: "Company and sector are required." });
  }

  // Simulate API-generated PESTEL analysis

  try {
    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt1 = `Does the ${company} exist? Answer 1 if yes and 0 if no; nothing else to be answered`;
    const exist = await model.generateContent(prompt1);

    if(exist == `0`) {
      res.status(400).json({ error: "A company with this name could not be found" });
    } else {
      const query = `Perform a PESTEL analysis for ${company}.Explain each factor in detail in 4 to 5 lines.The text should be plain and without any markdown`;

     
      const result = await model.generateContent(query);
      const response = result.response.text();

      res.json({ analysis: response });
    }
} catch (error) {
    console.error('Error generating PESTEL analysis:', error);
    res.status(500).json({ error: 'Failed to generate analysis' });
}
});

app.get("/api/analysis", async (req, res) => {
  const analyses = await Analysis.find();
  res.json(analyses);
});

app.delete("/api/analysis/:id", async (req, res) => {
  await Analysis.findByIdAndDelete(req.params.id);
  res.json({ message: "Analysis deleted successfully" });
});

//app.listen(5001, () => console.log("Server running on port 5001"));
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
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));