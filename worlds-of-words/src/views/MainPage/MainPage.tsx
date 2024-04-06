import React, { useState } from "react";
import './MainPage.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineBars, AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { LuLogOut, LuHelpCircle } from "react-icons/lu";

export default function MainPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function myaccount(){
        navigate("/myaccount");
    }

    async function mainpage(){

    }

    return(
        <div className="mainpage-container">
            <header>
                <div className="logo2-section">
                    <img src="../worlds-of-words/assets/Image/logo2.jpg" />
                </div>
                <nav>
                    <ul className="menu-bar">
                        <li className="menu-section"><AiOutlineBars className="menu-icon"/> KATEGORIE</li>
                        <li className="menu-section" onClick={myaccount}><AiOutlineUser className="menu-icon"/> MOJE KONTO</li>
                        <li className="menu-section"><AiOutlineHeart className="menu-icon"/> ULUBIONE</li>
                        <li className="menu-section"><LuLogOut className="menu-icon"/> WYLOGUJ SIE</li>
                    </ul>
                </nav>
                <LuHelpCircle className="help-icon"/>
            </header>
            <main className="search-section">
                <h2 className="search-book">Znajdź książkę dla siebie</h2>
                <input className= "search-box" type="text" placeholder="Wyszukaj..." />
                <AiOutlineSearch className="search-icon"/>
                <div className="book-image">
                    <img src="../worlds-of-words/assets/Image/ksiazki1.jpg" />
                </div>
                
            </main>
        </div>

    );
}

