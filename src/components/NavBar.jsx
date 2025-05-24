import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import './NavBar.css'; 
function MyNav() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" className="nav-link-custom">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/pricing" className="nav-link-custom">
                Pricing
              </Nav.Link>
            </Nav>
            
            <div className="navbar-auth-buttons">
              <Button 
                variant="outline" 
                className="btn-outline-custom me-2"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </Button>
              <Button 
                className="btn-primary-custom"
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
      <SignupModal show={showSignup} onHide={() => setShowSignup(false)} />
    </>
  );
}

export default MyNav;