import React, { useState } from "react";
import { Send, Search, Edit3 } from "lucide-react";

import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import { Textarea } from "../ui/textarea";
import { cn } from "../../lib/utils"; // Corrected path to utils

export default function ChatInput({ onSendMessage, isLoading }) {
    const [message, setMessage] = useState("");
    const [activeSticker, setActiveSticker] = useState(null);

    const handleSend = () => {
        if (message.trim() && !isLoading) {
            onSendMessage(message, activeSticker);
            setMessage("");
            setActiveSticker(null);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const toggleSticker = (sticker) => {
        setActiveSticker(activeSticker === sticker ? null : sticker);
    };

    return (
        <div className="px-6 py-4 bg-background">
            <div className="flex items-center space-x-2 mb-2"> {/* Reduced vertical spacing */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="secondary" // Updated sticker button variant
                                size="sm"
                                className={cn(
                                    "px-3 py-1 rounded-full text-sm",
                                    activeSticker === "detailed" ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground" // Updated active and hover styles
                                )}
                                onClick={() => toggleSticker("detailed")}
                            >
                                <Search className="w-4 h-4 mr-1.5" />
                                Detailed
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Get detailed INVEST validation and suggestions</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="secondary" // Updated sticker button variant
                                size="sm"
                                className={cn(
                                    "px-3 py-1 rounded-full text-sm",
                                    activeSticker === "longDescription" ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground" // Updated active and hover styles
                                )}
                                onClick={() => toggleSticker("longDescription")}
                            >
                                <Edit3 className="w-4 h-4 mr-1.5" />
                                Long Description
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Get a more descriptive output</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="flex items-center rounded-full border border-input overflow-hidden"> {/* Updated input area styles: rounded-md */}
                <Textarea
                    className="flex-1 min-h-[50px] resize-none focus:outline-none focus:ring-0 border-0 bg-background rounded-full" // Updated background color to background
                    placeholder="Type your task idea or user story here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                />
                <Button
                    onClick={handleSend}
                    disabled={!message.trim() || isLoading}
                    className="h-auto p-3 rounded-full" // Removed background and hover styles from send button
                >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                </Button>
            </div>
        </div>
    );
}
