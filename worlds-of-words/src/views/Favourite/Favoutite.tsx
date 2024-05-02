import { useState } from "react";
import './Favourite.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineBars, AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { LuLogOut, LuHelpCircle } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import thebest from '../../assets/Book/hobbit-czyli-tam-i-z-powrotem-b-iext140202568.webp'

export default function Favourite() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogo(){
        navigate("/mainpage");

    }

    async function handleCategories(){
        navigate("/categories");
    }

    async function handleMyAccount(){
        navigate("/myaccount");

    }

    async function handleLogin(){
        navigate("/login");

    }

    async function handleHelp(){
        navigate("/help");
    }

    return(
        <div className="favourite-container">
        <header>
            <div className="logo2-section">
                <img src={logo} onClick={handleLogo}/>
            </div>
            <nav>
                <ul className="menu-bar">
                    <li className="menu-section" onClick={handleCategories}><AiOutlineBars className="menu-icon"/> KATEGORIE</li>
                    <li className="menu-section" onClick={handleMyAccount}><AiOutlineUser className="menu-icon"/> MOJE KONTO</li>
                    <li className="favourite-section"><AiOutlineHeart className="menu-icon"/> ULUBIONE</li>
                    <li className="menu-section" onClick={handleLogin}><LuLogOut className="menu-icon"/> WYLOGUJ SIE</li>
                </ul>
            </nav>
            <LuHelpCircle className="help-icon" onClick={handleHelp}/>
        </header>

        <div className="favourite-and-categories-container">
            <div className="favourite-categories-container">
                <text className='favourite-categories-section'>
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

            <div className="favourite2-container">
                <text className="favourite-books">
                        ULUBIONE
                </text>
                    <ul className="favourite-books-section">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <li key={index} className="background-book-favourite">
                                    <img src={thebest} className="book-favourite" />
                                    <text className="title-book-favourite">
                                    HOBBIT, CZYLI TAM I SPOWROTEM
                                    </text>
                                    <button className="button-book-favourite">
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
