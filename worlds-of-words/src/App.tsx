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
import Admin_MainPage from './views/Admin_MainPage/Admin_MainPage'
import Admin_AddBook from './views/Admin_AddBook/Admin_AddBook'
import Admin_Users from './views/Admin_Users/Admin_Users'
import Admin_Book from './views/Admin_Book/Admin_Book'

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
          <Route path="/admin_mainpage" element={<Admin_MainPage />} />
          <Route path="/admin_addbook" element={<Admin_AddBook />} />
          <Route path="/admin_users" element={<Admin_Users />} />
          <Route path="/admin_book" element={<Admin_Book />} />
          {/* Add as many routes as you need */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </Router>
  );
}

export default App;
