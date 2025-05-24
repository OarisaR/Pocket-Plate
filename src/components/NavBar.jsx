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
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to={`${prefix}/menu`} className="nav-link-custom">
              Menu
            </Nav.Link>
            <Nav.Link as={NavLink} to={`${prefix}/orders`} className="nav-link-custom">
              Orders
            </Nav.Link>
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
          Logout
        </Button>
      );
    }
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar" fixed="top">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="navbar-brand-custom">
            <span className="brand-icon">🍽️</span>
            Pocket Plate
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

