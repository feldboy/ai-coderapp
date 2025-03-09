import React, { useState, useRef, useEffect } from "react";
import { Story } from "@/entities/Story";
import { InvokeLLM } from "@/integrations/Core";
import ChatInput from "../components/chat/ChatInput";
import ChatMessage from "../components/chat/ChatMessage";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

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
   // Add user message
   const userMessage = { id: Date.now(), text, isUser: true };
   setMessages((prev) => [...prev, userMessage]);
  
   setIsLoading(true);
   setCanSave(false);

   try {
     const detailedMode = sticker === "detailed" || sticker === "longDescription";
     const longDescription = sticker === "longDescription";

     // Prepare system instructions for the AI
     const systemInstructions = `
       You are 'StoryCraft AI', an expert in Agile User Story and Task creation. Your goal is to help users create high-quality user stories and tasks based on their brief descriptions.
      
       Apply the following principles to every output:
       1. INVEST Principles: Ensure stories are Independent, Negotiable, Valuable, Estimable, Small, and Testable.
       2. 3 C's Approach: Generate Card-like stories, designed to spark Conversation and lead to Confirmation (acceptance criteria).
       3. Persona-Driven: If a user persona is provided or implied, tailor the story to that persona's needs.
       4. Strategic Alignment: Consider how the story might align with broader business objectives (if context is available).
       5. Collaborative Refinement: Think about aspects that would encourage team discussion and refinement.
       6. Definition of Done (DoD): Implicitly aim for stories that are testable and have clear conditions of satisfaction.

       ${detailedMode ? "Provide a detailed analysis including INVEST validation breakdown, persona context, and collaboration points." : ""}
       ${longDescription ? "Provide a more detailed and descriptive output, including detailed acceptance criteria." : ""}
      
       IMPORTANT: Return a JSON object with the following structure:
       {
         "storyText": "As a [persona], I want [action] so that [benefit]",
         "title": "A concise title for the story",
         "description": "More details about the story",
         "investValidation": {
           "independent": "Assessment of independence",
           "negotiable": "Assessment of negotiability",
           "valuable": "Assessment of value",
           "estimable": "Assessment of estimability",
           "small": "Assessment of size",
           "testable": "Assessment of testability"
         },
         "acceptanceCriteria": ["criteria 1", "criteria 2", "criteria 3"],
         "personaContext": "Additional context about the user persona",
         "collaborationPoint": "Suggested points for team discussion",
         "improvementSuggestion": "Suggestion to improve the user story"
       }

       Format your response to be clear, actionable, and tailored for easy reading on a mobile device.
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
               testable: { type: "string" }
             }
           },
           acceptanceCriteria: {
             type: "array",
             items: { type: "string" }
           },
           personaContext: { type: "string" },
           collaborationPoint: { type: "string" },
           improvementSuggestion: { type: "string" }
         }
       }
     });

     // Add AI message
     const aiMessage = {
       id: Date.now() + 1,
       content: result,
       isUser: false,
       detailedMode
     };
    
     setMessages((prev) => [...prev, aiMessage]);
     setCanSave(true);
   } catch (error) {
     console.error("Error getting AI response:", error);
     toast({
       variant: "destructive",
       title: "Error",
       description: "Failed to get a response. Please try again."
     });
   } finally {
     setIsLoading(false);
   }
 };

 const handleSaveStory = async () => {
   try {
     const lastAiMessage = [...messages].reverse().find(m => !m.isUser);
    
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
         createdAt: new Date()
       };
      
       const newStory = await Story.create(storyData);
       
       toast({
         title: "Success",
         description: "Story saved successfully!"
       });
       
       navigate(createPageUrl("stories", newStory.id));
     }
   } catch (error) {
     console.error("Error saving story:", error);
     toast({
       variant: "destructive",
       title: "Error",
       description: "Failed to save the story. Please try again."
     });
   }
 };

 return (
   <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
     <h1 className="text-2xl font-bold mb-4">StoryCraft AI</h1>
     
     <Card className="flex-grow overflow-hidden mb-4">
       <CardContent className="p-4 h-full overflow-y-auto">
         <div className="flex flex-col space-y-4">
           {messages.length === 0 ? (
             <div className="text-center text-gray-500 my-8">
               <p className="text-lg mb-2">Welcome to StoryCraft AI!</p>
               <p>Describe your feature or task, and I'll help you craft it into a proper user story.</p>
             </div>
           ) : (
             messages.map((message) => (
               <ChatMessage key={message.id} message={message} />
             ))
           )}
           {isLoading && (
             <div className="flex items-center justify-center py-4">
               <Loader2 className="h-6 w-6 animate-spin text-primary" />
               <span className="ml-2">Crafting your story...</span>
             </div>
           )}
           <div ref={messagesEndRef} />
         </div>
       </CardContent>
     </Card>
     
     <div className="flex items-center gap-2 mb-2">
       <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
       
       {canSave && (
         <Button 
           onClick={handleSaveStory} 
           className="flex-shrink-0"
           variant="outline"
         >
           <Save className="h-4 w-4 mr-2" />
           Save
         </Button>
       )}
     </div>
   </div>
 );
}