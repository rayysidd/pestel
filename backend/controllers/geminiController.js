const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getPESTELAnalysis = async (req, res) => {
  try {
    const { company } = req.body;
    if (!company) {
      return res.status(400).json({ error: "Company name is required" });
    }

    const prompt1 = `Does the ${company} exist?Answer 1 if yes and 0 if no; nothing else to be answered`;
    const exist = int(await model.generateContent(prompt1));

    if(exist == 0) {
      res.status(400).json({ error: "A company with this name could not be found" });
    } else {
      const prompt = `Perform a PESTEL analysis for ${company}.Explain each factor in detail .It should be personalised according to the company.It should not be a generic analysis`;

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);

      // Extracting the correct response format
      const responseText = result.candidates[0].content.parts[0].text;

      res.json({ company, sector, date: new Date().toISOString(), analysis: responseText });
    } 

  } catch (error) {
    console.error("Error fetching PESTEL analysis:", error);
    res.status(500).json({ error: "Failed to fetch PESTEL analysis" });
  }
};

module.exports = { getPESTELAnalysis };
