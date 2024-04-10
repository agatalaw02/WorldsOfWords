import { useState } from "react";
import './Help.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineBars, AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { LuLogOut, LuHelpCircle } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';

export default function Help() {
    const navigate = useNavigate();

    async function handleLogo(){
        navigate("/mainpage");

    }

    async function myaccount(){
        navigate("/myaccount");
    }

    async function login(){
        navigate("/login");
    }

    return(
        <div className="help-container">
        <header>
            <div className="logo2-section">
                <img src={logo} onClick={handleLogo}/>
            </div>
            <nav>
                <ul className="menu-bar">
                    <li className="menu-section"><AiOutlineBars className="menu-icon"/> KATEGORIE</li>
                    <li className="menu-section" onClick={myaccount}><AiOutlineUser className="menu-icon"/> MOJE KONTO</li>
                    <li className="menu-section"><AiOutlineHeart className="menu-icon"/> ULUBIONE</li>
                    <li className="menu-section" onClick={login}><LuLogOut className="menu-icon"/> WYLOGUJ SIE</li>
                </ul>
            </nav>
            <LuHelpCircle className="help-icon-inHelp"/>
        </header>
            <div className="help-section">
                <div className="background-help"/>
                <text className="text-help">
                    POMOC
                </text>

                <ul className="help-section2">
                    <li>
                        <h3>Jak wyszukać książki?</h3>
                        <text><p>1. Na stronie głównej znajduję się pole do wyszukiwania tytułów książek. Należy wpisać tam szukany tytuł.</p>
                                <p>2. Następnie naciśnij przycisk Enter lub ikone lupy.</p>
                                <p>3. Po wykonaniu tej czynności zostanie wyświetlona książka lub komunikat o jej braku w systemie.</p>
                                <p>4. Jeśli książka znajduje się w systemie można wykonać dalsze czynności.</p></text>

                    </li>

                    <li>
                        <h3>Jak dodać książkę do ulubionych?</h3>
                        <text>
                            <p>1. Pierwsze co należy wykonać to wybrać interesujący nasz tytuł.</p>
                            <p>2. Następnie nacisnąć przycisk “Zobacz”.</p>
                            <p>3. Po wykonaniu tej czynności zostanie wyświetlona książka z jej informacjami.</p>
                            <p>4. Pod krótkim opisem książki znajduje się przycisk “ Dodaj do ulubionych”, dzięki któremu zostanie dodana do listy ulubionych.</p>
                        </text>

                    </li>

                    <li>
                        <h3>Jak dodać recenzję do książki?</h3>
                        <text>
                            <p>1. Pierwsze co należy wykonać to wybrać interesujący nasz tytuł</p>
                            <p>2. Następnie nacisnąć przycisk “Zobacz”.</p>
                            <p>3. Po wykonaniu tej czynności zostanie wyświetlona książka z jej informacjami.</p>
                            <p>4. Po przesunięciu strony niżej znajduję się miejsce na wprowadzenie własnego recenzji.</p>
                            <p>5. Po wprowadzeniu tekstu należy nacisnąć przycisk “Dodaj recenzje”. W ten sposób twój kometarz / recenzja zostanie widoczna dla innych użytkowników.</p>
                        </text>
                    </li>


                    <li>
                        <h3>Jak znaleźć recenzje innych użytkowników?</h3>
                        <text>
                            <p>1. Pierwsze co należy wykonać to wybrać interesujący nasz tytuł.</p>
                            <p>2. Następnie nacisnąć przycisk “Zobacz”.</p>
                            <p>3. Po wykonaniu tej czynności zostanie wyświetlona książka z jej informacjami.</p>
                            <p>4. Następnie po przesunięciu strony na sam dół zostaną wyświetlone recenzje innych użytkowników.</p>
                            <p>5. Teraz możesz przeczytać co inni myślą o wybranej książce.</p>
                        </text>
                    </li>

                    <li>
                        <h3>Jak wyszukać książkę po kategorii?</h3>
                        <text>
                            <p>1. Pierwsze co należy wykonać to nacisnąć przycisk “Kategorie” na pasku menu u góry strony.</p>
                            <p>2. Następnie po lewej stronie znajdują się kategorie książek. Należy wybrać interesującą.</p>
                            <p>3. Po wykonaniu tej czynności zostaną wyświetlone książki z przypisaną wybraną książką.</p>
                        </text>
                        
                    </li>

                    <li>
                        <h3>Jak wyświetlić listę ulubionych książek?</h3>   
                        <text>
                            <p>1. Pierwsze co należy wykonać to nacisnąć przycisk “Ulubione” na pasku menu u góry strony.</p>
                            <p>2. Następnie zostaną wyświetlone wszystkie książki, jakie zostały dodane do ulubionych.</p>
                        </text>
                    </li>

                    <li>
                        <h3>Jak edytować swoje dane?</h3>
                        <text>
                            <p>1. Pierwsze co należy wykonać to nacisnąć przycisk “Moje konto” na pasku menu u góry strony.</p>
                            <p>2. Następnie zostaną wyświetlone twoje dane.</p>
                            <p>3. Pod twoimi danymi znajduje się przycisk “Edytuj”, dzięki niemu możesz edytować swoje dane.</p>
                        </text>
                    </li>

                    <li>
                        <h3>Jak wyświetlić swój profil?</h3>
                        <text>
                            <p>1. Pierwsze co należy wykonać to nacisnąć przycisk “Moje konto” na pasku menu u góry strony.</p>
                            <p>2. Następnie zostaną wyświetlone twoje dane, które możesz edytować lub usunąć konto.</p>
                        </text>
                    </li>

                    <li>
                        <h3>Jak usunąć swoje konto?</h3>
                        <text>
                            <p>1. Pierwsze co należy wykonać to nacisnąć przycisk “Moje konto” na pasku menu u góry strony.</p>
                            <p>2. Następnie zostaną wyświetlone twoje dane.</p>
                            <p>3. Pod twoimi danymi znajduje się przycisk “Usuń konto”, dzięki niemu możesz usunąć swoje konto.</p>
                        </text>
                    </li>

                </ul>
            </div>
            <footer className="footer4-container">
                Wszelkie prawa zastrzeżone - Worlds of Words 2024
            </footer>

        </div>

    );
}
