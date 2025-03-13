import { Story } from "../entities/Story";
import { InvokeLLM } from "../integrations/Core";
import ChatInput from "../components/chat/ChatInput";
import ChatMessage from "../components/chat/ChatMessage";
import { Button } from "../components/ui/button";
import { Save, Loader2, Search } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { useToast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";

import { useState, useRef, useEffect } from "react";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const messagesEndRef = useRef(null);
    const { toast } = useToast();
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (text, sticker) => {
        const userMessage = { id: Date.now(), text, isUser: true };
        setMessages((prev) => [...prev, userMessage]);

        setIsLoading(true);
        setCanSave(false);

        try {
            const detailedMode = sticker === "detailed" || sticker === "longDescription";
            const longDescription = sticker === "longDescription";

            const systemInstructions = `
You are 'StoryCraft AI', an expert in Agile User Story and Task creation...
${detailedMode ? "Provide a detailed analysis..." : ""}
${longDescription ? "Provide a more detailed and descriptive output..." : ""}
IMPORTANT: Return a JSON object...
`;

            const result = await InvokeLLM({
                prompt: `${systemInstructions}\n\nUser input: "${text}"`,
                response_json_schema: {
                    type: "object",
                    properties: {
                        storyText: { type: "string" },
                        title: { type: "string" },
                        description: { type: "string" },
                        investValidation: {
                            type: "object",
                            properties: {
                                independent: { type: "string" },
                                negotiable: { type: "string" },
                                valuable: { type: "string" },
                                estimable: { type: "string" },
                                small: { type: "string" },
                                testable: { type: "string" },
                            },
                        },
                        acceptanceCriteria: {
                            type: "array",
                            items: { type: "string" },
                        },
                        personaContext: { type: "string" },
                        collaborationPoint: { type: "string" },
                        improvementSuggestion: { type: "string" },
                    },
                },
            });

            const aiMessage = {
                id: Date.now() + 1,
                content: result,
                isUser: false,
                detailedMode,
            };

            setMessages((prev) => [...prev, aiMessage]);
            setCanSave(true);
        } catch (error) {
            console.error("Error getting AI response:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to get a response. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveStory = async () => {
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

                toast({
                    title: "Success",
                    description: "Story saved successfully",
                });

                navigate(createPageUrl("Stories"));
            }
        } catch (error) {
            console.error("Error saving story:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to save the story",
            });
        }
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {messages.length === 0 ? (
                    <div className="text-center mt-10">
                        <h2 className="text-2xl font-semibold mb-2 text-primary">
                            Welcome to StoryCraft
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Start crafting user stories by describing your feature idea.
                        </p>
                        <Card className="max-w-md mx-auto border-none bg-secondary">
                            <CardContent className="py-10">
                                <Search className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                                <p className="text-gray-700 text-lg px-4 leading-relaxed">
                                    Describe a feature, bug, or improvement you have in mind. I will craft a user story for you.
                                </p>
                                <p className="text-gray-500 text-sm mt-3">Powered by AI</p>
                            </CardContent>
                        </Card>
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
                            <Save size={16} />
                            Save Story
                        </Button>
                    </div>
                )}

                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
        </div>
    );
}
