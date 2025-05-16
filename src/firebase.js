// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIcCdCyoS45tRJkdgwTmJPh-oFFnjjul0",
  authDomain: "silleta-del-futuro.firebaseapp.com",
  projectId: "silleta-del-futuro",
  storageBucket: "silleta-del-futuro.firebasestorage.app",
  messagingSenderId: "914672479866",
  appId: "1:914672479866:web:9bc97c6763fb2be4b695c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Conexión a Firestore
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot, query };