import axios from 'axios';

const API_KEY = 'sk-81427dd6c8f14359bb37fe93f10c477b'; // User provided API Key

const deepSeekPro = axios.create({
    baseURL: 'https://api.deepseek.com/v1/chat/completions', // DeepSeek API endpoint
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

export const generateUserStory = async (prompt, systemInstructions) => {
    console.log("generateUserStory DeepSeek: start", { prompt, systemInstructions });
    try {
        console.log("generateUserStory DeepSeek: deepSeekPro.post start");
        const response = await deepSeekPro.post('', { // POST request to the base URL
            model: "deepseek-chat", // Specify the model
            temperature: 0.7, // Added temperature parameter to control randomness and potentially speed
            messages: [ // DeepSeek expects messages in an array
                {
                    role: "system",
                    content: systemInstructions
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });
        console.log("generateUserStory DeepSeek: deepSeekPro.post response", response);

        const textResponse = response.data.choices[0].message.content;

        // Try to parse the response as JSON
        try {
            console.log("generateUserStory DeepSeek: JSON.parse start");
            // First try: Look for JSON between markdown code blocks
            const jsonMatch = textResponse.match(/```(?:json)?([\s\S]*?)```/);
            if (jsonMatch && jsonMatch[1]) {
                const parsedJson1 = JSON.parse(jsonMatch[1].trim());
                console.log("generateUserStory DeepSeek: JSON.parse success - from code block", parsedJson1);
                return parsedJson1;
            }

            // Second try: Check if the entire response is a JSON object
            const parsedJson2 = JSON.parse(textResponse.trim());
            console.log("generateUserStory DeepSeek: JSON.parse success - entire response", parsedJson2);
            return parsedJson2;
        } catch (parseError) {
            // If JSON parsing fails, create a simple object with the text
            console.warn("generateUserStory DeepSeek: Failed to parse JSON from API response, returning text", parseError);
            const fallbackResponse = {
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
            console.log("generateUserStory DeepSeek: fallbackResponse", fallbackResponse);
            return fallbackResponse;
        }
    } catch (error) {
        console.error("generateUserStory DeepSeek: Error calling DeepSeek API:", error);
        throw error;
    }
    console.log("generateUserStory DeepSeek: end");
};
