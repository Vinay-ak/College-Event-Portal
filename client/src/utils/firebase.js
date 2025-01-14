// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "college-event-portal-58534.firebaseapp.com",
  projectId: "college-event-portal-58534",
  storageBucket: "college-event-portal-58534.firebasestorage.app",
  messagingSenderId: "898850686973",
  appId: "1:898850686973:web:200cb62dc8c2b1a6853b94"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);