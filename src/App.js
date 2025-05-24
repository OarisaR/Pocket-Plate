import './App.css';
import MyNav from './components/NavBar';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <>
      <MyNav />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<h1 style={{paddingTop: '100px', textAlign: 'center', color: '#4a5568'}}>Pricing Page Coming Soon</h1>} />
      </Routes>
    </>
  );
}

export default App;