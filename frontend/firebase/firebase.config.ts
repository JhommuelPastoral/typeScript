// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg0uP_PIWKInAwGX-RWgnAMAPnb64XXpE",
  authDomain: "algoholic-1afbd.firebaseapp.com",
  projectId: "algoholic-1afbd",
  storageBucket: "algoholic-1afbd.firebasestorage.app",
  messagingSenderId: "675005800154",
  appId: "1:675005800154:web:266fce09e7b3352017cfe3",
  measurementId: "G-KQGM91KZED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export {auth, signInWithPopup, provider};
