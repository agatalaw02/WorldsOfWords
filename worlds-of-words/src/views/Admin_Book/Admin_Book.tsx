import { SetStateAction, useEffect, useRef, useState } from "react";
import './Admin_Book.css';
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare, AiOutlineUser,  AiOutlineSearch } from "react-icons/ai";
import { LuLogOut} from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import ReactStars from 'react-rating-star-with-type'
import avatar1 from '../../assets/Avatar/avatar1.jpg';
import avatar2 from '../../assets/Avatar/avatar2.jpg';
import avatar3 from '../../assets/Avatar/avatar3.jpg';
import { firestore } from "../Firebase/firebase";
import { QueryDocumentSnapshot, Timestamp, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

interface Review {
    id: string;
    userId: string;
    userName: string;
    bookTitle: string;
    text: string;
    createdAt: Timestamp;
    isDeleted: boolean
}


interface Book {
    title: string;
    author: string;
    category: string;
    description: string;
    coverImage: string;
    deleted: boolean;
}

export default function Admin_Book() {
    const navigate = useNavigate();
    const topOfPanelRef = useRef<HTMLDivElement>(null);
    const [book, setBook] = useState({
        title: '',
        author: '',
        category: '',
        description: '',
        coverImage: '',
        deleted: false
      });

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title');

    const [reviews, setReviews] = useState<Review[]>([]);

    const avatarImages = [
        avatar1,
        avatar2,
        avatar3,
      ];
    
      const getRandomAvatar = () => {
        const randomIndex = Math.floor(Math.random() * avatarImages.length);
        return avatarImages[randomIndex];
      };

      const avatar = getRandomAvatar();

    // useEffect(() => {
    //     const fetchReviews = async () => {
    //         try {
    //             const q = query(collection(firestore, 'reviews'), where('bookTitle', '==', title));
    //             const querySnapshot = await getDocs(q);
    //             const fetchedReviews: Review[] = [];
    //             querySnapshot.forEach(doc => {
    //                 const reviewData = doc.data() as Review;
    //                 fetchedReviews.push(reviewData);
    //             });
    //             // Sortowanie recenzji od najnowszej do najstarszej
    //             fetchedReviews.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
                
    //             setReviews(fetchedReviews);
    //         } catch (error) {
    //             console.error('Błąd podczas pobierania recenzji:', error);
    //         }
    //     };
    
    //     fetchReviews();
    // }, [title]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const q = query(collection(firestore, 'reviews'), where('bookTitle', '==', title));
                const querySnapshot = await getDocs(q);
                const fetchedReviews: Review[] = [];
                querySnapshot.forEach(doc => {
                    const reviewData = doc.data() as Review;
                    fetchedReviews.push(reviewData);
                });
    
                // Sprawdzenie, czy użytkownik jest zablokowany i filtracja recenzji
                const filteredReviews = await Promise.all(
                    fetchedReviews.map(async review => {
                        const userRef = doc(firestore, 'users', review.userId);
                        const userDoc = await getDoc(userRef);
                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            if (userData && userData.blocked) {
                                // Jeśli użytkownik jest zablokowany, zwróć null
                                return null;
                            }
                        }
                        // Jeśli użytkownik nie jest zablokowany, zwróć recenzję
                        return review;
                    })
                );
    
                // Usunięcie wartości null z tablicy recenzji
                const filteredAndNotNullReviews = filteredReviews.filter(review => review !== null) as Review[];
    
                // Sortowanie recenzji od najnowszej do najstarszej
                const sortedReviews = filteredAndNotNullReviews.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
                setReviews(sortedReviews);
            } catch (error) {
                console.error('Błąd podczas pobierania recenzji:', error);
            }
        };
    
        fetchReviews();
    }, [title]);
    
    
    

      useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const q = query(collection(firestore, 'books'), where('title', '==', title));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data() as Book;
                    setBook(data);
                }
            } catch (error) {
                console.error('Błąd podczas pobierania szczegółów książki:', error);
            }
        };

        fetchBookDetails();
    }, [title]);


    useEffect(() => {
        // Przewiń stronę do góry panelu
        const topOfPanel = topOfPanelRef.current;
        if (topOfPanel) {
            topOfPanel.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    async function handleDeleteBook() {
        if (!book.title) {
            console.error('Nie można usunąć książki: brak tytułu książki.');
            return;
        }
    
        // Wyświetlamy okno dialogowe z pytaniem
        const confirmDelete = window.confirm('Czy na pewno chcesz usunąć książkę?');
    
        // Jeśli użytkownik potwierdzi usunięcie
        if (confirmDelete) {
            try {
                // Sprawdź, czy istnieje dokument z podanym tytułem
                const bookQuery = query(collection(firestore, 'books'), where('title', '==', book.title));
                const querySnapshot = await getDocs(bookQuery);
                if (!querySnapshot.empty) { // Jeśli dokument został znaleziony
                    // Pobierz identyfikator dokumentu
                    const docId = querySnapshot.docs[0].id;
                    // Zaktualizuj pole 'deleted' na true
                    const bookRef = doc(firestore, 'books', docId);
                    await updateDoc(bookRef, { deleted: true });
                    console.log('Książka została oznaczona jako usunięta.');
                    // Przekierowujemy użytkownika z powrotem do strony głównej admina
                    navigate("/admin_mainpage");
                } else {
                    console.error('Nie znaleziono dokumentu do usunięcia.');
                }
            } catch (error) {
                console.error('Błąd podczas usuwania książki:', error);
            }
        }
    }



    async function handleDeleteReview(index: number) {
        try {
            // Pobierz kopię tablicy recenzji
            const updatedReviews = [...reviews];
            // Sprawdź, czy indeks jest w zakresie tablicy
            if (index >= 0 && index < updatedReviews.length) {
                // Pytaj administratora o potwierdzenie usuwania recenzji
                const confirmDelete = window.confirm('Czy na pewno chcesz usunąć recenzję?');
                // Jeśli potwierdzi usunięcie
                if (confirmDelete) {
                    // Sprawdź, czy dokument recenzji istnieje w bazie danych
                    const reviewRef = doc(firestore, 'reviews', updatedReviews[index].id);
                    const reviewDoc = await getDoc(reviewRef);
                    if (reviewDoc.exists()) {
                        // Ustaw pole 'isDeleted' na true dla recenzji o danym indeksie
                        updatedReviews[index].isDeleted = true;
                        // Zaktualizuj stan aplikacji, aby odzwierciedlić usunięcie recenzji
                        setReviews(updatedReviews);
                        console.log('Recenzja została oznaczona jako usunięta w lokalnym stanie aplikacji.');
    
                        // Aktualizuj pole 'isDeleted' na true w bazie danych
                        await updateDoc(reviewRef, { isDeleted: true });
                        console.log('Recenzja została oznaczona jako usunięta w bazie danych.');
                    } else {
                        console.error('Dokument recenzji nie istnieje w bazie danych.');
                    }
                }
            } else {
                console.error('Nieprawidłowy indeks recenzji.');
            }
        } catch (error) {
            console.error('Błąd podczas oznaczania recenzji jako usuniętej:', error);
        }
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
        <>
        <div ref={topOfPanelRef}>
                {/* Górny panel */}
            </div>
        <div className="adminbook-container">
        <div className="background-adminbook">ADMIN</div>
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

        <div className="background-description-adminbook"></div>
        

        <div className="adminbook2-container">
            {/* <input className= "search-box-adminbook" type="text" placeholder="Wyszukaj..." />
            <AiOutlineSearch className="search-icon-adminbook"/> */}

            
            <div className="description-adminbook">
                <img src={book.coverImage} />
                <div>
                    <text className="title-adminbook">{book ? book.title : ''}</text>
                    <text className="author-adminbook">{book ? book.author : ''} </text>
                    <text className="category-adminbook">Kategoria: {book ? book.category : ''}</text>
                    <text className="description2-adminbook">{book ? book.description : ''}</text>
                    <button className="admin-delete-button" onClick={handleDeleteBook}>USUŃ KSIĄŻKĘ</button>
                </div>
            </div>
            <text className="rating-star">
            5,0 <ReactStars classNames='reactStars-rating'  activeColors={[ "red", "orange", "#FFCE00", ]} size={20} /> (3)
            </text>
        </div>

        <div className="admin-users-opinion">
            <text>RECENZJE UŻYTKOWNIKÓW</text>
            <div className="admin-other-opinion-section">
                <div className="admin-how-many-opinion">Recenzje ({reviews.filter(review => !review.isDeleted).length})</div>

                <div className="admin-opinion-section">
                {reviews.map((review, index) => (
                        // Sprawdzamy, czy recenzja nie została oznaczona jako usunięta
                        !review.isDeleted && (
                            <li key={index}>
                                <div className="admin-other-user-profile">
                                    <img src={avatar} />
                                    <text>{review.userName}</text>
                                </div>
                                <div className="admin2-opinion-section">
                                    <div className="admin-opinion">{review.text}</div>
                                    <button onClick={() => handleDeleteReview(index)}>USUŃ RECENZJE</button>
                                </div>
                            </li>
                        )
                    ))}
                    
                    
                </div>
                

            </div>
        </div>

        

        
    </div>
    </>
    );
}


