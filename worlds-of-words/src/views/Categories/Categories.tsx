import { useEffect, useState } from "react";
import './Categories.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineBars, AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { LuLogOut, LuHelpCircle } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import thebest from '../../assets/Book/hobbit-czyli-tam-i-z-powrotem-b-iext140202568.webp'
import { firestore } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Book {
    title: string;
    coverImage: string;
    deleted?: boolean; // Dodajemy pole deleted jako opcjonalne
    category: string;
}

export default function Categories() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'books'));
                const booksData: Book[] = [];
                querySnapshot.forEach(doc => {
                    const dataBook = doc.data() as Book;
                    if (!dataBook.deleted) { // Check if the book is not marked as deleted
                        booksData.push({
                            title: dataBook.title,
                            coverImage: dataBook.coverImage,
                            deleted: dataBook.deleted, // Passing the deleted value
                            category: dataBook.category
                        });
                    }
                });
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
    
        fetchBooks();
    }, []);  

    const filterBooksByCategory = (category: string) => {
        setSelectedCategory(category);
        setSearchTerm('');
    }

    const filteredBooks = books.filter(book => {
        if (!selectedCategory) return true;
        return book.category.toLowerCase() === selectedCategory.toLowerCase();
    }).filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    async function handleBookDetails(title: string) {
        const selected = books.find(book => book.title === title);
        setSelectedBook(selected || null);
        navigate(`/book?title=${encodeURIComponent(title)}`);
    }

    async function handleLogo(){
        navigate("/mainpage");

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

    return(
        <div className="categories-container">
        <header>
            <div className="logo2-section">
                <img src={logo} onClick={handleLogo}/>
            </div>
            <nav>
                <ul className="menu-bar">
                    <li className="categories-section"><AiOutlineBars className="menu-icon"/> KATEGORIE</li>
                    <li className="menu-section" onClick={handleMyAccount}><AiOutlineUser className="menu-icon"/> MOJE KONTO</li>
                    <li className="menu-section" onClick={handleFavourite}><AiOutlineHeart className="menu-icon"/> ULUBIONE</li>
                    <li className="menu-section" onClick={handleLogin}><LuLogOut className="menu-icon"/> WYLOGUJ SIE</li>
                </ul>
            </nav>
            <LuHelpCircle className="help-icon" onClick={handleHelp}/>
        </header>

        <div className="categories2-container">
            <div className="categories3-container">
                <text className='categories2-section'>
                    KATEGORIE
                </text>
                <li>
                    <button onClick={() => filterBooksByCategory('romans')}>ROMANS</button>
                    <button onClick={() => filterBooksByCategory('fantasy')}>FANTASY</button>
                    <button onClick={() => filterBooksByCategory('kryminał')}>KRYMINAŁ</button>
                    <button onClick={() => filterBooksByCategory('science fiction')}>SCIENCE FICTION</button>
                    <button onClick={() => filterBooksByCategory('historia')}>HISTORIA</button>
                    <button onClick={() => filterBooksByCategory('turystyka')}>TURYSTYKA</button>
                    <button onClick={() => filterBooksByCategory('biografia')}>BIOGRAFIE</button>
                    <button onClick={() => filterBooksByCategory('biznes')}>BIZNES</button>
                    <button onClick={() => filterBooksByCategory('kuchnia i diety')}>KUCHNIA I DIETY</button>
                    <button onClick={() => filterBooksByCategory('literatura obyczajowa')}>LITERATURA OBYCZAJOWA</button>
                    <button onClick={() => filterBooksByCategory('poradniki')}>PORADNIKI</button>
                </li>
                
            </div>

            <div className="categories4-container">
                <input 
                    className= "search-box-categories" 
                    type="text" 
                    placeholder="Wyszukaj..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                <AiOutlineSearch className="search-icon-categories"/>

                    <ul className="categories-books-section">
                        {filteredBooks.map((book, index) => (
                            !book.deleted && ( // Dodajemy warunek sprawdzający, czy książka nie została usunięta
                            <li key={index} className="background-book-categories">
                                    <img src={book.coverImage} alt={`Okładka książki ${book.title}`} className="book-categories" />
                                    <text className="title-book-categories">
                                    {book.title}
                                    </text>
                                    <button className="button-book-categories" onClick={() => handleBookDetails(book.title)}>
                                    ZOBACZ
                                    </button> 
                                
                            </li>
                            )
                        ))}
                    </ul>
            </div>   
        </div>

        
    </div>

    );
}