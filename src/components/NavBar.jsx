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
<<<<<<< HEAD
import { VscNoNewline } from 'react-icons/vsc';
=======
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4

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
<<<<<<< HEAD
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
=======
          <>
            <Nav.Link as={NavLink} to={`${prefix}/search`} className="nav-link-custom">
              🔍 Search
            </Nav.Link>
            <Nav.Link as={NavLink} to={`${prefix}/cart`} className="nav-link-custom">
              🛒 Cart
            </Nav.Link>
            <Nav.Link as={NavLink} to={`${prefix}/profile`} className="nav-link-custom">
              👤 Profile
            </Nav.Link>
          </>
        );
      case 'vendor':
        return (
          <>
            <Nav.Link as={NavLink} to={`${prefix}/dashboard`} className="nav-link-custom">
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to={`${prefix}/menu`} className="nav-link-custom">
              Menu
            </Nav.Link>
            <Nav.Link as={NavLink} to={`${prefix}/orders`} className="nav-link-custom">
              Orders
            </Nav.Link>
<<<<<<< HEAD
            
            <Nav.Link as={NavLink} to={`${prefix}/profile`} className="nav-link-custom">
              Profile
            </Nav.Link>
          </div>
=======
            <Nav.Item className="d-flex align-items-center px-3">
              <div
                className="form-check form-switch m-0"
                style={{ transform: 'scale(1.3)', transformOrigin: 'left center' }}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="navToggleSwitch"
                  onChange={() => {}}
                  style={{ cursor: 'pointer' }}
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="navToggleSwitch"
                  style={{
                    fontSize: '1rem',
                    marginLeft: '0.5rem',
                    userSelect: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Toggle
                </label>
              </div>
            </Nav.Item>
            <Nav.Link as={NavLink} to={`${prefix}/profile`} className="nav-link-custom">
              Profile
            </Nav.Link>
          </>
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
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
<<<<<<< HEAD
          style={{ marginLeft: '20px' , fontSize: '1rem' ,fontFamily:'Poppins', border: 'none' , color: '#e91e63'}}
=======
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
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
<<<<<<< HEAD
          <span style={{color : "#e91e63",fontWeight:"bold"}}>Logout</span>
=======
          Logout
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
        </Button>
      );
    }
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar" fixed="top">
        <Container>
<<<<<<< HEAD
          <Navbar.Brand as={NavLink} to="/" className="navbar-brand-custom" style={{ fontSize: '1.5rem'}}>
            <span className="brand-icon" style={{ fontSize: '1.5rem' }}>🍽️</span>
           <span style ={{color : "#e91e63"}}>Pocket Plate</span> 
=======
          <Navbar.Brand as={NavLink} to="/" className="navbar-brand-custom">
            <span className="brand-icon">🍽️</span>
            Pocket Plate
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
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

