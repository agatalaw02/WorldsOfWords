import React from 'react';
import './App.css';
import Login from "./views/Login/Login";
import Register from "./views/Register/Register"; // Import your Register component
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          {/* Add as many routes as you need */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </Router>
  );
}

export default App;
