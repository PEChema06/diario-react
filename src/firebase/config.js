// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_LNu66l3JfEpt88bSBOVfls1HTiocpf8",
  authDomain: "react-app-16c91.firebaseapp.com",
  projectId: "react-app-16c91",
  storageBucket: "react-app-16c91.appspot.com",
  messagingSenderId: "1049576104867",
  appId: "1:1049576104867:web:ca54f18203764b95353016"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);