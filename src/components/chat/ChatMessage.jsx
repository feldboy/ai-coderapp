import React from "react";
import { User, Bot } from "lucide-react";

import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "../../lib/utils"; // Corrected path to utils

export default function ChatMessage({ message, isUser }) {
    const renderAIContent = () => {
        if (!message.content || typeof message.content !== "object") {
            return <p className="text-sm">{message.text}</p>; // Reduced font size for regular text
        }

        const content = message.content;

        return (
            <div className="space-y-2">
                {content.storyText && (
                    <Card className="w-full bg-popover border"> {/* Updated Card styles: background, border, width */}
                        <CardContent>
                            <h3 className="text-sm font-semibold mb-1 text-primary">User Story:</h3> {/* Reduced font size for titles */}
                            <p className="text-sm text-foreground">{content.storyText}</p> {/* Reduced font size for content */}
                        </CardContent>
                    </Card>
                )}

                {content.improvementSuggestion && (
                    <Card className="w-full bg-popover border"> {/* Updated Card styles: background, border, width */}
                        <CardContent>
                            <h3 className="text-sm font-semibold mb-1 text-primary">Improvement Suggestion:</h3> {/* Reduced font size for titles */}
                            <p className="text-sm text-foreground">{content.improvementSuggestion}</p> {/* Reduced font size for content */}
                        </CardContent>
                    </Card>
                )}

                {content.investValidation && (
                    <Card className="w-full bg-popover border"> {/* Updated Card styles: background, border, width */}
                        <CardContent>
                            <h3 className="text-sm font-semibold mb-1 text-primary">INVEST Validation:</h3> {/* Reduced font size for titles */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-foreground"> {/* Reduced font size for grid text */}
                                {Object.entries(content.investValidation).map(([key, value]) => (
                                    <div key={key}>
                                        <span className="font-medium capitalize text-primary">{key}: </span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="flex justify-end pt-1">
                    <Badge variant="secondary" className="text-xs text-muted-foreground"> {/* Updated Badge variant and styles */}
                        {message.detailedMode ? "Detailed" : "Brief"}
                    </Badge>
                </div>
            </div>
        );
    };

    return (
        <div className={`flex gap-3 my-2 ${isUser ? "justify-end" : "justify-start"}`}> {/* Reduced vertical margin */}
            {!isUser && (
                <Avatar className="bg-secondary"> {/* Updated Avatar styles: background, border */}
                    <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
            )}
            <div className="flex-1">
                <div
                    className={cn(
                        "rounded-xl p-4 text-sm", // Reduced padding and font size for message text
                        isUser ? "bg-primary text-primary-foreground rounded-br-none" : "bg-secondary rounded-tl-none" // Updated message bubble styles
                    )}
                >
                    {isUser ? (
                        <p className="text-sm">{message.text}</p> // Reduced font size for user messages
                    ) : (
                        renderAIContent()
                    )}
                </div>
            </div>
            {isUser && (
                <Avatar className="bg-primary"> {/* Updated Avatar styles: background, border */}
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}
