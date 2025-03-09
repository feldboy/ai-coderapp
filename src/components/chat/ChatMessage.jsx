import React from "react";
import { User, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ChatMessage({ message, isUser }) {
 const renderAIContent = () => {
   if (!message.content || typeof message.content !== "object") {
     return <p>{message.text}</p>;
   }

   const content = message.content;

   return (
     <div className="space-y-4">
       <div>
         <h3 className="font-semibold mb-2">User Story:</h3>
         <p className="bg-blue-50 p-3 rounded-lg">{content.storyText}</p>
       </div>

       {content.improvementSuggestion && (
         <div>
           <h3 className="font-semibold mb-2">Improvement Suggestion:</h3>
           <p>{content.improvementSuggestion}</p>
         </div>
       )}

       {content.investValidation && message.detailedMode && (
         <div>
           <h3 className="font-semibold mb-2">INVEST Validation:</h3>
           <ul className="list-disc pl-5 space-y-1">
             {Object.entries(content.investValidation).map(([key, value]) => (
               <li key={key}>
                 <span className="font-medium capitalize">{key}:</span> {value}
               </li>
             ))}
           </ul>
         </div>
       )}

       {content.personaContext && message.detailedMode && (
         <div>
           <h3 className="font-semibold mb-2">Persona Context:</h3>
           <p>{content.personaContext}</p>
         </div>
       )}

       {content.collaborationPoint && message.detailedMode && (
         <div>
           <h3 className="font-semibold mb-2">Collaboration Point:</h3>
           <p>{content.collaborationPoint}</p>
         </div>
       )}

       {content.acceptanceCriteria && content.acceptanceCriteria.length > 0 && (
         <div>
           <h3 className="font-semibold mb-2">Acceptance Criteria:</h3>
           <ul className="list-disc pl-5 space-y-1">
             {content.acceptanceCriteria.map((criterion, index) => (
               <li key={index}>{criterion}</li>
             ))}
           </ul>
         </div>
       )}

       <div className="flex justify-end pt-2">
         <Badge variant="outline" className="text-xs">
           {message.detailedMode ? "Detailed" : "Brief"}
         </Badge>
       </div>
     </div>
   );
 };

 return (
   <div
     className={`flex gap-3 mb-4 ${
       isUser ? "justify-end" : "justify-start"
     }`}
   >
     {!isUser && (
       <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
         <Bot size={16} className="text-blue-600" />
       </div>
     )}

     <Card className={`max-w-[80%] ${isUser ? "bg-primary text-primary-foreground" : ""}`}>
       <CardContent className="p-4">
         {isUser ? <p>{message.text}</p> : renderAIContent()}
       </CardContent>
     </Card>

     {isUser && (
       <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
         <User size={16} className="text-primary-foreground" />
       </div>
     )}
   </div>
 );
}