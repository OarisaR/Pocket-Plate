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
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (role === "student" && !email.endsWith("@student.cuet.ac.bd")) {
      alert("Students must use an @student.cuet.ac.bd email address!");
      return;
    }

    if (role === "vendor" && !email.endsWith("@vendor.gmail.com")) {
      alert("Vendors must use an @vendor.gmail.com email address!");
      return;
    }

    try {
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
      });

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setRole(null);
        onHide();
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error.message);
      alert("Signup failed: " + error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

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
      });

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setRole(null);
        onHide();
      }, 2000);
    } catch (error) {
      console.error("Google signup failed:", error.message);
      alert("Google signup failed: " + error.message);
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleBackToRoleSelection = () => {
    setRole(null);
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
        {showAlert && (
          <Alert variant="success" className="custom-alert">
            Signup successful!
          </Alert>
        )}

        {!role ? (
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
    Who are you signing up as?
  </p>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "1.5rem",
      gap: "2rem", // more space between buttons
      width: "100%",
      maxWidth: "320px",
      marginLeft: "auto",
      marginRight: "auto",
    }}
  >
    <Button
      variant="primary"
      style={{
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
      I'm a Vendor
    </Button>
  </div>
</div>

        ) : (
          <>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">
                  {role === "vendor" ? "Restaurant Name" : "Full Name"}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={
                    role === "vendor"
                      ? "Enter your restaurant name"
                      : "Enter your full name"
                  }
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

              <div className="d-grid gap-2 mb-3">
                <Button type="submit" className="btn-primary-custom w-100">
                  Create Account
                </Button>
              </div>
            </Form>

            <div className="d-grid mb-3">
              <Button
                variant="outline-danger"
                className="w-100"
                onClick={handleGoogleSignup}
              >
                Sign up with Google
              </Button>
            </div>

            <div className="text-center">
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
