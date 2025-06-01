import React, { useState, useEffect } from 'react';
import { Container, Card, Table } from 'react-bootstrap';

const VendorOrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const pastOrders = [
      {
        id: 'ORD001',
        customer: 'Dipannita Paul Orni',
        items: 'Burger, Coke',
        total: 150,
        time: '2025-05-20 12:30 PM',
        status: 'Completed',
      },
      {
        id: 'ORD002',
        customer: 'Oarisa Rebayet',
        items: 'Pizza',
        total: 200,
        time: '2025-05-21 1:00 PM',
        status: 'Completed',
      },
      {
        id: 'ORD003',
        customer: 'Tahmima Hoque Eid',
        items: 'Pasta, Juice',
        total: 180,
        time: '2025-05-22 2:15 PM',
        status: 'Completed',
      },
    ];
    setOrders(pastOrders);
  }, []);

  // Refined styles
  const styles = {
    page: {
      background: 'linear-gradient(to right, #fff0f5, #ffeaf2)',
      minHeight: '100vh',
      padding: '60px 20px',
      fontFamily: `'Poppins', sans-serif`,
      marginTop : `6rem`,
    },
    card: {
      backgroundColor: '#ffffff',
      border: '1px solid #ffb6c1',
      borderRadius: '20px',
      boxShadow: '0 8px 24px rgba(255, 192, 203, 0.3)',
      padding: '40px',
      maxWidth: '1000px',
      margin: '0 auto',
    },
    title: {
      color: '#d63384',
      fontWeight: '600',
      marginBottom: '30px',
      textAlign: 'center',
      fontSize: '2rem',
    },
    tableHeader: {
      backgroundColor: '#ff85b3',
      color: '#fff',
      fontSize: '0.95rem',
    },
    badge: {
      backgroundColor: '#28a745',
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '8px',
      fontSize: '0.85rem',
    },
    noOrders: {
      textAlign: 'center',
      color: '#999',
      padding: '20px',
    },
  };

  return (
    <div style={styles.page}>
      <Container>
        <Card style={styles.card}>
          <h2 style={styles.title}>📜 Order History</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr style={styles.tableHeader}>
                <th>#</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total (₹)</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={styles.noOrders}>No orders yet.</td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.items}</td>
                    <td>{order.total}</td>
                    <td>{order.time}</td>
                    <td>
                      <span style={styles.badge}>{order.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
};

export default VendorOrderHistory;