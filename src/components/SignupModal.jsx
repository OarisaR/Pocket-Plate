import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const SignupModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Add your signup logic here
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      onHide();
    }, 2000);
  };

  return (
    <Modal show={show} onHide={onHide} centered className="auth-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="modal-title">Join Pocket Plate</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        {showAlert && (
          <Alert variant="success" className="custom-alert">
            Signup functionality will be implemented soon!
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="form-label">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="form-control-custom"
              required
            />
          </Form.Group>

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

          <Form.Group className="mb-3">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="form-control-custom"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="form-label">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="form-control-custom"
              required
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button type="submit" className="btn-primary-custom">
              Create Account
            </Button>
          </div>
        </Form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account?{' '}
            <Button variant="link" className="p-0 text-decoration-none auth-link">
              Sign in here
            </Button>
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
