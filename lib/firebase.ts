// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpdkUJ4NADEmj2dBnoyofo_XXzAzuN6lE",
  authDomain: "chris-bender.firebaseapp.com",
  projectId: "chris-bender",
  storageBucket: "chris-bender.firebasestorage.app",
  messagingSenderId: "429568833215",
  appId: "1:429568833215:web:ccafdc36f3b4f23307b80a",
  measurementId: "G-6QZSL3C81Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
