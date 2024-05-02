import React from 'react';
import './App.css';
import Login from "./views/Login/Login";
import Register from "./views/Register/Register"; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './views/MainPage/MainPage';
import MyAccount from './views/MyAccount/MyAccount';
import Help from './views/Help/Help';
import Book from './views/Book/Book';
import Favourite from './views/Favourite/Favoutite';
import Categories from './views/Categories/Categories';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/mainpage" element={<MainPage />} /> 
          <Route path="/myaccount" element={<MyAccount />} /> 
          <Route path="/help" element={<Help />} /> 
          <Route path="/book" element={<Book />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/categories" element={<Categories />} />
          {/* Add as many routes as you need */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </Router>
  );
}

export default App;
