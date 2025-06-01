<<<<<<< HEAD
import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { ShopWindow, Mortarboard } from "react-bootstrap-icons";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import "./SignupModal.css";
const SignupModal = ({ show, onHide }) => {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
=======
import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import {
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { auth, db, googleProvider } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import './SignupModal.css';
const SignupModal = ({ show, onHide }) => {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
<<<<<<< HEAD
      [e.target.name]: e.target.value,
=======
      [e.target.name]: e.target.value
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
<<<<<<< HEAD
      alert("Passwords do not match!");
      return;
    }

    if (role === "student" && !email.endsWith("@student.cuet.ac.bd")) {
      alert("Students must use an @student.cuet.ac.bd email address!");
      return;
    }

    if (role === "vendor" && !email.endsWith("@vendor.gmail.com")) {
      alert("Vendors must use an @vendor.gmail.com email address!");
=======
      alert('Passwords do not match!');
      return;
    }

    if (role === 'student' && !email.endsWith('@student.cuet.ac.bd')) {
      alert('Students must use an @student.cuet.ac.bd email address!');
      return;
    }

    if (role === 'vendor' && !email.endsWith('@vendor.gmail.com')) {
      alert('Vendors must use an @vendor.gmail.com email address!');
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
      return;
    }

    try {
<<<<<<< HEAD
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
=======
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        role,
        createdAt: new Date()
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
      });

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setRole(null);
        onHide();
      }, 2000);
    } catch (error) {
<<<<<<< HEAD
      console.error("Signup error:", error.message);
      alert("Signup failed: " + error.message);
=======
      console.error('Signup error:', error.message);
      alert('Signup failed: ' + error.message);
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

<<<<<<< HEAD
      if (role === "student" && !user.email.endsWith("@student.cuet.ac.bd")) {
        alert("Invalid email address!");
        return;
      }

      if (role === "vendor" && !user.email.endsWith("@vendor.gmail.com")) {
        alert("Invalid email address!");
        return;
      }

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "Unnamed",
        email: user.email,
        role,
        createdAt: new Date(),
=======
      if (role === 'student' && !user.email.endsWith('@student.cuet.ac.bd')) {
        alert('Invalid email address!');
        return;
      }

      if (role === 'vendor' && !user.email.endsWith('@vendor.gmail.com')) {
        alert('Invalid email address!');
        return;
      }

      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName || 'Unnamed',
        email: user.email,
        role,
        createdAt: new Date()
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
      });

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setRole(null);
        onHide();
      }, 2000);
    } catch (error) {
<<<<<<< HEAD
      console.error("Google signup failed:", error.message);
      alert("Google signup failed: " + error.message);
=======
      console.error('Google signup failed:', error.message);
      alert('Google signup failed: ' + error.message);
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleBackToRoleSelection = () => {
    setRole(null);
<<<<<<< HEAD
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setRole(null);
        onHide();
      }}
      centered
      className="auth-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="modal-title" style={{ marginLeft: "95px" }}>
          {role
            ? `Sign Up as ${role === "vendor" ? "Vendor" : "Student"}`
            : "Join Pocket Plate"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-2">
=======
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <Modal show={show} onHide={() => { setRole(null); onHide(); }} centered className="auth-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="modal-title" style ={{marginLeft : '95px'}}>
          {role ? `Sign Up as ${role === 'vendor' ? 'Vendor' : 'Student'}` : 'Join Pocket Plate'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-0">
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
        {showAlert && (
          <Alert variant="success" className="custom-alert">
            Signup successful!
          </Alert>
        )}

        {!role ? (
<<<<<<< HEAD
          <div style={{ textAlign: "center", paddingTop: "1.5rem" }}>
  <p
    style={{
      fontFamily: "Poppins",
      fontSize: "1.2rem",
      fontWeight: "500",
      color: "#333",
      paddingBottom: "1rem",
    }}
  >
=======
          <div style={{ textAlign: 'center', paddingTop: '1.5rem' }}>
  <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#333' }}>
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
    Who are you signing up as?
  </p>
  <div
    style={{
<<<<<<< HEAD
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "1.5rem",
      gap: "2rem", // more space between buttons
      width: "100%",
      maxWidth: "320px",
      marginLeft: "auto",
      marginRight: "auto",
=======
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '1.5rem',
      flexWrap: 'wrap',
      gap: '1rem'
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
    }}
  >
    <Button
      variant="primary"
      style={{
<<<<<<< HEAD
        width: "100%",
        height: "140px", // taller button
        padding: "1rem",
        fontSize: "1.2rem",
        fontWeight: "600",
        borderRadius: "12px",
        backgroundColor: "#be185d",
        fontFamily: "Poppins, sans-serif",
        border: "none",
        display: "flex",
        flexDirection: "column", // stack icon and text vertically
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        color: "white",
      }}
      onClick={() => handleRoleSelect("student")}
    >
      <Mortarboard size={48} />
      I'm a Student
    </Button>

    <Button
      variant="secondary"
      style={{
        width: "100%",
        height: "140px",
        padding: "1rem",
        fontSize: "1.2rem",
        fontWeight: "600",
        borderRadius: "12px",
        backgroundColor: "#ec4899",
        fontFamily: "Poppins, sans-serif",
        border: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        color: "white",
      }}
      onClick={() => handleRoleSelect("vendor")}
    >
      <ShopWindow size={48} />
=======
        padding: '0.6rem 1.5rem',
        fontSize: '1rem',
        fontWeight: '500',
        borderRadius: '8px',
        backgroundColor: '#007bff',
        border: 'none'
      }}
      onClick={() => handleRoleSelect('student')}
    >
      I'm a Student
    </Button>
    <Button
      variant="secondary"
      style={{
        padding: '0.6rem 1.5rem',
        fontSize: '1rem',
        fontWeight: '500',
        borderRadius: '8px',
        backgroundColor: '#6c757d',
        border: 'none'
      }}
      onClick={() => handleRoleSelect('vendor')}
    >
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
      I'm a Vendor
    </Button>
  </div>
</div>

        ) : (
          <>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">
<<<<<<< HEAD
                  {role === "vendor" ? "Restaurant Name" : "Full Name"}
=======
                  {role === 'vendor' ? 'Restaurant Name' : 'Full Name'}
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
<<<<<<< HEAD
                  placeholder={
                    role === "vendor"
                      ? "Enter your restaurant name"
                      : "Enter your full name"
                  }
=======
                  placeholder={role === 'vendor' ? 'Enter your restaurant name' : 'Enter your full name'}
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
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

<<<<<<< HEAD
              <div className="d-grid gap-2 mb-3">
                <Button type="submit" className="btn-primary-custom w-100">
=======
              <div className="d-grid gap-2">
                <Button type="submit" className="btn-primary-custom">
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
                  Create Account
                </Button>
              </div>
            </Form>

<<<<<<< HEAD
            <div className="d-grid mb-3">
=======
            <div className="text-center mt-3">
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
              <Button
                variant="outline-danger"
                className="w-100"
                onClick={handleGoogleSignup}
              >
                Sign up with Google
              </Button>
            </div>

<<<<<<< HEAD
            <div className="text-center">
=======
            <div className="text-center mt-3">
>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
              <Button
                variant="link"
                className="p-0 text-decoration-none auth-link"
                onClick={handleBackToRoleSelection}
              >
                ← Back to Role Selection
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
<<<<<<< HEAD
=======




>>>>>>> 211f792adca55607044eb9358f47795ddb2b3ea4
