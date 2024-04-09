import React, { useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/Image/logo.png'

interface FormState {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const initialFormState: FormState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormState>(initialFormState);

  const validate = () => {
    let tempErrors: FormState = { ...initialFormState };

    tempErrors.email = formState.email ? "" : "Błąd: Wymagane pole";
    tempErrors.username = formState.username ? "" : "Błąd: Wymagane pole";
    tempErrors.password = formState.password ? "" : "Błąd: Wymagane pole";
    tempErrors.confirmPassword = formState.confirmPassword ? "" : "Błąd: Wymagane pole";

    setErrors({ ...tempErrors });

    return Object.values(tempErrors).every(x => x === "");
  };

  async function handleBack(){
    navigate("/login");
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      navigate("/login");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="register-container">
      <div className="logo-section">
        <img src={logo} onClick={handleBack} />
      </div>
      <div className="form-register-section">
        <h2 className="rejestracja">REJESTRACJA</h2>
        <form onSubmit={handleSubmit}>
          <div className="dane-register-section">
            <text className="text-section">E-MAIL </text>
            <input type="email" name="email" value={formState.email} onChange={handleInputChange} placeholder="" />
            <div style={{ color: 'red' , marginBottom: '10px', marginLeft: '10px', fontFamily: 'Roboto Slab' }}>{errors.email}</div>
            <text className="text-section">NAZWA UŻYTKOWNIKA </text>
            <input type="text" name="username" value={formState.username} onChange={handleInputChange} placeholder="" />
            <div style={{ color: 'red' , marginBottom: '10px', marginLeft: '10px', fontFamily: 'Roboto Slab'   }}>{errors.username}</div>
            <text className="text-section">HASŁO </text>
            <input type="password" name="password" value={formState.password} onChange={handleInputChange} placeholder="" />
            <div style={{ color: 'red' , marginBottom: '10px', marginLeft: '10px', fontFamily: 'Roboto Slab'  }}>{errors.password}</div>
            <text className="text-section">POWTÓRZ HASŁO </text>
            <input type="password" name="confirmPassword" value={formState.confirmPassword} onChange={handleInputChange} placeholder="" />
            <div style={{ color: 'red' , marginLeft: '10px', fontFamily: 'Roboto Slab'   }}>{errors.confirmPassword}</div>
          </div>
          <button type="submit">ZAREJESTRUJ</button>
        </form>
      </div>
    </div>
  );
}
