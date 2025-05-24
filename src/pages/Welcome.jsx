import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import './Welcome.css'; // Assuming you have a CSS file for styling
const Welcome = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <div className="landing-hero">
        <Container>
          <Row className="min-vh-100 align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <div className="hero-content">
                <h1 className="hero-title mb-4">
                  Welcome to <span className="brand-highlight">Pocket Plate</span>
                </h1>
                <p className="hero-subtitle mb-4">
                  Your personal culinary companion for discovering, saving, and sharing 
                  delicious recipes that fit perfectly in your pocket.
                </p>
                <p className="hero-description mb-5">
                  Simplify your cooking journey with our minimalist approach to recipe management. 
                  Clean, beautiful, and effortlessly organized.
                </p>
                <div className="hero-buttons">
                  <Button 
                    className="btn-primary-custom me-3 mb-3" 
                    size="lg"
                    onClick={() => setShowSignup(true)}
                  >
                    Get Started
                  </Button>
                  <Button 
                    className="btn-secondary-custom mb-3" 
                    size="lg"
                    onClick={() => setShowLogin(true)}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="features-section py-5">
        <Container>
          <Row>
            <Col md={4} className="text-center mb-4">
              <div className="feature-card">
                <div className="feature-icon mb-3">🍽️</div>
                <h4 className="feature-title">Curated Recipes</h4>
                <p className="feature-description">
                  Discover handpicked recipes that match your taste and dietary preferences.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="feature-card">
                <div className="feature-icon mb-3">📱</div>
                <h4 className="feature-title">Mobile First</h4>
                <p className="feature-description">
                  Access your recipes anywhere, anytime with our responsive design.
                </p>
              </div>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="feature-card">
                <div className="feature-icon mb-3">✨</div>
                <h4 className="feature-title">Simple & Clean</h4>
                <p className="feature-description">
                  Focus on what matters most - cooking great food without distractions.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
      <SignupModal show={showSignup} onHide={() => setShowSignup(false)} />
    </>
  );
};

export default Welcome;