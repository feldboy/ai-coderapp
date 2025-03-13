// src/integrations/Core.js

/**
 * Integration with Google's Gemini API for AI-powered content generation
 * This module handles communication with the Gemini API and processes responses
 */

const API_KEY = "AIzaSyBzgLveK5FcdDSqh9tocovV18mY-9cFWyg";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

/**
 * Invokes the Gemini LLM API to generate content based on a prompt
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.prompt - The prompt to send to the LLM
 * @param {Object} options.response_json_schema - JSON schema for validating the response
 * @returns {Promise<Object>} - Parsed JSON response from the LLM
 */
export async function InvokeLLM({ prompt, response_json_schema }) {
  try {
    // Make the API request to Gemini
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: prompt }],
        }],
      }),
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `HTTP error ${response.status}`;
      throw new Error(`API Error: ${response.status} - ${errorMessage}`);
    }

    // Parse the response
    const data = await response.json();

    // Validate response structure
    if (!data.candidates || !data.candidates.length || !data.candidates[0].content?.parts?.length) {
      throw new Error("Invalid API response format");
    }

    // Extract text from response
    const textResponse = data.candidates[0].content.parts[0].text;
    if (!textResponse) {
      throw new Error("Empty response from API");
    }

    // Try to extract JSON from the response using different patterns
    let jsonObject;

    // First try: Look for JSON between markdown code blocks
    const jsonMatch = textResponse.match(/```(?:json)?([\s\S]*?)```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        jsonObject = JSON.parse(jsonMatch[1].trim());
        return jsonObject;
      } catch (parseError) {
        console.warn("Failed to parse JSON from code block, trying alternative methods");
      }
    }

    // Second try: Check if the entire response is a JSON object
    try {
      jsonObject = JSON.parse(textResponse.trim());
      return jsonObject;
    } catch (parseError) {
      console.warn("Failed to parse entire response as JSON, trying to extract JSON portion");
    }

    // Third try: Look for anything that looks like a JSON object
    const possibleJsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (possibleJsonMatch) {
      try {
        jsonObject = JSON.parse(possibleJsonMatch[0]);
        return jsonObject;
      } catch (parseError) {
        console.error("All JSON parsing attempts failed");
      }
    }

    // If we get here, we couldn't parse JSON
    console.error("Response text:", textResponse);
    throw new Error("Failed to extract valid JSON from API response");

  } catch (error) {
    console.error("Error invoking LLM:", error);
    throw error; // Re-throw for handling in the calling component
  }
}