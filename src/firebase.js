// Import necessary Firebase services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAC-5H2UhNsm9qYY3ukf4n-T73glPofsbI",
  authDomain: "pocket-plate.firebaseapp.com",
  projectId: "pocket-plate",
  storageBucket: "pocket-plate.appspot.com", 
  messagingSenderId: "943853781586",
  appId: "1:943853781586:web:dfd36c94ef2f0280be558b"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

