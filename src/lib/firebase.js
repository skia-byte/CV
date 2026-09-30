import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyA7ka0lXSPW9FzsW0DwTbhWVDxXeFWjs54",
  authDomain: "consigeventas.firebaseapp.com",
  projectId: "consigeventas",
  storageBucket: "consigeventas.firebasestorage.app",
  messagingSenderId: "478929802207",
  appId: "1:478929802207:web:8227cdd1d4461d44e42a6a",
  measurementId: "G-F1P9MNH6W1",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
