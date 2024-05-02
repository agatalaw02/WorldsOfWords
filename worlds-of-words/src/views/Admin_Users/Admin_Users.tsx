import { useState } from "react";
import './Admin_Users.css';
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare, AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import avatar from '../../assets/Avatar/avatar1.jpg'

export default function Admin_Users() {
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
        <div className="adminusers-container">
        <div className="background-adminusers">ADMIN</div>
        <header>
            <div className="logo2-section">
                <img src={logo} onClick={handleLogo}/>
            </div>
            <nav>
                <ul className="menu2-bar">
                    <li className="menu2-section" onClick={handleAdminAddBook}><AiOutlinePlusSquare className="menu2-icon"/> DODAJ KSIĄŻKĘ</li>
                    <li className="user-section" ><AiOutlineUser className="menu2-icon"/> UŻYTKOWNICY</li>
                    <li className="menu2-section" onClick={handleLogin}><LuLogOut className="menu2-icon"/> WYLOGUJ SIE</li>
                </ul>
            </nav>
        </header>

        <div className="background-list-adminusers"></div>
        

        <div className="adminusers2-container">
            <input className= "search-box-adminusers" type="text" placeholder="Wyszukaj..." />
            <AiOutlineSearch className="search-icon-adminusers"/>   

            <table>
                <li>
                    <img src={avatar} />
                    <text className="username">Nazwa użytkownika</text>
                    <text className="useremail">Adres e-mail</text>
                    <button>ZABLOKUJ</button>
                </li>

                <li>
                    <img src={avatar} />
                    <text className="username">Nazwa użytkownika</text>
                    <text className="useremail">Adres e-mail</text>
                    <button>ZABLOKUJ</button>
                </li>

                <li>
                    <img src={avatar} />
                    <text className="username">Nazwa użytkownika</text>
                    <text className="useremail">Adres e-mail</text>
                    <button>ZABLOKUJ</button>
                </li>
            </table>
        </div>

        
    </div>

    );
}