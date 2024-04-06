import React from 'react';
import './App.css';
import Login from "./views/Login/Login";
import Register from "./views/Register/Register"; // Import your Register component
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './views/MainPage/MainPage';
import MyAccount from './views/MyAccount/MyAccount';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/mainpage" element={<MainPage />} /> 
          <Route path="/myaccount" element={<MyAccount />} /> 
          {/* Add as many routes as you need */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </Router>
  );
}

export default App;
