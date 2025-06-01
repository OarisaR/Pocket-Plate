import './App.css';
import MyNav from './components/NavBar';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import StudentHome from './pages/StudentHome';
import VendorHome from './pages/VendorHome'; // create if needed
import VendorProfile from './pages/VendorProfile';
import Menu from './pages/Menu';
import VendorOrderHistory from './pages/VendorOrderHistory';
import StudentProfile from './pages/StudentProfile';
import RestaurantDetail from './pages/RestaurantDetail';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './pages/Footer'; // create if needed
import { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [role, setRole] = useState('guest');
  const navigate = useNavigate();

  // Auto-check role on login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userRole = docSnap.data().role;
          setRole(userRole);

          if (userRole === 'student') navigate('/student-home');
          else if (userRole === 'vendor') navigate('/vendor-home');
        } else {
          console.log('❌ No user doc found in Firestore');
        }
      } else {
        setRole('guest');
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <>
      <MyNav role={role} setRole={setRole} />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/vendor-home" element={<VendorHome />} />
        <Route path="/vendor/profile" element={<VendorProfile/>} />
        <Route path = "/vendor/menu" element={<Menu/>}/>
        <Route path="/vendor/orders" element={<VendorOrderHistory/>} />
        <Route path="/student/profile" element={<StudentProfile />} />
        
<Route path="/student/restaurant/:id" element={<RestaurantDetail />} />
        <Route
          path="/pricing"
          element={
            <h1 style={{ paddingTop: '100px', textAlign: 'center', color: '#4a5568' }}>
              Pricing Page Coming Soon
            </h1>
          }
        />
      
      </Routes>
        <Footer/>
    </>
  );
}

export default App;


