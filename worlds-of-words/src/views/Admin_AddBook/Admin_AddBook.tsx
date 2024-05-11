import { useState } from "react";
import './Admin_AddBook.css';
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusSquare, AiOutlineUser } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import logo from '../../assets/Image/logo.png';
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import defaultCoverBook from '../../assets/Book/book-default-cover.jpg'
import { storage } from "../Firebase/firebase";

export default function Admin_AddBook() {
    const navigate = useNavigate();
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        category: "",
        description: "",
        coverImage: null as File | null,// Inicjalizuj jako File | null
        deleted: false
    });

    async function handleAddBook() {
        // Pobierz bieżącą datę i czas
        const currentDate = new Date();
        // Sprawdź, czy wszystkie wymagane pola są wypełnione
        if (!bookData.title || !bookData.author || !bookData.category || !bookData.description) {
            alert("Wszystkie pola są wymagane!");
            return;
        }
        try {
            let coverImageUrl = defaultCoverBook; // Ustaw domyślną okładkę
            
            // Jeśli użytkownik wybrał okładkę, przekształć ją na URL Blob
            if (bookData.coverImage) {
                const storageRef = ref(storage, `bookCovers/${bookData.coverImage.name}`);
                await uploadBytes(storageRef, bookData.coverImage);
                coverImageUrl = await getDownloadURL(storageRef);
            }
    
            // Dodaj nową książkę do kolekcji 'books' w Firestore
            await addDoc(collection(firestore, 'books'), { // Dodaj wszystkie dane książki
                title: bookData.title,
                author: bookData.author,
                category: bookData.category,
                description: bookData.description,
                coverImage: coverImageUrl, // Ustaw URL obrazka okładki
                createdAt: currentDate, // Ustaw datę dodania książki
                deleted: false // Ustawienie deleted na false dla nowej książki
            });
            alert("Książka została dodana pomyślnie!");
            setBookData({
                title: "",
                author: "",
                category: "",
                description: "",
                coverImage: null,
                deleted: false // Ustawienie deleted na false po dodaniu nowej książki
            });
        } catch (error) {
            console.error("Błąd podczas dodawania książki: ", error);
            alert("Wystąpił błąd podczas dodawania książki. Spróbuj ponownie.");
        }
    }
    
    
    

    function handleAddCoverImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement)?.files?.[0];
            if (file instanceof File) {
                setBookData({ ...bookData, coverImage: file });
            }
        };
        input.click();
    }
    
    

    async function handleLogo(){
        navigate("/admin_mainpage");

    }


    async function handleAdminUsers(){
        navigate("/admin_users");

    }

    async function handleLogin(){
        navigate("/login");

    }

    return(
        <div className="adminaddbook-container">
        <div className="background-adminaddbook">ADMIN</div>
        <header>
            <div className="logo2-section">
                <img src={logo} onClick={handleLogo}/>
            </div>
            <nav>
                <ul className="menu2-bar">
                    <li className="addbook-section" ><AiOutlinePlusSquare className="menu2-icon"/> DODAJ KSIĄŻKĘ</li>
                    <li className="menu3-section" onClick={handleAdminUsers}><AiOutlineUser className="menu2-icon"/> UŻYTKOWNICY</li>
                    <li className="menu2-section" onClick={handleLogin}><LuLogOut className="menu2-icon"/> WYLOGUJ SIE</li>
                </ul>
            </nav>
        </header>

        <div className="adminaddbook-background"></div>

        <div className="adminaddbook2-container">
            <div className="adminaddbook-addimage">
                
                <div className="cover-image-container" onClick={handleAddCoverImage}>
                {bookData.coverImage ? (
                        <img src={URL.createObjectURL(bookData.coverImage)} alt="Okładka książki" />
                    ) : (
                        <div><AiOutlinePlusSquare className="adminaddbook-icon-addimage"/>
                    <text>DODAJ OKŁADKĘ</text></div>
                    
            )}
                </div>

                

            </div>
            <div className="admiaddbook-informationadd">
                <input 
                    type="text" 
                    className="adminaddbook-addtitle" 
                    placeholder="DODAJ TYTUŁ" 
                    value={bookData.title}
                    onChange={(e) => setBookData({ ...bookData, title: e.target.value })}/>
                <input 
                    type="text" 
                    className="adminaddbook-addauthor" 
                    placeholder="DODAJ AUTORA"
                    value={bookData.author}
                    onChange={(e) => setBookData({ ...bookData, author: e.target.value })}/>
                    
                <input 
                    type="text" 
                    className="adminaddbook-addcategory" 
                    placeholder="DODAJ KATEGORIĘ"
                    value={bookData.category}
                    onChange={(e) => setBookData({ ...bookData, category: e.target.value })}/>
                
                <textarea 
                    className="adminaddbook-adddescription" 
                    placeholder="DODAJ OPIS KSIĄŻKI"
                    value={bookData.description}
                    onChange={(e) => setBookData({ ...bookData, description: e.target.value })}/>
                
                <button onClick={handleAddBook}>DODAJ KSIĄŻKĘ</button>
            </div>
        </div>

        

        
    </div>

    );
}