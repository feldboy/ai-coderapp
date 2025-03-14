import axios from 'axios';

// Use the API key provided by the user
// const API_KEY = 'AIzaSyBzgLveK5FcdDSqh9tocovV18mY-9cFWyg'; // Original Gemini API Key - Not needed anymore

const geminiPro = axios.create({
    baseURL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro',
    params: {
        key: API_KEY
    }
});

export const generateUserStory = async (prompt, systemInstructions) => {
    try {
        const response = await geminiPro.post(':generateContent', {
            contents: [{
                parts: [{text: `${systemInstructions}\n\nUser Input: ${prompt}`}]
            }]
        });
        
        const textResponse = response.data.candidates[0].content.parts[0].text;
        
        // Try to parse the response as JSON
        try {
            // First try: Look for JSON between markdown code blocks
            const jsonMatch = textResponse.match(/```(?:json)?([\s\S]*?)```/);
            if (jsonMatch && jsonMatch[1]) {
                return JSON.parse(jsonMatch[1].trim());
            }
            
            // Second try: Check if the entire response is a JSON object
            return JSON.parse(textResponse.trim());
        } catch (parseError) {
            // If JSON parsing fails, create a simple object with the text
            console.warn("Failed to parse JSON from API response, returning text", parseError);
            return {
                title: "Generated Story",
                storyText: textResponse,
                description: "Generated from user input",
                investValidation: {
                    independent: "Yes",
                    negotiable: "Yes",
                    valuable: "Yes",
                    estimable: "Yes",
                    small: "Yes",
                    testable: "Yes"
                },
                acceptanceCriteria: ["Criteria will be defined during refinement"],
                personaContext: "User",
                collaborationPoint: "Team should discuss implementation details",
                improvementSuggestion: "Consider adding more specific acceptance criteria"
            };
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
};
