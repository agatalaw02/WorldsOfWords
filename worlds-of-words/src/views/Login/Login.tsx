import { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/Image/logo.png';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../Firebase/firebase";
import { User } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleRegister(){
        navigate("/register");
    }

    async function handleLogin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Pobierz informacje o użytkowniku z jego profilu w Firebase Authentication
            const isAdmin = checkAdminRole(user);
            if (isAdmin) {
                // Jeśli użytkownik jest administratorem, przekieruj na stronę główną admina
                navigate("/admin_mainpage");
            } else {
                // Sprawdź czy użytkownik jest zablokowany
                const isBlocked = checkBlockedStatus(user);
                if (await isBlocked) {
                    // Jeśli użytkownik jest zablokowany, wyświetl komunikat
                    setError("Zostałeś zablokowany. Skontaktuj się z administratorem.");
                } else {
                    // W przeciwnym razie przekieruj na stronę główną użytkownika
                    navigate("/mainpage");
                }
            }
        } catch (error) {
            // Obsługa błędów logowania
            setError("Nieprawidłowy e-mail lub hasło. Spróbuj ponownie.");
        }
    }

    // Funkcja sprawdzająca rolę użytkownika
    function checkAdminRole(user: User): boolean {
        return user.email === "admin@admin.pl";
    }

    // Funkcja sprawdzająca czy użytkownik jest zablokowany
async function checkBlockedStatus(user: User): Promise<boolean> {
    try {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData && userData.blocked) {
                return true; // Jeśli użytkownik jest zablokowany, zwróć true
            }
        }
    } catch (error) {
        console.error("Błąd podczas sprawdzania statusu zablokowania użytkownika:", error);
    }
    return false; // W przeciwnym razie, zwróć false
}


    return(
        <div className="login-container">
            <div className="logo-section">
                <img src={logo} alt="Logo" />
            </div>
            <div className="form-section">
                <h2 className="logowanie">LOGOWANIE</h2>
                <form onSubmit={handleLogin}>
                    <div className="dane-section">
                        <text className="text-section">E-MAIL </text>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="" 
                            required 
                        />
                        <text className="text-section">HASŁO </text>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="" 
                            required 
                        />
                        {error && <div className="error-message">{error}</div>}
                    </div>
                    <button type="submit">ZALOGUJ</button>
                    <button type="button" onClick={handleRegister}>ZAREJESTRUJ SIĘ</button>
                </form>
            </div>
        </div>
    );
}
