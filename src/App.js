import './App.css';
import MyNav from './components/NavBar';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

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
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/pricing"
          element={
            <h1 style={{ paddingTop: '100px', textAlign: 'center', color: '#4a5568' }}>
              Pricing Page Coming Soon
            </h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;

