import React, { useEffect, useState } from "react";
import './MainPage.css';
import { useNavigate } from "react-router-dom";
import { AiOutlineBars, AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { LuLogOut, LuHelpCircle } from "react-icons/lu";
import logo from '../../assets/Image/logo.png'
import book from '../../assets/Image/ksiazki1.png'
import thebest from '../../assets/Book/hobbit-czyli-tam-i-z-powrotem-b-iext140202568.webp'
import { Timestamp, collection, endAt, getDocs, limit, orderBy, query, startAt, where } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

interface Book {
    title: string;
    coverImage: string;
    deleted?: boolean; // Dodajemy pole deleted jako opcjonalne
    createdAt: Timestamp;
}

interface Rating {
    bookTitle: string;
    rating: number;
    bookCoverImage: string;
}


export default function MainPage() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

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

    async function handleBookDetails(title: string) {
        navigate(`/book?title=${encodeURIComponent(title)}`);
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'books'));
                const booksData: Book[] = [];
                querySnapshot.forEach(doc => {
                    const dataBook = doc.data() as Book;
                    if (!dataBook.deleted) {
                        booksData.push({
                            title: dataBook.title,
                            coverImage: dataBook.coverImage,
                            deleted: dataBook.deleted,
                            createdAt: dataBook.createdAt
                        });
                    }
                });
                return booksData;
            } catch (error) {
                console.error('Error fetching books:', error);
                return [];
            }
        };

        const fetchRatings = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'ratings'));
                const ratingsData: { [key: string]: { totalRating: number, count: number, bookCoverImage: string } } = {};
                querySnapshot.forEach(doc => {
                    const dataRating = doc.data() as Rating;
                    if (ratingsData[dataRating.bookTitle]) {
                        ratingsData[dataRating.bookTitle].totalRating += dataRating.rating;
                        ratingsData[dataRating.bookTitle].count += 1;
                    } else {
                        ratingsData[dataRating.bookTitle] = { totalRating: dataRating.rating, count: 1, bookCoverImage: dataRating.bookCoverImage };
                    }
                });
                const averageRatings: Rating[] = [];
                for (const bookTitle in ratingsData) {
                    averageRatings.push({
                        bookTitle: bookTitle,
                        rating: ratingsData[bookTitle].totalRating / ratingsData[bookTitle].count,
                        bookCoverImage: ratingsData[bookTitle].bookCoverImage
                    });
                }
                averageRatings.sort((a, b) => b.rating - a.rating);
                return averageRatings.slice(0, 3);
            } catch (error) {
                console.error('Error fetching ratings:', error);
                return [];
            }
        };
        

        const setBestRatedBooks = async () => {
            const fetchedRatings = await fetchRatings();
            setRatings(fetchedRatings);
        };
    
        const setLatestBooks = async () => {
            const fetchedBooks = await fetchBooks();
            fetchedBooks.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
            const latestBooks = fetchedBooks.slice(0, 6);
            setBooks(latestBooks);
        };
    
        setLatestBooks();
        setBestRatedBooks();
    }, []);


    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            const formattedTitle = searchTerm.trim().toUpperCase();
            // Sprawdź, czy tytuł istnieje w bazie
            const foundBook = books.find(book => book.title.toUpperCase() === formattedTitle);
            if (foundBook) {
                navigate(`/book?title=${encodeURIComponent(formattedTitle)}`);
            } else {
                const confirmNotFound = window.confirm('Nie znaleziono książki o podanym tytule! Spróbuj wprowadzić inny tytuł.');
                if (confirmNotFound) {
                    setSearchTerm('');
                }
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };


    return(
        <div className="mainpage-container">
            <header>
                <div className="logo2-section">
                    <img src={logo} />
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
            <div className="search-section">
                <div className="background-find-book"/>
                <h2 className="search-book">Znajdź książkę dla siebie</h2>
                <input className= "search-box" type="text" placeholder="Wyszukaj..." onChange={handleChangeSearch} onKeyPress={handleKeyPress}/>
                <AiOutlineSearch className="search-icon" onClick={handleSearch}/>
                <div className="book-image">
                    <img src={book}/>
                </div>
                <div className="the-best-books-background"/>
                <text className="text-the-best-books">
                    NAJLEPIEJ OCENIANE KSIĄŻKI
                </text>

                <div className="bestbook1background"/>
                    {ratings[0] && <img src={ratings[0].bookCoverImage} className="book1-the-best" alt={`Okładka książki ${ratings[0].bookTitle}`} />}
                    {ratings[0] && <text className="title1-the-best">
                    {ratings[0].bookTitle}
                        </text>}
                    <button className="thebestbutton1" onClick={() => handleBookDetails(ratings[0]?.bookTitle)}>
                        ZOBACZ
                    </button>

                <div className="bestbook2background"/>
                    {ratings[1] && <img src={ratings[1].bookCoverImage} className="book2-the-best" alt={`Okładka książki ${ratings[1].bookTitle}`} />}
                    {ratings[1] && <text className="title2-the-best">
                    {ratings[1].bookTitle}
                        </text>}
                    <button className="thebestbutton2" onClick={() => handleBookDetails(ratings[1]?.bookTitle)}>
                        ZOBACZ
                    </button>

                <div className="bestbook3background"/>
                    {ratings[2] && <img src={ratings[2].bookCoverImage} className="book3-the-best" alt={`Okładka książki ${ratings[2].bookTitle}`}/>}
                    {ratings[2] && <text className="title3-the-best">
                    {ratings[2].bookTitle}
                        </text>}
                    <button className="thebestbutton3" onClick={() => handleBookDetails(ratings[2]?.bookTitle)}>
                        ZOBACZ
                    </button>


                <text className="last-adds">
                    OSTATNIO DODANE
                </text>
                <ul className="last-adds-books-section">
                {books.length > 0 && books.slice(0, 6).map((book, index) => (
                        <li key={index} className="background-book">
                            <img src={book.coverImage} className="book-last" />
                            <text className="title-book-last">
                                {book.title}
                            </text>
                            <button className="button-book-last" onClick={() => handleBookDetails(book.title)}>
                                ZOBACZ
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
        

    );
}