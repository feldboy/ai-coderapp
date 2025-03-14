import { Story } from "../entities/Story";
import { generateUserStory } from "../integrations/DeepSeek";
import ChatInput from "../components/chat/ChatInput";
import ChatMessage from "../components/chat/ChatMessage";
import { Button } from "../components/ui/button";
import { Save, Loader2, Search, Edit3 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { useToast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { User } from "../entities/User";

import { useState, useRef, useEffect } from "react";

export default function Chat() {
    console.log("ChatPage: start");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [userPreferences, setUserPreferences] = useState({ defaultDetailLevel: "brief" });
    const messagesEndRef = useRef(null);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        loadUserPreferences();
    }, []);

    const loadUserPreferences = async () => {
        console.log("loadUserPreferences: start");
        try {
            const userData = await User.me();
            if (userData && userData.preferences) {
                setUserPreferences(userData.preferences);
            }
        } catch (error) {
            console.error("loadUserPreferences: error", error);
        }
        console.log("loadUserPreferences: end");
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (text, selectedStyle) => {
        console.log("handleSendMessage: start", { text, selectedStyle });
        const userMessage = { id: Date.now(), text, isUser: true };
        setMessages((prev) => [...prev, userMessage]);

        setIsLoading(true);
        setCanSave(false);

        try {
            console.log("handleSendMessage: try - generateUserStory start");


            let systemInstructions = `You are 'StoryCraft AI', an expert in Agile User Story creation. Transform user instructions into user stories. Apply INVEST and 3 C's principles. Format output as JSON.`;

            if (selectedStyle === "detail") {
                systemInstructions += " Provide detailed analysis.";
            } else if (selectedStyle === "long") {
                systemInstructions += " Provide detailed output.";
            } else if (selectedStyle === "brief") {
                systemInstructions += " Keep response brief.";
            }


            systemInstructions += `

IMPORTANT: Format response as JSON with:
{
  "title": "Story title",
  "storyText": "User story",
  "description": "Description",
  "investValidation": {
    "independent": "Yes/No",
    "negotiable": "Yes/No",
    "valuable": "Yes/No",
    "estimable": "Yes/No",
    "small": "Yes/No",
    "testable": "Yes/No"
  },
  "acceptanceCriteria": ["Acceptance criteria"],
  "personaContext": "Persona",
  "collaborationPoint": "Collaboration suggestions",
  "improvementSuggestion": "Improvement suggestions"
}`;
            console.log("handleSendMessage: systemInstructions", systemInstructions);

            // The generateUserStory function now returns a parsed JSON object
            const result = await generateUserStory(text, systemInstructions);
            console.log("handleSendMessage: generateUserStory result", result);

            const aiMessage = {
                id: Date.now() + 1,
                content: result,
                isUser: false,
            };

            setMessages((prev) => [...prev, aiMessage]);
            setCanSave(true);
            console.log("handleSendMessage: success");


        } catch (error) {
            console.error("handleSendMessage: error", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to get a response. Please try again.",
            });
        } finally {
            setIsLoading(false);
            console.log("handleSendMessage: finally setIsLoading(false)");
        }
        console.log("handleSendMessage: end");
    }

    const handleSaveStory = async () => {
        console.log("handleSaveStory: start");
        try {
            const lastAiMessage = [...messages].reverse().find((m) => !m.isUser);

            if (lastAiMessage && lastAiMessage.content) {
                const storyData = {
                    title: lastAiMessage.content.title,
                    storyText: lastAiMessage.content.storyText,
                    description: lastAiMessage.content.description,
                    status: "To Do",
                    investValidation: lastAiMessage.content.investValidation,
                    acceptanceCriteria: lastAiMessage.content.acceptanceCriteria,
                    personaContext: lastAiMessage.content.personaContext,
                    collaborationPoint: lastAiMessage.content.collaborationPoint,
                    improvementSuggestion: lastAiMessage.content.improvementSuggestion,
                };

                await Story.create(storyData);
                console.log("handleSaveStory: Story.create success");

                toast({
                    title: "Success",
                    description: "Story saved successfully",
                });

                navigate(createPageUrl("Stories"));
            }
        } catch (error) {
            console.error("handleSaveStory: error", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to save the story",
            });
        }
        console.log("handleSaveStory: end");
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {messages.length === 0 ? (
                    <div className="welcome-card bg-white rounded-xl shadow-sm p-8 text-center">
                        <h1 className="welcome-title text-2xl font-semibold mb-4 text-gray-800">Welcome to StoryCraft</h1>
                        <p className="welcome-text text-gray-600 mb-6 max-w-2xl mx-auto">
                            Start crafting your user stories by typing your task idea below. Even simple instructions like "remove the big button" will be transformed into proper user stories. Try adding "stickers" to control the level of detail.
                        </p>
                        
                        <div className="examples-container grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="example-card bg-gray-50 p-5 rounded-lg">
                                <h3 className="example-title font-medium mb-2 text-gray-800">Example:</h3>
                                <p className="example-text text-gray-700 mb-2">"remove the big button"</p>
                                <p className="example-description text-sm text-gray-500">For a brief user story with basic suggestions</p>
                            </div>
                            <div className="example-card bg-gray-50 p-5 rounded-lg">
                                <h3 className="example-title font-medium mb-2 text-gray-800">Try with "Detailed" sticker:</h3>
                                <p className="example-text text-gray-700 mb-2">"login with fingerprint"</p>
                                <p className="example-description text-sm text-gray-500">For a detailed INVEST analysis and more suggestions</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="chat-messages space-y-4">
                        {messages.map((message) => (
                            <ChatMessage
                                key={message.id}
                                message={message}
                                isUser={message.isUser}
                            />
                        ))}
                    </div>
                )}

                {isLoading && (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-6 w-6 text-primary animate-spin" />
                        <span className="ml-2 text-primary">Crafting your story...</span>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="px-6 py-4 bg-background border-t border-t-secondary">
                {canSave && (
                    <div className="mb-4 flex justify-center">
                        <Button onClick={handleSaveStory} className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Save size={16} className="mr-2" />
                            Save Story
                        </Button>
                    </div>
                )}

                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
        </div>
    );
}
console.log("ChatPage: end");
