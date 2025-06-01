import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faMobileAlt, faBroom } from '@fortawesome/free-solid-svg-icons';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import './Welcome.css';
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
  Your go-to platform for students to order fresh meals and vendors to showcase their delicious offerings.
</p>
<p className="hero-description mb-5">
  Fresh campus eats, just a tap away.
</p>

                <div className="hero-buttons">
                  <Button 
                    className="btn-primary-custom me-3 mb-3" 
                    size="lg"
                    style = {{backgroundColor : '#DE3163'}}
                    onClick={() => setShowSignup(true)}
                  >
                    Get Started
                  </Button>
                  <Button 
                    className="btn-secondary-custom mb-3" 
                    style = {{backgroundColor : '#DE3163'}}
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

   <div className="features-section py-5" style={{ backgroundColor: "#fefefe" }}>
      <Container>
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 style={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: "#b8345f" }}>
            Why Pocket Plate?
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#666", maxWidth: 480, margin: "0 auto" }}>
            Simplify your campus meals with quick, tasty options delivered right to you.
          </p>
        </div>

        {/* Features Cards */}
        <Row className="justify-content-center">
          {/* Feature 1 */}
          <Col md={4} className="text-center mb-4">
            <div
              className="feature-card shadow-sm p-4 rounded-4 bg-white border border-light"
              style={{ transition: "transform 0.3s ease", cursor: "default" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-8px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div className="feature-icon mb-3" style={{ fontSize: "3rem", color: "#d6336c" }}>
                <FontAwesomeIcon icon={faUtensils} />
              </div>
              <h4 className="feature-title" style={{ fontWeight: 600, color: "#b8345f" }}>
                Curated Recipes
              </h4>
              <p className="feature-description" style={{ color: "#444" }}>
                Discover handpicked recipes that match your taste and dietary preferences.
              </p>
            </div>
          </Col>

          {/* Feature 2 */}
          <Col md={4} className="text-center mb-4">
            <div
              className="feature-card shadow-sm p-4 rounded-4 bg-white border border-light"
              style={{ transition: "transform 0.3s ease", cursor: "default" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-8px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div className="feature-icon mb-3" style={{ fontSize: "3rem", color: "#d6336c" }}>
                <FontAwesomeIcon icon={faMobileAlt} />
              </div>
              <h4 className="feature-title" style={{ fontWeight: 600, color: "#b8345f" }}>
                Mobile First
              </h4>
              <p className="feature-description" style={{ color: "#444" }}>
                Access your recipes anywhere, anytime with our responsive design.
              </p>
            </div>
          </Col>

          {/* Feature 3 */}
          <Col md={4} className="text-center mb-4">
            <div
              className="feature-card shadow-sm p-4 rounded-4 bg-white border border-light"
              style={{ transition: "transform 0.3s ease", cursor: "default" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-8px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div className="feature-icon mb-3" style={{ fontSize: "3rem", color: "#d6336c" }}>
                <FontAwesomeIcon icon={faBroom} />
              </div>
              <h4 className="feature-title" style={{ fontWeight: 600, color: "#b8345f" }}>
                Simple & Clean
              </h4>
              <p className="feature-description" style={{ color: "#444" }}>
                Focus on what matters most — cooking great food without distractions.
              </p>
            </div>
          </Col>
        </Row>

        {/* Testimonials Section */}
        <div className="testimonials mt-5 text-center" style={{ maxWidth: 720, margin: "3rem auto 0" }}>
          <h3 style={{ fontWeight: 700, color: "#b8345f", marginBottom: "1.5rem" }}>
            What Our Users Say
          </h3>
          <blockquote
            style={{
              fontStyle: "italic",
              color: "#555",
              fontSize: "1.1rem",
              lineHeight: "1.6",
              marginBottom: "1.5rem",
            }}
          >
            “Pocket Plate changed how I order food on campus — super quick and so easy to use! The curated
            menus always have something delicious.”
          </blockquote>
          <cite style={{ fontWeight: 600, color: "#d6336c" }}>— Amina S., Student</cite>
        </div>
      </Container>
    </div>


      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
      <SignupModal show={showSignup} onHide={() => setShowSignup(false)} />
    </>
  );
};

export default Welcome;