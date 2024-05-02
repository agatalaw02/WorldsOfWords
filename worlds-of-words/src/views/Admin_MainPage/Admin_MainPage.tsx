import { useState } from "react";
import './Admin_MainPage.css';
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare, AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import thebest from '../../assets/Book/hobbit-czyli-tam-i-z-powrotem-b-iext140202568.webp'

export default function Admin_MainPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogo(){
        navigate("/admin_mainpage");

    }

    async function handleAdminAddBook(){
        navigate("/admin_addbook");
    }

    async function handleAdminUsers(){
        navigate("/admin_users");

    }

    async function handleLogin(){
        navigate("/login");

    }

    return(
        <div className="adminmainpage-container">
            <div className="background-admin">ADMIN</div>
        <header>
            <div className="logo2-section">
                <img src={logo} onClick={handleLogo}/>
            </div>
            <nav>
                <ul className="menu2-bar">
                    <li className="menu2-section" onClick={handleAdminAddBook}><AiOutlinePlusSquare className="menu2-icon"/> DODAJ KSIĄŻKĘ</li>
                    <li className="menu3-section" onClick={handleAdminUsers}><AiOutlineUser className="menu2-icon"/> UŻYTKOWNICY</li>
                    <li className="menu2-section" onClick={handleLogin}><LuLogOut className="menu2-icon"/> WYLOGUJ SIE</li>
                </ul>
            </nav>
        </header>

        <div className="adminmainpage2-container">
            <div className="adminmainpage3-container">
                <text className='adminmainpage-section'>
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

            <div className="adminmainpage4-container">
                <input className= "search-box-adminmainpage" type="text" placeholder="Wyszukaj..." />
                <AiOutlineSearch className="search-icon-adminmainpage"/>

                    <ul className="adminmainpage-books-section">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <li key={index} className="background-book-adminmainpage">
                                    <img src={thebest} className="book-adminmainpage" />
                                    <text className="title-book-adminmainpage">
                                    HOBBIT, CZYLI TAM I SPOWROTEM
                                    </text>
                                    <button className="button-book-adminmainpage">
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