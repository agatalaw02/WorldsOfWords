import { useState } from "react";
import './Categories.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineBars, AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { LuLogOut, LuHelpCircle } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import thebest from '../../assets/Book/hobbit-czyli-tam-i-z-powrotem-b-iext140202568.webp'

export default function Categories() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogo(){
        navigate("/mainpage");

    }

    async function handleMyAccount(){
        navigate("/myaccount");
    }

    async function handleFavourite(){
        navigate("/favourite");

    }

    async function handleLogin(){
        navigate("/login");

    }

    async function handleHelp(){
        navigate("/help");
    }

    return(
        <div className="categories-container">
        <header>
            <div className="logo2-section">
                <img src={logo} onClick={handleLogo}/>
            </div>
            <nav>
                <ul className="menu-bar">
                    <li className="categories-section"><AiOutlineBars className="menu-icon"/> KATEGORIE</li>
                    <li className="menu-section" onClick={handleMyAccount}><AiOutlineUser className="menu-icon"/> MOJE KONTO</li>
                    <li className="menu-section" onClick={handleFavourite}><AiOutlineHeart className="menu-icon"/> ULUBIONE</li>
                    <li className="menu-section" onClick={handleLogin}><LuLogOut className="menu-icon"/> WYLOGUJ SIE</li>
                </ul>
            </nav>
            <LuHelpCircle className="help-icon" onClick={handleHelp}/>
        </header>

        <div className="categories2-container">
            <div className="categories3-container">
                <text className='categories2-section'>
                    KATEGORIE
                </text>
                <li>
                    <button>ROMAS</button>
                    <button>FANTASTYKA</button>
                    <button>KRYMINAŁ</button>
                    <button>SCIENCE FICTION</button>
                    <button>HISTORIA</button>
                    <button>TURYSTYKA</button>
                    <button>BIOGRAFIE</button>
                    <button>BIZNES</button>
                    <button>KUCHNIA I DIETY</button>
                    <button>LITERATURA OBYCZAJOWA</button>
                    <button>PORADNIKI</button>
                </li>
                
            </div>

            <div className="categories4-container">
                <input className= "search-box-categories" type="text" placeholder="Wyszukaj..." />
                <AiOutlineSearch className="search-icon-categories"/>

                    <ul className="categories-books-section">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <li key={index} className="background-book-categories">
                                    <img src={thebest} className="book-categories" />
                                    <text className="title-book-categories">
                                    HOBBIT, CZYLI TAM I SPOWROTEM
                                    </text>
                                    <button className="button-book-categories">
                                    ZOBACZ
                                    </button> 
                                
                            </li>
                        ))}
                    </ul>
            </div>   
        </div>

        
    </div>

    );
}