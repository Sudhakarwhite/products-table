import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ProductsPage from './Productpage';
import LoginPage from './Component/Login/Loginpage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Component/header'; // Adjust import if needed
import Sidebar from './Component/sidebar'; // Adjust import if needed
import { Box } from '@mui/material';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Function to toggle the sidebar
  const handleSidebarToggle = () => setSidebarOpen(prev => !prev);

  // Function to close the sidebar
  const handleSidebarClose = () => setSidebarOpen(false);

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        handleSidebarClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Router>
      <Header onMenuClick={handleSidebarToggle} />
      <Sidebar ref={sidebarRef} open={sidebarOpen} onClose={handleSidebarClose} />
      <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<ProductsPage />} />
            {/* Add other routes here */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
