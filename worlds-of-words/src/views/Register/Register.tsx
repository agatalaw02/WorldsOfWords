import React, { useEffect, useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/Image/logo.png'
import {auth, firestore, storage} from "../Firebase/firebase";
import {createUserWithEmailAndPassword, AuthError} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";

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
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (registrationSuccess) {
      const redirectTimer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [registrationSuccess, navigate]);

  const avatarImages = [
    "/static/media/avatar1.6cab43f9f33cbcfb6860.jpg",
    "/static/media/avatar2.23a1933eefcca9e9d509.jpg",
    "/static/media/avatar3.0a94a6db01373c995dbf.jpg",
  ];

  const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatarImages.length);
    return avatarImages[randomIndex];
  };


  const validate = () => {
    let tempErrors: FormState = { ...initialFormState };

    tempErrors.email = formState.email ? "" : "Błąd: Wymagane pole";
    tempErrors.username = formState.username ? "" : "Błąd: Wymagane pole";
    tempErrors.password = formState.password ? "" : "Błąd: Wymagane pole";
    tempErrors.confirmPassword = formState.confirmPassword ? "" : "Błąd: Wymagane pole";

    if (formState.password !== formState.confirmPassword) {
      tempErrors.confirmPassword = "Błąd: Hasła nie pasują do siebie";
    }
  
    if (formState.password.length < 6) {
      tempErrors.password = "Błąd: Hasło musi mieć co najmniej 6 znaków";
    }

      // Sprawdzenie czy hasło zawiera co najmniej jedną małą literę
    if (!/(?=.*[a-z])/.test(formState.password)) {
      tempErrors.password = "Błąd: Hasło musi zawierać co najmniej jedną małą literę";
    }

    // Sprawdzenie czy hasło zawiera co najmniej jedną dużą literę
    if (!/(?=.*[A-Z])/.test(formState.password)) {
      tempErrors.password = "Błąd: Hasło musi zawierać co najmniej jedną dużą literę";
    }

    // Sprawdzenie czy hasło zawiera co najmniej jedną cyfrę
    if (!/(?=.*\d)/.test(formState.password)) {
      tempErrors.password = "Błąd: Hasło musi zawierać co najmniej jedną cyfrę";
    }

    // Sprawdzenie czy hasło zawiera co najmniej jeden znak specjalny
    if (!/(?=.*[\W_])/.test(formState.password)) {
      tempErrors.password = "Błąd: Hasło musi zawierać co najmniej jeden znak specjalny";
    }

    if (formState.username.length < 5) {
      tempErrors.username = "Błąd: Nazwa użytkownika musi mieć co najmniej 5 znaków";
    }

    setErrors({ ...tempErrors });

    return Object.values(tempErrors).every(x => x === "");
  };

  async function handleBack(){
    navigate("/login");
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      createUser();
    }
  };

  const createUser = async () => {
    try {
      // Rejestracja użytkownika w Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, formState.email, formState.password);
      const user = userCredential.user;

      // Zapisz dane użytkownika do Firestore
      const avatar = getRandomAvatar();
      const userData = { username: formState.username, email: formState.email, avatar: avatar, blocked: false };

      // Ustaw dokument użytkownika w Firestore z UID jako nazwą dokumentu
      await setDoc(doc(firestore, "users", user.uid), userData);

      setRegistrationSuccess(true);
    } catch (error: any) {
      const errorCode = (error as AuthError).code;
      const errorMessage = (error as AuthError).message;
      console.error("Błąd rejestracji:", errorCode, errorMessage);
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
        {registrationSuccess && (
          <div style={{ color: 'green', marginBottom: '10px', marginLeft: '10px', fontFamily: 'Roboto Slab' }}>
            Rejestracja przebiegła pomyślnie. Możesz teraz przejść do panelu logowania.
          </div>
        )}
        {/* <form onSubmit={handleSubmit}>
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
        </form> */}

        <form onSubmit={handleSubmit}>
          <div className="dane-register-section">
            <label className="text-section">E-MAIL 
              <input type="email" name="email" value={formState.email} onChange={handleInputChange} placeholder="" />
            </label>
            <div style={{ color: 'red' , marginBottom: '10px', marginLeft: '10px', fontFamily: 'Roboto Slab' }}>{errors.email}</div>
            <label className="text-section">NAZWA UŻYTKOWNIKA 
              <input type="text" name="username" value={formState.username} onChange={handleInputChange} placeholder="" />
            </label>
            <div style={{ color: 'red' , marginBottom: '10px', marginLeft: '10px', fontFamily: 'Roboto Slab'   }}>{errors.username}</div>
            <label className="text-section">HASŁO 
              <input type="password" name="password" value={formState.password} onChange={handleInputChange} placeholder="" />
            </label>
            <div style={{ color: 'red' , marginBottom: '10px', marginLeft: '10px', fontFamily: 'Roboto Slab'  }}>{errors.password}</div>
            <label className="text-section">POWTÓRZ HASŁO 
              <input type="password" name="confirmPassword" value={formState.confirmPassword} onChange={handleInputChange} placeholder="" />
            </label>
            <div style={{ color: 'red' , marginLeft: '10px', fontFamily: 'Roboto Slab'   }}>{errors.confirmPassword}</div>
          </div>
          <button type="submit">ZAREJESTRUJ</button>
        </form>
      </div>
    </div>
  );
}
