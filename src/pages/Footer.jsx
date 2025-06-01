import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Twitter, Instagram } from 'react-bootstrap-icons';

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#b8345f',
        color: '#fff',
        padding: '2.5rem 0',
        marginTop: '4rem',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container>
        <Row className="text-center text-md-left">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 style={{ fontWeight: 700 , textAlign : 'left'  }}>Pocket Plate</h5>
            <p style={{ maxWidth: 320, color: '#f8d7de', marginBottom: 0 , textAlign : 'left' }}>
              Simplifying campus meals with quick, tasty options delivered right to you.
            </p>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <h5 style={{ fontWeight: 700,textAlign : 'left' }}>Quick Links</h5>
            <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: 0, textAlign: 'left' }}>
              <li><a href="#features" style={{ color: '#f8d7de', textDecoration: 'none' }}>Features</a></li>
              <li><a href="#testimonials" style={{ color: '#f8d7de', textDecoration: 'none' }}>Testimonials</a></li>
              <li><a href="#contact" style={{ color: '#f8d7de', textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </Col>

          <Col md={4} className="text-center text-md-left">
            <h5 style={{ fontWeight: 700 }}>Follow Us</h5>
            <div style={{ fontSize: '1.6rem', marginTop: '0.5rem' }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#f8d7de', marginRight: '1.2rem' }}
                aria-label="Facebook"
              >
                <Facebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#f8d7de', marginRight: '1.2rem' }}
                aria-label="Twitter"
              >
                <Twitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#f8d7de' }}
                aria-label="Instagram"
              >
                <Instagram />
              </a>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: '#f8d7de', margin: '2rem 0' }} />

        <Row>
          <Col className="text-center" style={{ fontSize: '0.9rem', color: '#f8d7de' }}>
            &copy; {new Date().getFullYear()} Pocket Plate. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
