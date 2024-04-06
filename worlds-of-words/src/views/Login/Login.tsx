import { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function handleLogin(){
        navigate("/register");

    }

    return(
        <div className="login-container">
            <div className="logo-section">
                <img src="../worlds-of-words/assets/Image/logo2.jpg" />
            </div>
            <div className="form-section">
                
                    <h2 className="logowanie">LOGOWANIE</h2>
                    <form>
                        <div className="dane-section">
                            <text className="text-section">E-MAIL </text>
                            <input type="email" placeholder="" />
                            <text className="text-section">HASŁO </text>
                            <input type="password" placeholder="" />
                        </div>
                        <button type="submit">ZALOGUJ</button>
                        <button type="button" onClick={handleLogin}>ZAREJESTRUJ SIĘ</button>
                    </form>
                
            </div>
        </div>

    );
}
