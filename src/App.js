import logo from './logo.svg';
import './App.css';
import MyNav from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { auth, db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { useEffect } from "react";

// Console test
console.log("Firebase Auth Instance:", auth);

function App() {
  // 🔥 Test Firestore connection once on load
  useEffect(() => {
    const testFirestore = async () => {
      try {
        const docRef = await addDoc(collection(db, "testCollection"), {
          testField: "It works!",
          timestamp: new Date(),
        });
        console.log("✅ Firestore connected. Document ID:", docRef.id);
      } catch (error) {
        console.error("❌ Firestore connection failed:", error.message);
      }
    };

    testFirestore();
  }, []);

  return (
    <>
      <MyNav />
      <Routes>
        <Route path="/" element={<div>Welcome to Pocket Plate</div>} />
      </Routes>
    </>
  );
}

export default App;

