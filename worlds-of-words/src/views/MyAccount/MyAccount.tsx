import { useEffect, useState } from "react";
import './MyAccount.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineBars, AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { LuLogOut, LuHelpCircle } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import { auth, firestore } from "../Firebase/firebase"; // Importujemy obiekty auth i firestore
import defaultAvatar from '../../assets/Avatar/avatar1.jpg';
import { collection, getDocs, getFirestore, deleteDoc, doc, query, where } from "firebase/firestore";

export default function MyAccount() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        avatar: defaultAvatar
    }); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userEmailAuth = user.email;
                    const firestore = getFirestore();
                    const usersCollectionRef = collection(firestore, 'users');
                    const userSnapshot = await getDocs(usersCollectionRef);
                    userSnapshot.docs.forEach(async (doc: { data: () => any; }) => {
                        const userDataFromFirestore = doc.data();
                        if (userDataFromFirestore.email === userEmailAuth) {
                            setUserData({
                                username: userDataFromFirestore.username || "",
                                email: userDataFromFirestore.email || "",
                                avatar: userDataFromFirestore.avatar || defaultAvatar
                            });
                        }
                    });
                } else {
                    console.error("Użytkownik niezalogowany.");
                }
            } catch (error) {
                console.error("Błąd podczas pobierania danych użytkownika:", error);
            }
        };
        
        fetchUserData();
    }, []);
    

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
                    <img src={userData.avatar} /> 
                </div>
                
                <form>
                    <div className="daneClient-section">
                        <text className="text-section">NAZWA UŻYTKOWNIKA </text>
                        <input type="text" value={userData.username} readOnly disabled/>
                        <text className="text-section">E-MAIL </text>
                        <input type="email" value={userData.email} readOnly disabled/>
                    </div>
                </form>
            </div>

        </div>
        
    </div>

    );
}
