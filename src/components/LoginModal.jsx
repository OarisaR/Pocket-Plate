import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

const LoginModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const isStudent = email.endsWith('@student.cuet.ac.bd');
    const isVendor = email.endsWith('@vendor.gmail.com');

    if (!isStudent && !isVendor) {
      alert('Only CUET student or vendor email addresses are allowed!');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, 'users', uid));
      const role = userDoc.exists() ? userDoc.data().role : null;

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onHide();
        if (role === 'student') navigate('/student-home');
        else if (role === 'vendor') navigate('/vendor-home');
        else navigate('/'); // fallback
      }, 1000);
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const email = user.email;

      const isStudent = email.endsWith('@student.cuet.ac.bd');
      const isVendor = email.endsWith('@vendor.gmail.com');

      if (!isStudent && !isVendor) {
        alert('Only CUET student or vendor email addresses are allowed!');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const role = userDoc.exists() ? userDoc.data().role : null;

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onHide();
        if (role === 'student') navigate('/student-home');
        else if (role === 'vendor') navigate('/vendor-home');
        else navigate('/');
      }, 1000);
    } catch (error) {
      console.error("Google login failed:", error.message);
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="auth-modal">
      <Modal.Header closeButton className="border-0 pb-0" >
        <Modal.Title className="modal-title" >Welcome Back</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        {showAlert && (
          <Alert variant="success" className="custom-alert">
            Login successful!
          </Alert>
        )}
        <Form onSubmit={handleSubmit} style={{marginTop:'10px'}}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your CUET or Vendor email"
              className="form-control-custom"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="form-control-custom"
              required
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button type="submit" className="btn-primary-custom">
              Sign In
            </Button>
          </div>
        </Form>

        <div className="text-center mt-3">
          <Button
            variant="outline-danger"
            className="w-100"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </Button>
        </div>

        <div className="text-center mt-3">
          <small className="text-muted">
            Don't have an account?{' '}
            <Button variant="link" className="p-0 text-decoration-none auth-link">
              Sign up here
            </Button>
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;



