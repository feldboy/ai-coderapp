import React from "react";
import { User, Bot } from "lucide-react";

import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "../../lib/utils";

export default function ChatMessage({ message, isUser }) {
    const renderAIContent = () => {
        if (!message.content || typeof message.content !== "object") {
            return <p className="text-sm">{message.text}</p>;
        }

        const content = message.content;

        return (
            <div className="space-y-4">
                {content.storyText && (
                    <Card className="w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                        <CardContent className="p-4">
                            <h3 className="text-sm font-semibold mb-2 text-gray-800">User Story:</h3>
                            <p className="text-sm text-gray-700">{content.storyText}</p>
                        </CardContent>
                    </Card>
                )}

                {content.improvementSuggestion && (
                    <Card className="w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                        <CardContent className="p-4">
                            <h3 className="text-sm font-semibold mb-2 text-gray-800">Improvement Suggestion:</h3>
                            <p className="text-sm text-gray-700">{content.improvementSuggestion}</p>
                        </CardContent>
                    </Card>
                )}

                {content.investValidation && (
                    <Card className="w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                        <CardContent className="p-4">
                            <h3 className="text-sm font-semibold mb-2 text-gray-800">INVEST Validation:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                                {Object.entries(content.investValidation).map(([key, value]) => (
                                    <div key={key} className="mb-1">
                                        <span className="font-medium capitalize text-gray-800">{key}: </span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="flex justify-end pt-1">
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 font-normal">
                        {message.detailedMode ? "Detailed" : "Brief"}
                    </Badge>
                </div>
            </div>
        );
    };

    return (
        <div className={`flex gap-3 my-4 ${isUser ? "justify-end" : "justify-start"}`}>
            {!isUser && (
                <Avatar className="h-8 w-8 bg-gray-100 text-gray-600">
                    <AvatarFallback><Bot size={16} /></AvatarFallback>
                </Avatar>
            )}
            <div className={`flex-1 max-w-[80%] ${isUser ? "ml-auto" : "mr-auto"}`}>
                <div
                    className={cn(
                        "rounded-lg p-4",
                        isUser ? "bg-primary text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-tl-none"
                    )}
                >
                    {isUser ? (
                        <p className="text-sm">{message.text}</p>
                    ) : (
                        renderAIContent()
                    )}
                </div>
            </div>
            {isUser && (
                <Avatar className="h-8 w-8 bg-primary text-white">
                    <AvatarFallback><User size={16} /></AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}
