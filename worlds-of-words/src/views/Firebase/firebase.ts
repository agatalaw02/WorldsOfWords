
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "@firebase/firestore"
import {getAuth} from "@firebase/auth"
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZVRmF2y_YQJup2JeAb_6QmL4HuPO51UM",
  authDomain: "worlds-of-words.firebaseapp.com",
  projectId: "worlds-of-words",
  storageBucket: "worlds-of-words.appspot.com",
  messagingSenderId: "507117477555",
  appId: "1:507117477555:web:d3c7c267818d7b5108dac6",
  measurementId: "G-XDWELVEP6K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app); //moze bedzie trzeba napisac przed const export 
export const auth = getAuth(app);
export const storage = getStorage(app);

