import { useEffect, useState } from "react";
import './Favourite.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineBars, AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { LuLogOut, LuHelpCircle } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import thebest from '../../assets/Book/hobbit-czyli-tam-i-z-powrotem-b-iext140202568.webp'
import { auth, firestore } from "../Firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Favorite {
    bookTitle: string;
    bookCoverImage: string;
    bookCategory: string;
}


export default function Favourite() {
    const navigate = useNavigate();
    const [favoriteBooks, setFavoriteBooks] = useState<Favorite[]>([]);
    const [selectedBook, setSelectedBook] = useState<Favorite | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [currentUser, setCurrentUser] = useState(auth.currentUser);

    async function handleLogo(){
        navigate("/mainpage");

    }

    async function handleCategories(){
        navigate("/categories");
    }

    async function handleMyAccount(){
        navigate("/myaccount");

    }

    async function handleLogin(){
        navigate("/login");

    }

    async function handleHelp(){
        navigate("/help");
    }

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    const userID = currentUser.uid;
                    const q = query(collection(firestore, 'favorites'), where('userId', '==', userID));
                    const querySnapshot = await getDocs(q);
                    const favoritesData: Favorite[] = [];
                    querySnapshot.forEach(doc => {
                        const data = doc.data() as {
                            bookTitle: string;
                            bookCoverImage: string;
                            bookCategory: string;
                        };
                        favoritesData.push({
                            bookTitle: data.bookTitle,
                            bookCoverImage: data.bookCoverImage,
                            bookCategory: data.bookCategory
                        });
                        
                    });
                    console.log('Favorites data:', favoritesData);
                    setFavoriteBooks(favoritesData);
                } else {
                    console.error('No current user found');
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };
        
    
        fetchFavorites();
    }, []);
    
    

    const filterBooksByCategory = (category: string) => {
        setSelectedCategory(category);
        setSearchTerm('');
    }

    const filteredBooks = favoriteBooks.filter(book => {
        if (!selectedCategory || !book || !book.bookCategory) return true;
        return book.bookCategory.toLowerCase() === selectedCategory.toLowerCase();
    }).filter(book =>
        book && book.bookTitle && book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    

    async function handleBookDetails(title: string) {
        const selected = favoriteBooks.find(book => book.bookTitle === title);
        setSelectedBook(selected || null);
        navigate(`/book?title=${encodeURIComponent(title)}`);
    }
    
    return(
        <div className="favourite-container">
        <header>
            <div className="logo2-section">
                <img src={logo} onClick={handleLogo}/>
            </div>
            <nav>
                <ul className="menu-bar">
                    <li className="menu-section" onClick={handleCategories}><AiOutlineBars className="menu-icon"/> KATEGORIE</li>
                    <li className="menu-section" onClick={handleMyAccount}><AiOutlineUser className="menu-icon"/> MOJE KONTO</li>
                    <li className="favourite-section"><AiOutlineHeart className="menu-icon"/> ULUBIONE</li>
                    <li className="menu-section" onClick={handleLogin}><LuLogOut className="menu-icon"/> WYLOGUJ SIE</li>
                </ul>
            </nav>
            <LuHelpCircle className="help-icon" onClick={handleHelp}/>
        </header>

        <div className="favourite-and-categories-container">
            <div className="favourite-categories-container">
                <text className='favourite-categories-section'>
                    KATEGORIE
                </text>
                <li>
                    <button onClick={() => filterBooksByCategory('romans')}>ROMANS</button>
                    <button onClick={() => filterBooksByCategory('fantasy')}>FANTASTYKA</button>
                    <button onClick={() => filterBooksByCategory('kryminał')}>KRYMINAŁ</button>
                    <button onClick={() => filterBooksByCategory('science fiction')}>SCIENCE FICTION</button>
                    <button onClick={() => filterBooksByCategory('historia')}>HISTORIA</button>
                    <button onClick={() => filterBooksByCategory('turystyka')}>TURYSTYKA</button>
                    <button onClick={() => filterBooksByCategory('biografie')}>BIOGRAFIE</button>
                    <button onClick={() => filterBooksByCategory('biznes')}>BIZNES</button>
                    <button onClick={() => filterBooksByCategory('kuchnia i diety')}>KUCHNIA I DIETY</button>
                    <button onClick={() => filterBooksByCategory('literatura obyczajowa')}>LITERATURA OBYCZAJOWA</button>
                    <button onClick={() => filterBooksByCategory('poradniki')}>PORADNIKI</button>
                </li>
                
            </div>

            <div className="favourite2-container">
                <text className="favourite-books">
                        ULUBIONE
                </text>
                    <ul className="favourite-books-section">
                            {filteredBooks.map((favorite, index) => (
                            <li key={index} className="background-book-favourite">
                                <img src={favorite.bookCoverImage} className="book-favourite" />
                                <text className="title-book-favourite">{favorite.bookTitle}</text>
                                <button className="button-book-favourite" onClick={() => handleBookDetails(favorite.bookTitle)}>
                                    ZOBACZ
                                    </button> 
                            </li>
                        ))}
                    </ul>
            </div>   
        </div>   
    </div>

    );
}
