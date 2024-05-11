import { useEffect, useState } from "react";
import './Admin_MainPage.css';
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare, AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import thebest from '../../assets/Book/hobbit-czyli-tam-i-z-powrotem-b-iext140202568.webp'
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { firestore } from "../Firebase/firebase"; // Upewnij się, że ta ścieżka jest prawidłowa
import { Link } from "react-router-dom";


interface Book {
    title: string;
    coverImage: string;
    deleted?: boolean; // Dodajemy pole deleted jako opcjonalne
    category: string;
}

export default function Admin_MainPage() {
    const navigate = useNavigate();
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
        navigate(`/admin_book?title=${encodeURIComponent(title)}`);
    }
    

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
        <div className="adminmainpage-container">
            <div className="background-admin">ADMIN</div>
        <header>
            <div className="logo2-section">
                <img src={logo} onClick={handleLogo}/>
            </div>
            <nav>
                <ul className="menu2-bar">
                    <li className="menu2-section" onClick={handleAdminAddBook}><AiOutlinePlusSquare className="menu2-icon"/> DODAJ KSIĄŻKĘ</li>
                    <li className="menu3-section" onClick={handleAdminUsers}><AiOutlineUser className="menu2-icon"/> UŻYTKOWNICY</li>
                    <li className="menu2-section" onClick={handleLogin}><LuLogOut className="menu2-icon"/> WYLOGUJ SIE</li>
                </ul>
            </nav>
        </header>

        <div className="adminmainpage2-container">
            <div className="adminmainpage3-container">
                <text className='adminmainpage-section'>
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

            <div className="adminmainpage4-container">
                <input 
                    className= "search-box-adminmainpage" 
                    type="text" 
                    placeholder="Wyszukaj..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                <AiOutlineSearch className="search-icon-adminmainpage"/>

                <ul className="adminmainpage-books-section">
                        {filteredBooks.map((book, index) => (
                            !book.deleted && ( // Dodajemy warunek sprawdzający, czy książka nie została usunięta
                                <li key={index} className="background-book-adminmainpage">
                                    <img src={book.coverImage} className="book-adminmainpage" alt={`Okładka książki ${book.title}`} />
                                    <text className="title-book-adminmainpage">{book.title}</text>
                                    <button onClick={() => handleBookDetails(book.title)} className="button-book-adminmainpage">ZOBACZ</button>
                                </li>
                            )
                        ))}
                    </ul>
                    
            </div>   
        </div>

        
    </div>

    );
}