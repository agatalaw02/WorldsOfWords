import { useState } from "react";
import './MyAccount.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineBars, AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { LuLogOut, LuHelpCircle } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import avatar from '../../assets/Avatar/avatar1.jpg'


export default function MyAccount() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogo(){
        navigate("/mainpage");

    }

    async function handleCategories(){
        navigate("/categories");
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
        <div className="myaccount-container">
        <header>
            <div className="logo2-section">
                <img src={logo} onClick={handleLogo}/>
            </div>
            <nav>
                <ul className="menu-bar">
                    <li className="menu-section" onClick={handleCategories}><AiOutlineBars className="menu-icon"/> KATEGORIE</li>
                    <li className="myaccount-section" ><AiOutlineUser className="menu-icon"/> MOJE KONTO</li>
                    <li className="menu-section" onClick={handleFavourite}><AiOutlineHeart className="menu-icon"/> ULUBIONE</li>
                    <li className="menu-section" onClick={handleLogin}><LuLogOut className="menu-icon"/> WYLOGUJ SIE</li>
                </ul>
            </nav>
            <LuHelpCircle className="help-icon" onClick={handleHelp}/>
        </header>

        <div className="myaccount-container2">
            <header>
                <h1 className="myaccount-h1">MOJE KONTO</h1>
            </header>

            <div className="daneMyaccount">
                <div className="avatar-myaccount">
                    <img src={avatar} /> 
                </div>
                
                <form>
                    <div className="daneClient-section">
                        <text className="text-section">NAZWA UŻYTKOWNIKA </text>
                        <input type="text" placeholder="" readOnly/>
                        <text className="text-section">E-MAIL </text>
                        <input type="email" placeholder="" readOnly/>
                    </div>
                        <button className="edit-button">EDYTUJ</button>
                        <button className="delete-button">USUŃ KONTO</button>
                </form>
            </div>

        </div>
        
    </div>

    );
}
