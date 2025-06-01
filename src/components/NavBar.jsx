import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import './NavBar.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // adjust path if needed
import { VscNoNewline } from 'react-icons/vsc';

function MyNav({ role, setRole }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate(); // ✅ Required for redirect

  const prefix = role === 'student' ? '/student' : role === 'vendor' ? '/vendor' : '';

  const renderNavItems = () => {
    switch (role) {
      case 'guest':
        return (
          <>
            <Nav.Link style={{marginLeft: '900px'}}as={NavLink} to="/about" className="nav-link-custom">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/services" className="nav-link-custom">
              Services
            </Nav.Link>
          </>
        );
      case 'student':
        return (
          <div className="navbox">
          
            <Nav.Link as={NavLink} to={`${prefix}/cart`} className="nav-link-custom">
              Cart
            </Nav.Link>
            <Nav.Link as={NavLink} to={`${prefix}/profile`} className="nav-link-custom">
              Profile
            </Nav.Link>
          </div>
        );
      case 'vendor':
        return (
          <div className="v-navbox">
            <Nav.Link as={NavLink} to={`${prefix}-home`} className="nav-link-custom">
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to={`${prefix}/menu`} className="nav-link-custom">
              Menu
            </Nav.Link>
            <Nav.Link as={NavLink} to={`${prefix}/orders`} className="nav-link-custom">
              Orders
            </Nav.Link>
            
            <Nav.Link as={NavLink} to={`${prefix}/profile`} className="nav-link-custom">
              Profile
            </Nav.Link>
          </div>
        );
      default:
        return null;
    }
  };

  const renderAuthButtons = () => {
    if (role === 'guest') {
      return null;
    } else {
      return (
        <Button
          variant="outline"
          className="btn-outline-custom"
          style={{ marginLeft: '20px' , fontSize: '1rem' ,fontFamily:'Poppins', border: 'none' , color: '#e91e63'}}
          onClick={async () => {
            try {
              await signOut(auth);
              setRole('guest');
              navigate('/'); // ✅ Redirect to homepage after logout
            } catch (error) {
              console.error('Logout failed:', error.message);
            }
          }}
        >
          <span style={{color : "#e91e63",fontWeight:"bold"}}>Logout</span>
        </Button>
      );
    }
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar" fixed="top">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="navbar-brand-custom" style={{ fontSize: '1.5rem'}}>
            <span className="brand-icon" style={{ fontSize: '1.5rem' }}>🍽️</span>
           <span style ={{color : "#e91e63"}}>Pocket Plate</span> 
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-custom" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">{renderNavItems()}</Nav>
            <div className="navbar-auth-buttons">{renderAuthButtons()}</div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} setRole={setRole} />
      <SignupModal show={showSignup} onHide={() => setShowSignup(false)} setRole={setRole} />
    </>
  );
}

export default MyNav;

