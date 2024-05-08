import { SetStateAction, useState } from "react";
import './Book.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineBars, AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { LuLogOut, LuHelpCircle } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import book2 from '../../assets/Image/ksiazki2.png'
import ReactStars from 'react-rating-star-with-type'
import thebest from '../../assets/Book/hobbit-czyli-tam-i-z-powrotem-b-iext140202568.webp'
import avatar from '../../assets/Avatar/avatar1.jpg'

export default function Book() {
    const navigate = useNavigate();
    const [star, setStar] = useState(5);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const maxLength = 274; // Maksymalna liczba znaków
    const [text, setText] = useState(''); // Stan przechowujący wprowadzony tekst
    const [currentDate, setCurrentDate] = useState(new Date()); // Ustawiamy stan dla aktualnej daty

    async function handleLogo(){
        navigate("/mainpage");

    }

    async function handleCategories(){
        navigate("/categories");
    }

    async function handleMyAccount(){
        navigate("/myaccount");
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

    const onChange=(nextValue: SetStateAction<number>)=>{
        setStar(nextValue)
    }

    // Funkcja obsługująca zmiany w polu textarea
    const handleInputChange = (event: { target: { value: any; }; }) => {
        const newText = event.target.value;
        setText(newText);
    };

    // Liczenie pozostałych znaków
    const remainingChars = 0 + text.length;

    // Funkcja do formatowania daty w czytelny sposób (bez godziny)
    const formatDate = (date: { getDate: () => any; getMonth: () => number; getFullYear: () => any; }) => {
        const day = String(date.getDate()).padStart(2, '0'); // Dzień z wiodącym zerem
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiąc z wiodącym zerem
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    return(
        <div className="book-container">
        <header>
            <div className="logo2-section">
                <img src={logo} onClick={handleLogo}/>
            </div>
            <nav>
                <ul className="menu-bar">
                    <li className="menu-section" onClick={handleCategories}><AiOutlineBars className="menu-icon"/> KATEGORIE</li>
                    <li className="menu-section" onClick={handleMyAccount}><AiOutlineUser className="menu-icon"/> MOJE KONTO</li>
                    <li className="menu-section" onClick={handleFavourite}><AiOutlineHeart className="menu-icon"/> ULUBIONE</li>
                    <li className="menu-section" onClick={handleLogin}><LuLogOut className="menu-icon"/> WYLOGUJ SIE</li>
                </ul>
            </nav>
            <LuHelpCircle className="help-icon" onClick={handleHelp}/>
        </header>

        <div className="background-description-book"></div>
        

        <div className="book2-container">
            <input className= "search-box-book" type="text" placeholder="Wyszukaj..." />
            <AiOutlineSearch className="search-icon-book"/>

            
            <div className="description-book">
                <img src={thebest} />
                <div>
                    <text className="title-book">HOBBIT, CZYLI TAM I SPOWROTEM</text>
                    <text className="author-book">Autor Autor </text>
                    <text className="category-book">Kategoria: Fantasy</text>
                    <text className="description2-book">“Hobbit, czyli tam i z powrotem” to opowieść o Bilbo Bagginsie, hobbitcie, 
                    który wyrusza w nieoczekiwaną przygodę. Towarzyszą mu krasnoludy, czarodziej Gandalf i smok Smaug. 
                    W trakcie podróży Bilbo odkrywa swoją odwagę i przełamuje własne ograniczenia. To historia o przygodzie, przyjaźni i nieznanych światach.</text>
                    <button className="add-to-favourite-button">DODAJ DO ULUBIONYCH</button>
                </div>
            </div>
            <text className="rating-star">
            5,0 <ReactStars classNames='reactStars-rating' onChange={onChange} isEdit={true} activeColors={[ "red", "orange", "#FFCE00", ]} size={20} /> (3)
            </text>
        </div>

        <div className="add-your-opinion">
            <text className="text-to-add-opinio">DODAJ WŁASNĄ RECENZJE, <p>by pomóc innym użytkownikom</p></text>

            <div className="user-profile">
                <img src={avatar} />
                <text>Nazwa użytkownika</text>
            </div>

            <div className="your-opinion">
                <textarea value={text}
                onChange={handleInputChange}
                maxLength={maxLength} placeholder="Napisz swoją recenzję ..." />
                <div>
                    {remainingChars}/274
                </div>
                <text>{formatDate(currentDate)}</text>
                <button>DODAJ RECENZJĘ</button>
            </div>

        </div>

        <div className="other-opinion">
            <div className="background-heading"/>
            <text className="heading-section">SPRAWDŹ, <p>co inni myślą o tej książcę</p></text>
            <div className="other-opinion-section">
                <div className="how-many-opinion">Recenzje (3)</div>

                <div className="opinion-section">
                    <li>
                        <div className="other-user-profile">
                        <img src={avatar} />
                        <text>Nazwa użytkownika</text>
                        </div> 
                        <div className="opinion"></div>
                    </li>
                    <li>
                        <div className="other-user-profile">
                        <img src={avatar} />
                        <text>Nazwa użytkownika</text>
                        </div> 
                        <div className="opinion"></div>
                    </li>
                    <li>
                        <div className="other-user-profile">
                        <img src={avatar} />
                        <text>Nazwa użytkownika</text>
                        </div> 
                        <div className="opinion"></div>
                    </li>
                    
                </div>
                

            </div>
            <img className='book2-image' src={book2} />
        </div>
        
    </div>

    );
}