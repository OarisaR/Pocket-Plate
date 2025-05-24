import logo from './logo.svg';
import './App.css';
import MyNav from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return (
    <Routes>
      <Route path="/" element={<MyNav />} />

    </Routes>
  );
}

export default App;
