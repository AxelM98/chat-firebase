// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqGYXhNOCW3ZuMeq0PdOtZy-r70n-Avyw",
  authDomain: "chat-3336a.firebaseapp.com",
  projectId: "chat-3336a",
  storageBucket: "chat-3336a.appspot.com",
  messagingSenderId: "631778699099",
  appId: "1:631778699099:web:0dcab92ec3ab9033471c7e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

