import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "chat-3336a.firebaseapp.com",
  projectId: "chat-3336a",
  storageBucket: "chat-3336a.appspot.com",
  messagingSenderId: "631778699099",
  appId: "1:631778699099:web:0dcab92ec3ab9033471c7e",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
