import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const apiKey = import.meta.env.VITE_GEOCODE_API_KEY;
const firebaseConfig = {
  apiKey: { apiKey },
  authDomain: "house-marketplacce-app-e3a26.firebaseapp.com",
  projectId: "house-marketplacce-app-e3a26",
  storageBucket: "house-marketplacce-app-e3a26.firebasestorage.app",
  messagingSenderId: "395735053106",
  appId: "1:395735053106:web:9788b63777bc44e57add2b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
