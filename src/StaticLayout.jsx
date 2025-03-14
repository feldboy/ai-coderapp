import React from 'react';

function StaticLayout({ children }) {
    return (
        <div className="app-container">
            <div className="sidebar">
                <div className="sidebar-logo">
                    <img src="#" alt="StoryCraft" />
                </div>
                <div className="sidebar-menu">
                    <a href="#" className="menu-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        Chat
                    </a>
                    <a href="#" className="menu-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 18h4V8H4v10zm0-12h4v8H4V6zm16 12h4v-8h-4v8zm0-10v8h4V6h-4z" />
                        </svg>
                        Stories
                    </a>
                    <a href="#" className="menu-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        Profile
                    </a>
                </div>
                <a href="#" className="logout">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 13l4 4 4-4h-3V9H5zm11-4h2v6h-2zm0 8h2v2h-2zm-6 0h2v2h-2z" />
                    </svg>
                    Logout
                </a>
            </div>

            <div className="content">
                <div className="help-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                </div>

                <div className="welcome-card">
                    <h1 className="welcome-title">Welcome to StoryCraft</h1>
                    <p className="welcome-text">Start crafting your user stories by typing your task idea below. Try adding "stickers" to control the level of detail.</p>

                    <div className="examples-container">
                        <div className="example-card">
                            <h3 className="example-title">Example:</h3>
                            <p className="example-text">"filter products by price"</p>
                            <p className="example-description">For a brief user story with basic suggestions</p>
                        </div>
                        <div className="example-card">
                            <h3 className="example-title">Try with "Detailed" sticker:</h3>
                            <p className="example-text">"login with fingerprint"</p>
                            <p className="example-description">For a detailed INVEST analysis and more suggestions</p>
                        </div>
                    </div>
                </div>

                <div className="options-container">
                    <div className="option">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                        Detailed
                    </div>
                    <div className="option">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.93 19.07A10 10 0 1 1 19.07 4.93 10 10 0 0 1 4.93 19.07zm5.5-5.5a5 5 0 0 0 7.07 7.07 5 5 0 0 0-7.07-7.07z" />
                        </svg>
                        Long Description
                    </div>
                </div>

                <div className="input-container">
                    <input type="text" className="input-box" placeholder="Type your task idea or user story here..." />
                    <button className="send-button">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default StaticLayout;
