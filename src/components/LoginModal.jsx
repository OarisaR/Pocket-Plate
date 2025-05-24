import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // ⬅️ Add this

const LoginModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate(); // ⬅️ Initialize the hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email === 'admin@example.com' && password === 'admin123') {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onHide();
        navigate('/dashboard'); // ⬅️ Redirect to /dashboard
      }, 1000);
    } else {
      alert('Invalid email or password ❌');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="auth-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="modal-title">Welcome Back</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
          <small className="text-muted">
            {"Don't have an account? "}
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
