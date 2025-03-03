const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getPESTELAnalysis = async (req, res) => {
  try {
    const { company } = req.body;
    if (!company) {
      return res.status(400).json({ error: "Company name is required" });
    }

    const prompt = `Perform a PESTEL analysis for ${company}. Just single-line points for each factor.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    // Extracting the correct response format
    const responseText = result.candidates[0].content.parts[0].text;

    res.json({ company, sector, date: new Date().toISOString(), analysis: responseText });
  } catch (error) {
    console.error("Error fetching PESTEL analysis:", error);
    res.status(500).json({ error: "Failed to fetch PESTEL analysis" });
  }
};

module.exports = { getPESTELAnalysis };
