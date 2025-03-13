import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { MessageCircle, ListChecks, HelpCircle, User, LogOut } from "lucide-react";
import { User as UserEntity } from "./entities/User";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback } from "./components/ui/avatar";

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const handleLogout = async () => {
        await UserEntity.logout();
        // Redirect to login page after logout - to implement this you'll need useNavigate
    };

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar - visible on md and larger screens */}
            <aside className="hidden md:flex flex-col w-64 bg-secondary border-r border-gray-200">
                <div className="p-6 flex justify-center">
                    <Link to={createPageUrl("Chat")} className="font-bold text-xl text-gray-800">
                        StoryCraft
                    </Link>
                </div>
                <nav className="flex-1 px-2">
                    <Link
                        to={createPageUrl("Chat")}
                        className={`group flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${currentPath === "/" || currentPath === "/chat" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                    >
                        <MessageCircle size={18} className={`mr-3 ${currentPath === "/" || currentPath === "/chat" ? "text-primary" : "text-gray-500 group-hover:text-primary"}`} />
                        <span className={`${currentPath === "/" || currentPath === "/chat" ? "text-primary" : "text-gray-700"}`}>Chat</span>
                    </Link>
                    <Link
                        to={createPageUrl("Stories")}
                        className={`group flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${currentPath === "/stories" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                    >
                        <ListChecks size={18} className={`mr-3 ${currentPath === "/stories" ? "text-primary" : "text-gray-500 group-hover:text-primary"}`} />
                        <span className={`${currentPath === "/stories" ? "text-primary" : "text-gray-700"}`}>Stories</span>
                    </Link>
                    <Link
                        to={createPageUrl("Profile")}
                        className={`group flex items-center px-4 py-2.5 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${currentPath === "/profile" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                    >
                        <User size={18} className={`mr-3 ${currentPath === "/profile" ? "text-primary" : "text-gray-500 group-hover:text-primary"}`} />
                        <span className={`${currentPath === "/profile" ? "text-primary" : "text-gray-700"}`}>Profile</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <Button variant="ghost" className="w-full justify-start text-sm font-medium hover:bg-gray-100" onClick={handleLogout}>
                        <Avatar size="sm" className="mr-2">
                            <AvatarFallback className="text-gray-600 uppercase">U</AvatarFallback>
                        </Avatar>
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Mobile header and sidebar toggle */}
            <div className="flex flex-col flex-1 md:hidden">
                <header className="py-3 px-4 bg-white border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <Link to={createPageUrl("Chat")} className="font-bold text-xl text-gray-800">
                            StoryCraft
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-gray-600 uppercase">U</AvatarFallback>
                            </Avatar>
                        </Button>
                    </div>
                </header>

                {/* Mobile sidebar */}
                {isOpen && (
                    <div className="bg-white shadow-md">
                        <nav className="px-2 py-4">
                            <Link
                                to={createPageUrl("Chat")}
                                className={`block px-4 py-2.5 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${currentPath === "/" || currentPath === "/chat" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                            >
                                Chat
                            </Link>
                            <Link
                                to={createPageUrl("Stories")}
                                className={`block px-4 py-2.5 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${currentPath === "/stories" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                            >
                                Stories
                            </Link>
                            <Link
                                to={createPageUrl("Profile")}
                                className={`block px-4 py-2.5 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors ${currentPath === "/profile" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                            >
                                Profile
                            </Link>
                            <Button variant="ghost" className="w-full justify-start px-4 py-2.5 text-sm font-medium hover:bg-gray-100" onClick={handleLogout}>
                                Logout
                            </Button>
                        </nav>
                    </div>
                )}

                {/* Main content */}
                <main className="flex-1 p-6 md:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
