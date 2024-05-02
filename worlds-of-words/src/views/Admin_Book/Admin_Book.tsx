import { SetStateAction, useState } from "react";
import './Admin_Book.css';
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare, AiOutlineUser,  AiOutlineSearch } from "react-icons/ai";
import { LuLogOut} from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import thebest from '../../assets/Book/hobbit-czyli-tam-i-z-powrotem-b-iext140202568.webp'
import ReactStars from 'react-rating-star-with-type'
import avatar from '../../assets/Avatar/avatar1.jpg'

export default function Admin_Book() {
    const navigate = useNavigate();
    const [star, setStar] = useState(5);
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
        <div className="adminbook-container">
        <div className="background-adminbook">ADMIN</div>
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

        <div className="background-description-adminbook"></div>
        

        <div className="adminbook2-container">
            <input className= "search-box-adminbook" type="text" placeholder="Wyszukaj..." />
            <AiOutlineSearch className="search-icon-adminbook"/>

            
            <div className="description-adminbook">
                <img src={thebest} />
                <div>
                    <text className="title-adminbook">HOBBIT, CZYLI TAM I SPOWROTEM</text>
                    <text className="author-adminbook">Autor Autor </text>
                    <text className="category-adminbook">Kategoria: Fantasy</text>
                    <text className="description2-adminbook">“Hobbit, czyli tam i z powrotem” to opowieść o Bilbo Bagginsie, hobbitcie, 
                    który wyrusza w nieoczekiwaną przygodę. Towarzyszą mu krasnoludy, czarodziej Gandalf i smok Smaug. 
                    W trakcie podróży Bilbo odkrywa swoją odwagę i przełamuje własne ograniczenia. To historia o przygodzie, przyjaźni i nieznanych światach.</text>
                    <button className="admin-delete-button">USUŃ KSIĄŻKĘ</button>
                    <button className="admin-edit-button">EDYTUJ KSIĄŻKĘ</button>
                </div>
            </div>
            <text className="rating-star">
            5,0 <ReactStars classNames='reactStars-rating'  activeColors={[ "red", "orange", "#FFCE00", ]} size={20} /> (3)
            </text>
        </div>

        <div className="admin-users-opinion">
            <text>RECENZJE UŻYTKOWNIKÓW</text>
            <div className="admin-other-opinion-section">
                <div className="admin-how-many-opinion">Recenzje (3)</div>

                <div className="admin-opinion-section">
                    <li>
                        <div className="admin-other-user-profile">
                            <img src={avatar} />
                            <text>Nazwa użytkownika</text>
                        </div> 
                        <div className="admin2-opinion-section">
                            <div className="admin-opinion"></div>
                            <button >USUŃ RECENZJE</button>
                        </div>
                        
                    </li>

                    <li>
                        <div className="admin-other-user-profile">
                            <img src={avatar} />
                            <text>Nazwa użytkownika</text>
                        </div> 
                        <div className="admin2-opinion-section">
                            <div className="admin-opinion"></div>
                            <button >USUŃ RECENZJE</button>
                        </div>
                        
                    </li>

                    <li>
                        <div className="admin-other-user-profile">
                            <img src={avatar} />
                            <text>Nazwa użytkownika</text>
                        </div> 
                        <div className="admin2-opinion-section">
                            <div className="admin-opinion"></div>
                            <button >USUŃ RECENZJE</button>
                        </div>
                        
                    </li>
                    
                    
                </div>
                

            </div>
        </div>

        

        
    </div>

    );
}


