const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getPESTELAnalysis = async (req, res) => {
  try {
    const { company } = req.body;
    if (!company) {
      return res.status(400).json({ error: "Company name is required" });
    }

    const prompt = `Perform a PESTEL analysis for ${company}. just single line points`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ company, analysis: text });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch PESTEL analysis" });
  }
};

module.exports = { getPESTELAnalysis };
