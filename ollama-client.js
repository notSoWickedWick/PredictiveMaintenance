const axios = require("axios");

/**
 * Sends prompt to local Ollama and gets the response
 * @param {string} prompt - The full prompt including JSON
 * @returns {Promise<string>} - Response from the model
 */
async function queryOllama(prompt) {
  try {
    const response = await axios.post("http://127.0.0.1:11434/api/generate", {
      model: "llama3.2", // Ensure this matches the model you're running
      prompt: prompt,
      stream: false,
    });

    return response.data.response;
  } catch (error) {
    console.error("Ollama Error:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
}

module.exports = queryOllama;
