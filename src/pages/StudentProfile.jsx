import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { auth, db } from '../firebase'; // make sure your firebase.js exports these
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [pastOrders, setPastOrders] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setStudent(userSnap.data());
        }
      }
    });

    // Mock order data for now
    setCurrentOrder({
      id: 'ORD004',
      items: 'Sandwich, Coffee',
      total: 120,
      status: 'In Progress',
      time: '2025-05-24 11:45 AM',
    });

    setPastOrders([
      {
        id: 'ORD001',
        items: 'Burger, Coke',
        total: 150,
        status: 'Completed',
        time: '2025-05-20 12:30 PM',
      },
      {
        id: 'ORD002',
        items: 'Pizza',
        total: 200,
        status: 'Completed',
        time: '2025-05-21 1:00 PM',
      },
      {
        id: 'ORD003',
        items: 'Pasta, Juice',
        total: 180,
        status: 'Completed',
        time: '2025-05-22 2:15 PM',
      },
    ]);

    return () => unsubscribe();
  }, []);

  const styles = {
    page: {
      background: 'linear-gradient(to right, #ffe0ec, #f9f3f3)',
      minHeight: '100vh',
      padding: '50px 20px',
      marginTop: '4rem',
      fontFamily: `'Poppins', sans-serif`,
      transition: 'all 0.4s ease-in-out',
    },
    cardBase: {
      background: '#fff',
      border: '1px solid #fcbfd6',
      borderRadius: '20px',
      padding: '30px',
      marginBottom: '25px',
      boxShadow: '0 8px 24px rgba(255, 105, 135, 0.15)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 32px rgba(255, 105, 135, 0.25)',
    },
    sectionTitle: {
      color: '#d63384',
      fontWeight: '600',
      fontSize: '1.6rem',
      marginBottom: '20px',
      textShadow: '0 1px 1px rgba(214, 51, 132, 0.1)',
    },
    infoLabel: {
      fontWeight: '500',
      color: '#6c757d',
    },
    infoValue: {
      color: '#212529',
    },
    tableHeader: {
      backgroundColor: '#ff73a1',
      color: 'white',
      fontWeight: '600',
      fontSize: '0.95rem',
      textTransform: 'uppercase',
    },
    badgeStyle: {
      fontSize: '0.85rem',
      padding: '5px 10px',
      borderRadius: '8px',
    },
  };

  const applyCardStyle = (index) => {
    return hoveredCard === index
      ? { ...styles.cardBase, ...styles.cardHover }
      : styles.cardBase;
  };

  if (!student) {
    return <div style={styles.page}><Container><p>Loading student info...</p></Container></div>;
  }

  return (
    <div style={styles.page}>
      <Container>
        <Row>
          <Col md={4}>
            <Card
              style={applyCardStyle(0)}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 style={styles.sectionTitle}>👤 Personal Info</h3>
              <p><span style={styles.infoLabel}>Name:</span> <span style={styles.infoValue}>{student.name}</span></p>
              <p><span style={styles.infoLabel}>ID:</span> <span style={styles.infoValue}>{student.id}</span></p>
              <p><span style={styles.infoLabel}>Email:</span> <span style={styles.infoValue}>{student.email}</span></p>
              <p><span style={styles.infoLabel}>Phone:</span> <span style={styles.infoValue}>{student["phone number"]}</span></p>
              <p><span style={styles.infoLabel}>Hall:</span> <span style={styles.infoValue}>{student.hall}</span></p>
            </Card>
          </Col>

          <Col md={8}>
            <Card
              style={applyCardStyle(1)}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 style={styles.sectionTitle}>📦 Current Order</h3>
              {currentOrder ? (
                <div>
                  <p><strong>Order ID:</strong> {currentOrder.id}</p>
                  <p><strong>Items:</strong> {currentOrder.items}</p>
                  <p><strong>Total:</strong> ₹{currentOrder.total}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className="badge bg-warning text-dark" style={styles.badgeStyle}>
                      {currentOrder.status}
                    </span>
                  </p>
                  <p><strong>Time:</strong> {currentOrder.time}</p>
                </div>
              ) : (
                <p className="text-muted">No current order.</p>
              )}
            </Card>

            <Card
              style={applyCardStyle(2)}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 style={styles.sectionTitle}>📜 Past Orders</h3>
              <Table striped bordered hover responsive>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Items</th>
                    <th>Total (₹)</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {pastOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">No past orders.</td>
                    </tr>
                  ) : (
                    pastOrders.map((order, index) => (
                      <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.id}</td>
                        <td>{order.items}</td>
                        <td>{order.total}</td>
                        <td>
                          <span className="badge bg-success" style={styles.badgeStyle}>
                            {order.status}
                          </span>
                        </td>
                        <td>{order.time}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentProfile;
