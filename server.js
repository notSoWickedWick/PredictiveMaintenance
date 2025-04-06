const express = require("express");
const queryOllama = require("./ollama-client");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/analyze", async (req, res) => {
  const { machineType, data } = req.body;

  const formattedPrompt = `
Given the following JSON structure containing machine sensor readings and type, analyze each parameter using ISO and industry standards and provide a comprehensive predictive maintenance report. Use scoring metrics and explain warnings or critical conditions.

${JSON.stringify(
  { machine_type: machineType, parameters: data, report_format: "..." },
  null,
  2
)}
`;

  try {
    const result = await queryOllama(formattedPrompt);
    res.json({ report: result });
  } catch (err) {
    res.status(500).json({ error: "Error interacting with Ollama" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
