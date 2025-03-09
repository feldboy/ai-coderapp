import axios from "axios";

export const InvokeLLM = async ({ prompt, response_json_schema }) => {
  try {
    // Replace with your actual API endpoint and key
    const API_URL = process.env.REACT_APP_AI_API_URL || "https://api.openai.com/v1/chat/completions";
    const API_KEY = process.env.REACT_APP_AI_API_KEY;
    
    if (!API_KEY) {
      throw new Error("API key not configured");
    }
    
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: "You are StoryCraft AI, an expert in creating user stories."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object", schema: response_json_schema }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        }
      }
    );
    
    // Parse the response content
    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("Error invoking LLM:", error);
    throw error;
  }
};