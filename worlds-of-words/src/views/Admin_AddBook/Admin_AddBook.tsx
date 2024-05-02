import { useState } from "react";
import './Admin_AddBook.css';
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare, AiOutlineUser } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';

export default function Admin_AddBook() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogo(){
        navigate("/admin_mainpage");

    }


    async function handleAdminUsers(){
        navigate("/admin_users");

    }

    async function handleLogin(){
        navigate("/login");

    }

    return(
        <div className="adminaddbook-container">
        <div className="background-adminaddbook">ADMIN</div>
        <header>
            <div className="logo2-section">
                <img src={logo} onClick={handleLogo}/>
            </div>
            <nav>
                <ul className="menu2-bar">
                    <li className="addbook-section" ><AiOutlinePlusSquare className="menu2-icon"/> DODAJ KSIĄŻKĘ</li>
                    <li className="menu3-section" onClick={handleAdminUsers}><AiOutlineUser className="menu2-icon"/> UŻYTKOWNICY</li>
                    <li className="menu2-section" onClick={handleLogin}><LuLogOut className="menu2-icon"/> WYLOGUJ SIE</li>
                </ul>
            </nav>
        </header>

        <div className="adminaddbook-background"></div>

        <div className="adminaddbook2-container">
            <div className="adminaddbook-addimage">
                
                <div>
                <AiOutlinePlusSquare className="adminaddbook-icon-addimage"/>
                <text>DODAJ OKŁADKĘ</text>
                </div>

            </div>
            <div className="admiaddbook-informationadd">
                <input type="text" className="adminaddbook-addtitle" placeholder="DODAJ TYTUŁ"/>
                <input type="text" className="adminaddbook-addauthor" placeholder="DODAJ AUTORA"/>
                <input type="text" className="adminaddbook-addcategory" placeholder="DODAJ KATEGORIĘ"/>
                <textarea className="adminaddbook-adddescription" placeholder="DODAJ OPIS KSIĄŻKI"/>
                <button>DODAJ KSIĄŻKĘ</button>
            </div>
        </div>

        

        
    </div>

    );
}