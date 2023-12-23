// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pern-auth-4b9cd.firebaseapp.com",
  projectId: "pern-auth-4b9cd",
  storageBucket: "pern-auth-4b9cd.appspot.com",
  messagingSenderId: "147939521808",
  appId: "1:147939521808:web:5036aa373a8b58b495a195"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);