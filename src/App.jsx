// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Chat from './pages/Chat';
import Stories from './pages/Stories';
import Help from './pages/Help';
import Profile from './pages/Profile';
import { ToastProvider } from './components/ui/use-toast'; // Import ToastProvider

function App() {
  return (
    <ToastProvider> {/* Wrap your app with ToastProvider */}
      <Layout>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          {/* Add other routes as needed */}
        </Routes>
      </Layout>
    </ToastProvider>
  );
}

export default App;