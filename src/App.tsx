import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<div>Register Coming</div>} />
        <Route path="/dashboard" element={<div>Dashboard Coming</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;