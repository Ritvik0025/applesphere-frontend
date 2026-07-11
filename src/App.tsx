import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import OrchardPage from './pages/orchard/Orchard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orchard" element={<OrchardPage />} />
        <Route path="/finance" element={<div style={{padding:'30px'}}>Finance coming soon</div>} />
        <Route path="/spray" element={<div style={{padding:'30px'}}>Spray schedule coming soon</div>} />
        <Route path="/climate" element={<div style={{padding:'30px'}}>Climate coming soon</div>} />
        <Route path="/marketplace" element={<div style={{padding:'30px'}}>Marketplace coming soon</div>} />
        <Route path="/community" element={<div style={{padding:'30px'}}>Community coming soon</div>} />
        <Route path="/market" element={<div style={{padding:'30px'}}>Market rates coming soon</div>} />
        <Route path="/ai" element={<div style={{padding:'30px'}}>AI Advisor coming soon</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;