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
import { cn } from "../../lib/utils";

export default function ChatInput({ onSendMessage, isLoading }) {
    const [message, setMessage] = useState("");
    const [selectedStyle, setSelectedStyle] = useState(null);

    const handleSend = () => {
        if (message.trim() && !isLoading) {
            onSendMessage(message, selectedStyle);
            setMessage("");
            setSelectedStyle(null);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleStyleSelect = (style) => {
        setSelectedStyle(selectedStyle === style ? null : style);
    };

    return (
        <div className="bg-background">
            <div className="options-container">
                <div
                    className={cn(
                        "option",
                        selectedStyle === "detail" ? "bg-blue-500 text-white" : "hover:bg-blue-100",
                        "cursor-pointer"
                    )}
                    onClick={() => handleStyleSelect("detail")}
                >
                    <span>Detail</span>
                </div>
                <div
                    className={cn(
                        "option",
                        selectedStyle === "long" ? "bg-blue-500 text-white" : "hover:bg-blue-100",
                        "cursor-pointer"
                    )}
                    onClick={() => handleStyleSelect("long")}
                >
                    <span>Long</span>
                </div>
                <div
                    className={cn(
                        "option",
                        selectedStyle === "brief" ? "bg-blue-500 text-white" : "hover:bg-blue-100",
                        "cursor-pointer"
                    )}
                    onClick={() => handleStyleSelect("brief")}
                >
                    <span>Brief</span>
                </div>
            </div>

            <div className="input-container">
                <Textarea
                    className="input-box"
                    placeholder="Type your task idea or user story here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    rows={1}
                />
                <Button
                    onClick={handleSend}
                    disabled={!message.trim() || isLoading}
                    className="send-button"
                    variant="ghost"
                >
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send message</span>
                </Button>
            </div>
        </div>
    );
}
