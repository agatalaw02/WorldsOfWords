import React, { useState } from "react";
import './MainPage.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineBars, AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { LuLogOut, LuHelpCircle } from "react-icons/lu";
import logo from '../../assets/Image/logo.png'
import book from '../../assets/Image/ksiazki1.png'
import thebest from '../../assets/Book/hobbit-czyli-tam-i-z-powrotem-b-iext140202568.webp'

export default function MainPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function myaccount(){
        navigate("/myaccount");
    }

    async function login(){
        navigate("/login");
    }

    async function mainpage(){

    }

    return(
        <div className="mainpage-container">
            <header>
                <div className="logo2-section">
                    <img src={logo} />
                </div>
                <nav>
                    <ul className="menu-bar">
                        <li className="menu-section"><AiOutlineBars className="menu-icon"/> KATEGORIE</li>
                        <li className="menu-section" onClick={myaccount}><AiOutlineUser className="menu-icon"/> MOJE KONTO</li>
                        <li className="menu-section"><AiOutlineHeart className="menu-icon"/> ULUBIONE</li>
                        <li className="menu-section" onClick={login}><LuLogOut className="menu-icon"/> WYLOGUJ SIE</li>
                    </ul>
                </nav>
                <LuHelpCircle className="help-icon"/>
            </header>
            <div className="search-section">
                <div className="background-find-book"/>
                <h2 className="search-book">Znajdź książkę dla siebie</h2>
                <input className= "search-box" type="text" placeholder="Wyszukaj..." />
                <AiOutlineSearch className="search-icon"/>
                <div className="book-image">
                    <img src={book}/>
                </div>
                <div className="the-best-books-background"/>
                <text className="text-the-best-books">
                    NAJLEPIEJ OCENIANE KSIĄŻKI
                </text>

                <div className="bestbook1background"/>
                    <img src={thebest} className="book1-the-best" />
                    <text className="title1-the-best">
                        HOBBIT, CZYLI TAM I SPOWROTEM
                        </text>
                    <button className="thebestbutton1">
                        ZOBACZ
                    </button>

                <div className="bestbook2background"/>
                    <img src={thebest} className="book2-the-best" />
                    <text className="title2-the-best">
                        HOBBIT, CZYLI TAM I SPOWROTEM2
                        </text>
                    <button className="thebestbutton2">
                        ZOBACZ
                    </button>

                <div className="bestbook3background"/>
                    <img src={thebest} className="book3-the-best" />
                    <text className="title3-the-best">
                        HOBBIT, CZYLI TAM I SPOWROTEM3
                        </text>
                    <button className="thebestbutton3">
                        ZOBACZ
                    </button>

                <text className="last-adds">
                    OSTATNIO DODANE
                </text>
                <ul className="last-adds-books-section">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <li key={index} className="background-book">
                                <img src={thebest} className="book-last" />
                                <text className="title-book-last">
                                HOBBIT, CZYLI TAM I SPOWROTEM3
                                </text>
                                <button className="button-book-last">
                                ZOBACZ
                                </button> 
                            
                        </li>
                    ))}
                </ul>
            </div>
            <footer className="footer1-container">
                Wszelkie prawa zastrzeżone - Worlds of Words 2024
            </footer>

        </div>
        

    );
}

