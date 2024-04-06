import React, { useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function register(){
        navigate("/login");
    }

    return(
        <div className="register-container">
            <div className="logo-section">
                <img src="../worlds-of-words/assets/Image/logo2.jpg" 
                onClick={register}/>
            </div>
            <div className="form-register-section">
                
                    <h2 className="rejestracja">REJESTRACJA</h2>
                    <form>
                        <div className="dane-register-section">
                            <text className="text-section">E-MAIL </text>
                            <input type="email" placeholder="" />
                            <text className="text-section">NAZWA UŻYTKOWNIKA </text>
                            <input type="text" placeholder="" />
                            <text className="text-section">HASŁO </text>
                            <input type="password" placeholder="" />
                            <text className="text-section">HASŁO </text>
                            <input type="password" placeholder="" />
                        </div>
                        <button type="button">ZAREJESTRUJ</button>
                    </form>
                
            </div>
        </div>

    );
}

