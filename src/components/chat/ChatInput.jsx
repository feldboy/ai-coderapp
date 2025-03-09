import React, { useState } from "react";
import { Send, Search, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
   <div className="bg-white border-t border-gray-200 p-4">
     <div className="flex items-center gap-2 mb-2">
       <TooltipProvider>
         <Tooltip>
           <TooltipTrigger asChild>
             <Button
               variant="ghost"
               size="sm"
               className={`flex items-center gap-1 px-2 ${
                 activeSticker === "detailed" ? "bg-blue-100 text-blue-600" : ""
               }`}
               onClick={() => toggleSticker("detailed")}
             >
               <Search size={16} />
               <span className="text-xs">Detailed</span>
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
               variant="ghost"
               size="sm"
               className={`flex items-center gap-1 px-2 ${
                 activeSticker === "longDescription" ? "bg-blue-100 text-blue-600" : ""
               }`}
               onClick={() => toggleSticker("longDescription")}
             >
               <Edit3 size={16} />
               <span className="text-xs">Long Description</span>
             </Button>
           </TooltipTrigger>
           <TooltipContent>
             <p>Get a more descriptive output</p>
           </TooltipContent>
         </Tooltip>
       </TooltipProvider>
     </div>

     <div className="flex gap-2">
       <div className="flex-1 relative">
         <textarea
           className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
           placeholder="Type your task idea or user story here..."
           value={message}
           onChange={(e) => setMessage(e.target.value)}
           onKeyDown={handleKeyDown}
           rows={1}
           disabled={isLoading}
           style={{ minHeight: "44px", maxHeight: "120px" }}
         />
       </div>
       <Button
         onClick={handleSend}
         disabled={!message.trim() || isLoading}
         className="h-full aspect-square"
       >
         <Send size={18} />
       </Button>
     </div>
   </div>
 );
}