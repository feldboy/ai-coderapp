import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MessageCircle, ListChecks, HelpCircle, User, LogOut } from "lucide-react";
import { User as UserEntity } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Layout({ children }) {
 const [isOpen, setIsOpen] = useState(false);
 const location = useLocation();
 
 const isActivePath = (path) => {
   return location.pathname === createPageUrl(path);
 };

 const handleLogout = async () => {
   await UserEntity.logout();
 };

 return (
   <div className="flex flex-col min-h-screen bg-gray-50">
     {/* Header - Simplified for mobile focus */}
     <header className="bg-white border-b border-gray-200 py-3 px-4 sticky top-0 z-10">
       <div className="flex justify-between items-center">
         <div className="flex items-center">
           <Link to={createPageUrl("chat")} className="font-bold text-xl text-blue-600">
             StoryCraft
           </Link>
         </div>
         <div className="flex items-center gap-2">
           <Link to={createPageUrl("help")}>
             <Button variant="ghost" size="icon" className="text-gray-500">
               <HelpCircle size={20} />
             </Button>
           </Link>
           <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
             <Avatar className="h-8 w-8 bg-blue-100">
               <AvatarFallback className="text-blue-600">U</AvatarFallback>
             </Avatar>
           </Button>
         </div>
       </div>
     </header>

     {/* Mobile menu - Simplified navigation */}
     {isOpen && (
       <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2">
         <div className="flex flex-col space-y-2">
           <Link 
             to={createPageUrl("chat")} 
             className={`flex items-center gap-2 p-2 rounded-lg ${isActivePath("chat") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}
             onClick={() => setIsOpen(false)}
           >
             <MessageCircle size={20} className="text-blue-600" />
             <span>Chat</span>
           </Link>
           <Link 
             to={createPageUrl("stories")} 
             className={`flex items-center gap-2 p-2 rounded-lg ${isActivePath("stories") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}
             onClick={() => setIsOpen(false)}
           >
             <ListChecks size={20} className="text-blue-600" />
             <span>My Stories</span>
           </Link>
           <Button variant="ghost" className="flex items-center justify-start gap-2 p-2" onClick={handleLogout}>
             <LogOut size={20} className="text-blue-600" />
             <span>Logout</span>
           </Button>
         </div>
       </div>
     )}

     {/* Main content area with sidebar for larger screens */}
     <div className="flex flex-1">
       {/* Sidebar - Simplified for desktop */}
       <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-200 p-4">
         <div className="space-y-2">
           <Link 
             to={createPageUrl("chat")} 
             className={`flex items-center gap-2 p-2 rounded-lg ${isActivePath("chat") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}
           >
             <MessageCircle size={20} className="text-blue-600" />
             <span>Chat</span>
           </Link>
           <Link 
             to={createPageUrl("stories")} 
             className={`flex items-center gap-2 p-2 rounded-lg ${isActivePath("stories") ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}
           >
             <ListChecks size={20} className="text-blue-600" />
             <span>My Stories</span>
           </Link>
         </div>
         <div className="mt-auto">
           <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
             <LogOut size={20} className="mr-2 text-blue-600" />
             <span>Logout</span>
           </Button>
         </div>
       </aside>

       {/* Main content - Full height for chat-centric design */}
       <main className="flex-1 flex flex-col overflow-hidden">
         {children}
       </main>
     </div>

     {/* Theme variables - Adjusted for a cleaner, more mobile-friendly look */}
     <style jsx global>{`
       :root {
         --primary: #3b82f6;
         --primary-foreground: white;
         --background: #f9fafb;
         --foreground: #111827;
         --card: white;
         --card-foreground: #111827;
         --popover: white;
         --popover-foreground: #111827;
         --secondary: #f3f4f6;
         --secondary-foreground: #111827;
         --muted: #f3f4f6;
         --muted-foreground: #6b7280;
         --accent: #f3f4f6;
         --accent-foreground: #111827;
         --destructive: #ef4444;
         --destructive-foreground: white;
         --border: #e5e7eb;
         --input: #e5e7eb;
         --ring: #3b82f6;
         --radius: 0.5rem;
       }
     `}</style>
   </div>
 );
}