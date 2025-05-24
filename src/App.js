import './App.css';
import MyNav from './components/NavBar';
import Register from './pages/Register';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <>
      <MyNav />
      <Routes>
        <Route path="/" element={<h1>Welcome to Home Page</h1>} />
        <Route path="/home" element={<h1>Home Page</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<h1>Pricing Page</h1>} />
      </Routes>
    </>
  );
}

export default App;
