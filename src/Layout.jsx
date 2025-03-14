import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "./utils";
import { MessageCircle, ListChecks, User, LogOut, HelpCircle } from "lucide-react";
import { User as UserEntity } from "./entities/User";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback } from "./components/ui/avatar";

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const handleLogout = async () => {
        await UserEntity.logout();
        // Redirect to login page after logout
        navigate('/');
    };

    return (
        <div className="app-container">
            <div className="sidebar">
                <div className="sidebar-logo">
                    <Link to={createPageUrl("Chat")} className="font-bold text-xl text-gray-800">
                        StoryCraft
                    </Link>
                </div>
                <div className="sidebar-menu">
                    <Link
                        to={createPageUrl("Chat")}
                        className={`menu-item ${currentPath === "/" || currentPath === "/chat" ? "bg-gray-100 text-gray-900 border-l-primary" : ""}`}
                    >
                        <MessageCircle size={20} />
                        Chat
                    </Link>
                    <Link
                        to={createPageUrl("Stories")}
                        className={`menu-item ${currentPath === "/stories" ? "bg-gray-100 text-gray-900 border-l-primary" : ""}`}
                    >
                        <ListChecks size={20} />
                        Stories
                    </Link>
                    <Link
                        to={createPageUrl("Profile")}
                        className={`menu-item ${currentPath === "/profile" ? "bg-gray-100 text-gray-900 border-l-primary" : ""}`}
                    >
                        <User size={20} />
                        Profile
                    </Link>
                </div>
                <Button 
                    variant="ghost" 
                    className="logout" 
                    onClick={handleLogout}
                >
                    <LogOut size={16} />
                    Logout
                </Button>
            </div>

            <div className="content">
                <div className="help-icon">
                    <Link to={createPageUrl("Help")}>
                        <HelpCircle size={24} />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
