import { useEffect, useRef, useState } from "react";
import './Admin_Users.css';
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare, AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import avatar from '../../assets/Avatar/avatar1.jpg'
import { auth, firestore } from "../Firebase/firebase"; 
import defaultAvatar from '../../assets/Avatar/avatar1.jpg';
import { CollectionReference, QueryDocumentSnapshot, collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";

interface UserData {
    username: string;
    email: string;
    avatar: string;
    blocked: boolean;
}

export default function Admin_Users() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');


    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollectionRef = collection(firestore, 'users');
            try {
                const querySnapshot = await getDocs(usersCollectionRef);
                const usersData: UserData[] = [];
                querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
                    const userData = doc.data();
                    usersData.push({
                        username: userData.username,
                        email: userData.email,
                        avatar: userData.avatar || defaultAvatar,
                        blocked: userData.blocked || false
                    });
                });
                setUserData(usersData);
            } catch (error) {
                console.error('Błąd pobierania dokumentów: ', error);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = userData.filter((user) =>
        (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    

    const handleBlockUser = async (email: string) => {
        try {
            const userRef = doc(firestore, 'users', email);
            await updateDoc(userRef, {
                blocked: true
            });
            setUserData(prevUserData =>
                prevUserData.map(user =>
                    user.email === email ? { ...user, blocked: true } : user
                )
            );
        } catch (error) {
            console.error('Błąd podczas blokowania użytkownika: ', error);
        }
    };

   
    console.log(userData)
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
            <input className= "search-box-adminusers" type="text" placeholder="Wyszukaj..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
            <AiOutlineSearch className="search-icon-adminusers"/>   

            <table>
                    {filteredUsers.map((user, index) => (
                        // Dodajemy warunek sprawdzający, czy użytkownik nie jest zablokowany
                        !user.blocked && (
                            <li key={index}>
                                <img src={user.avatar} />
                                <text className="username">{user.username}</text>
                                <text className="useremail">{user.email}</text>
                                {/* Dodajemy warunek, który blokuje przycisk, jeśli użytkownik jest już zablokowany */}
                                {!user.blocked && (
                                    <button onClick={() => handleBlockUser(user.email)}>ZABLOKUJ</button>
                                )}
                            </li>
                        )
                    ))}
                </table>
        </div>

        
    </div>

    );
}