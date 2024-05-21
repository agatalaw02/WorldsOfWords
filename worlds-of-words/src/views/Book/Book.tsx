import { SetStateAction, useEffect, useRef, useState } from "react";
import './Book.css';
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineBars, AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { LuLogOut, LuHelpCircle } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import book2 from '../../assets/Image/ksiazki2.png'
import ReactStars from 'react-rating-star-with-type'
import avatar1 from '../../assets/Avatar/avatar1.jpg';
import avatar2 from '../../assets/Avatar/avatar2.jpg';
import avatar3 from '../../assets/Avatar/avatar3.jpg';

import { auth, firestore } from "../Firebase/firebase";
import { collection, getDocs, query, where, addDoc, Timestamp, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

interface Book {
    title: string;
    author: string;
    category: string;
    description: string;
    coverImage: string;
    deleted: boolean;
    isDeleted: boolean;
}

interface Review {
    userId: string;
    userName: string;
    bookTitle: string;
    text: string;
    createdAt: Timestamp;
    isDeleted: boolean;
}


export default function Book() {
    const navigate = useNavigate();
    const [star, setStar] = useState(5);
    const maxLength = 274; // Maksymalna liczba znaków
    const [currentDate, setCurrentDate] = useState(new Date()); // Ustawiamy stan dla aktualnej daty
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

    const [text, setText] = useState('');
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const [userData, setUserData] = useState({
        username: "",
        email: ""
    });

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

    const [reviews, setReviews] = useState<Review[]>([]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const [userRating, setUserRating] = useState<number | null>(null); // Stan dla oceny użytkownika
    const [averageRating, setAverageRating] = useState<number | null>(null); // Średnia ocena książki
    const [numberOfRatings, setNumberOfRatings] = useState<number>(0);

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
        const fetchBookRatings = async () => {
            try {
                const q = query(collection(firestore, 'ratings'), where('bookTitle', '==', title));
                const querySnapshot = await getDocs(q);
                const ratings: number[] = [];
                querySnapshot.forEach(doc => {
                    const ratingData = doc.data().rating;
                    ratings.push(ratingData);
                });
    
                // Obliczanie średniej oceny
                const totalRatings = ratings.length;
                const totalSum = ratings.reduce((acc, curr) => acc + curr, 0);
                const average = totalSum / totalRatings;
                setAverageRating(average);
                setNumberOfRatings(totalRatings);
    
                // Pobierz okładkę książki, która dostała ocenę
                const bookRef = collection(firestore, 'books');
                const bookQuerySnapshot = await getDocs(query(bookRef, where('title', '==', title)));
                if (!bookQuerySnapshot.empty) {
                    const bookData = bookQuerySnapshot.docs[0].data() as Book;
                    setBook(bookData);
                }
            } catch (error) {
                console.error('Błąd podczas pobierania ocen:', error);
            }
        };
    
        fetchBookRatings();
    }, [title]);
     // Wywołaj funkcję przy zmianie tytułu książki

    const handleRatingSubmit = async (nextValue: number) => {
        console.log('handleRatingSubmit');
        try {
            if (currentUser && nextValue !== null) {
                // Sprawdź, czy użytkownik już ocenił tę książkę
                const userRatingRef = doc(firestore, 'ratings', `${currentUser.uid}_${title}`);
                const userRatingDoc = await getDoc(userRatingRef);
    
                if (userRatingDoc.exists()) {
                    // Jeśli użytkownik już ocenił tę książkę, zaktualizuj jego ocenę
                    await updateDoc(userRatingRef, { rating: nextValue });
                } else {
                    // Jeśli użytkownik jeszcze nie ocenił tej książki, dodaj nowy dokument z jego oceną
                    await addDoc(collection(firestore, 'ratings'), {
                        userId: currentUser.uid,
                        bookTitle: title,
                        rating: nextValue,
                        bookCoverImage: book.coverImage
                    });
                }
    
                console.log("Ocena książki dodana/pobrana pomyślnie!");
            } else {
                console.error("Użytkownik niezalogowany lub ocena nieprawidłowa.");
            }
        } catch (error) {
            console.error("Błąd podczas dodawania/aktualizacji oceny książki:", error);
        }
    };

    useEffect(() => {
        // Przewiń stronę do góry panelu
        const topOfPanel = topOfPanelRef.current;
        if (topOfPanel) {
            topOfPanel.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (currentUser) {
                    const userEmailAuth = currentUser.email;
                    const usersCollectionRef = collection(firestore, 'users');
                    const userSnapshot = await getDocs(usersCollectionRef);
                    userSnapshot.docs.forEach(doc => {
                        const userDataFromFirestore = doc.data();
                        if (userDataFromFirestore.email === userEmailAuth) {
                            setUserData({
                                username: userDataFromFirestore.username || "",
                                email: userDataFromFirestore.email || ""
                            });
                        }
                    });
                } else {
                    console.error("Użytkownik niezalogowany.");
                }
            } catch (error) {
                console.error("Błąd podczas pobierania danych użytkownika:", error);
            }
        };

        fetchUserData();
    }, [currentUser]);

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
        const checkIfBookIsFavorite = async () => {
            try {
                if (currentUser) {
                    const favoriteBookRef = collection(firestore, 'favorites');
                    const querySnapshot = await getDocs(query(favoriteBookRef, where('userId', '==', currentUser.uid), where('bookTitle', '==', title)));
                    if (!querySnapshot.empty) {
                        setIsFavorite(true);
                    } else {
                        setIsFavorite(false);
                    }
                }
            } catch (error) {
                console.error("Błąd podczas sprawdzania, czy książka jest ulubiona:", error);
            }
        };
    
        checkIfBookIsFavorite();
    }, [currentUser, title]);

    const handleAddReview = async () => {
        try {
            if (currentUser) {
                // Sprawdź, czy użytkownik wprowadził treść recenzji
                if (text.trim() === '') {
                    window.confirm('Treść recenzji nie może być pusta.');
                    return; // Przerwij funkcję, jeśli treść recenzji jest pusta
                }
                const reviewsCollectionRef = collection(firestore, 'reviews');
                const reviewData = {
                    id: '', // Puste ID, które zostanie zastąpione przez Firestore
                    userId: currentUser.uid,
                    userName: userData.username,
                    bookTitle: title,
                    text: text,
                    createdAt: Timestamp.fromDate(new Date()),
                    isDeleted: false
                };
    
                // Dodaj recenzję z automatycznie wygenerowanym unikatowym ID
                const docRef = await addDoc(reviewsCollectionRef, reviewData);
                // Ustaw ID recenzji na to, które zostało wygenerowane przez Firestore
                await updateDoc(docRef, { id: docRef.id });
                console.log("Recenzja dodana pomyślnie!");
                setText('');
                window.location.reload(); // Odświeżenie strony
            } else {
                console.error("Użytkownik niezalogowany. Proszę się zalogować, aby dodać recenzję.");
            }
        } catch (error) {
            console.error("Błąd podczas dodawania recenzji:", error);
        }
    };


    const handleAddToFavorites = async () => {
        try {
            if (currentUser) {
                
                
                // Sprawdź, czy książka już istnieje w ulubionych użytkownika
                const favoriteBookRef = collection(firestore, 'favorites');
                const querySnapshot = await getDocs(query(favoriteBookRef, where('userId', '==', currentUser.uid), where('bookTitle', '==', title)));
                if (!querySnapshot.empty) {
                    console.log("Ta książka jest już w ulubionych użytkownika.");
                    return;
                }
                
                // Dodaj książkę do ulubionych
                await addDoc(favoriteBookRef, {
                    userId: currentUser.uid,
                    userEmail: currentUser.email,
                    bookTitle: title,
                    bookAuthor: book.author,
                    bookCategory: book.category,
                    bookDescription: book.description,
                    bookCoverImage: book.coverImage
                });
                
                setIsFavorite(true);
                console.log("Książka dodana do ulubionych pomyślnie!");
            } else {
                console.error("Użytkownik niezalogowany. Proszę się zalogować, aby dodać książkę do ulubionych.");
            }
        } catch (error) {
            console.error("Błąd podczas dodawania książki do ulubionych:", error);
        }
    };

    const handleRemoveFromFavorites = async () => {
        try {
            if (currentUser) {
                // Usuń książkę z ulubionych
                const favoriteBookRef = collection(firestore, 'favorites');
                const querySnapshot = await getDocs(query(favoriteBookRef, where('userId', '==', currentUser.uid), where('bookTitle', '==', title)));
                querySnapshot.forEach(async doc => {
                    await deleteDoc(doc.ref);
                });
                setIsFavorite(false);
                console.log("Książka usunięta z ulubionych pomyślnie!");
            } else {
                console.error("Użytkownik niezalogowany. Proszę się zalogować, aby usunąć książkę z ulubionych.");
            }
        } catch (error) {
            console.error("Błąd podczas usuwania książki z ulubionych:", error);
        }
    };


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
        console.log(1234)
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

    useEffect(() => {
        if (userRating !== null) {
            console.log('Przechodzę do handleRatingSubmit');
            handleRatingSubmit(userRating); 
        }
    }, [userRating])

    return(
        <>
        <div ref={topOfPanelRef}>
                {/* Górny panel */}
            </div>
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
            {/* <input className= "search-box-book" type="text" placeholder="Wyszukaj..." />
            <AiOutlineSearch className="search-icon-book"/> */}

            
            <div className="description-book">
                <img src={book.coverImage} />
                <div>
                    <text className="title-book">{book ? book.title : ''}</text>
                    <text className="author-book">{book ? book.author : ''} </text>
                    <text className="category-book">Kategoria: {book ? book.category : ''}</text>
                    <text className="description2-book">{book ? book.description : ''}</text>
                    <button className="add-to-favourite-button" style={{ backgroundColor: isFavorite ? 'red' : '#052435' , borderColor: isFavorite ? 'red' : '#052435'}} onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}>
                                {isFavorite ? 'USUŃ Z ULUBIONYCH' : 'DODAJ DO ULUBIONYCH'}
                    </button>
                </div>
            </div>
            <text className="rating-star">
                {averageRating != null && !isNaN(averageRating) ? averageRating.toFixed(1) : '0'} 
                <ReactStars
                    classNames='reactStars-rating'
                    count={5}
                    value={userRating !== null ? userRating : 0}
                    activeColors={["red", "orange", "#FFCE00"]}
                    size={20}
                    isEdit={true}
                    onChange={(nextValue) => {
                        console.log('nextValue:', nextValue);
                        console.log('userRating:', userRating);
                        onChange(nextValue);
                        setUserRating(nextValue);
                        if (userRating !== null) {
                        console.log('Przechodzę do handleRatingSubmit');
                        handleRatingSubmit(nextValue);
                        }
                        // Aktualizuj średnią ocenę i liczbę ocen
                        setAverageRating((prevAverageRating) => {
                        if (prevAverageRating != null) {
                            const newAverageRating = ((prevAverageRating * numberOfRatings) + nextValue) / (numberOfRatings + 1);
                            return newAverageRating;
                        }
                        // Domyślna wartość, jeśli prevAverageRating jest null
                        return nextValue;
                        });
                        setNumberOfRatings((prevNumberOfRatings) => prevNumberOfRatings + 1);
                    }}
                    />


                ({numberOfRatings})
            </text>







        </div>

        <div className="add-your-opinion">
            <text className="text-to-add-opinio">DODAJ WŁASNĄ RECENZJE, <p>by pomóc innym użytkownikom</p></text>

            <div className="user-profile">
                <img src={avatar} />
                <text>{userData.username}</text>
            </div>

            <div className="your-opinion">
                <textarea value={text}
                onChange={e => setText(e.target.value)}
                maxLength={maxLength} placeholder="Napisz swoją recenzję ..." />
                <div>
                    {remainingChars}/274
                </div>
                <text>{formatDate(currentDate)}</text>
                <button onClick={handleAddReview}>DODAJ RECENZJĘ</button>
            </div>

        </div>

        <div className="other-opinion">
            <div className="background-heading"/>
            <text className="heading-section">SPRAWDŹ, <p>co inni myślą o tej książcę</p></text>
            <div className="other-opinion-section">
                <div className="how-many-opinion">Recenzje ({reviews.filter(review => !review.isDeleted).length})</div>

                <div className="opinion-section">
                {reviews.map((review, index) => (
                    !review.isDeleted && (
                        <li key={index}>
                            <div className="other-user-profile">
                                <img src={avatar} />
                                <text>{review.userName}</text>
                            </div>
                            <div className="opinion">{review.text}</div>
                            <div className="review-date">{formatDate(review.createdAt.toDate())}</div>
                        </li>
                    )
                ))}
                    
                </div>
                

            </div>
            <img className='book2-image' src={book2} />
        </div>
        
    </div>
    </>

    );
}