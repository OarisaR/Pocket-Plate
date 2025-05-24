import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Row, Col, Card } from 'react-bootstrap';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const VendorMenu = () => {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', price: '', description: '' });
  const [vendorId, setVendorId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setVendorId(user.uid);
        const menuRef = collection(db, 'users', user.uid, 'menu');
        const snapshot = await getDocs(menuRef);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMenu(items);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price) return alert("Name and price are required.");
    const menuRef = collection(db, 'users', vendorId, 'menu');
    const docRef = await addDoc(menuRef, newItem);
    setMenu([...menu, { id: docRef.id, ...newItem }]);
    setNewItem({ name: '', price: '', description: '' });
  };

  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(db, 'users', vendorId, 'menu', id));
    setMenu(menu.filter(item => item.id !== id));
  };

  const handleEditItem = (item) => {
    setEditingId(item.id);
    setEditItem(item);
  };

  const handleUpdateItem = async () => {
    const itemRef = doc(db, 'users', vendorId, 'menu', editingId);
    await updateDoc(itemRef, editItem);
    const updatedMenu = menu.map(item => item.id === editingId ? { ...editItem, id: editingId } : item);
    setMenu(updatedMenu);
    setEditingId(null);
    setEditItem({ name: '', price: '', description: '' });
  };

  const styles = {
    page: {
      background: 'linear-gradient(to right, #fff0f5, #ffeef5)',
      minHeight: '100vh',
      paddingTop: '40px',
      fontFamily: `'Poppins', Tahoma, Geneva, Verdana, sans-serif`,
    },
    card: {
      backgroundColor: '#fff',
      border: '1px solid #ffc0cb',
      borderRadius: '16px',
      boxShadow: '0 4px 16px rgba(255, 192, 203, 0.3)',
      padding: '40px 30px',
    },
    title: {
      color: '#d63384',
      fontWeight: '600',
      marginBottom: '30px',
      textAlign: 'center',
      fontSize: '1.8rem',
    },
    input: {
      borderRadius: '12px',
      borderColor: '#f8c8dc',
      boxShadow: '0 1px 4px rgba(255, 192, 203, 0.2)',
    },
    button: {
      borderRadius: '12px',
      transition: '0.3s',
      fontWeight: '500',
    },
    addButton: {
      backgroundColor: '#ff69b4',
      border: 'none',
      color: 'white',
    },
    tableHeader: {
      backgroundColor: '#ff85b3',
      color: 'white',
    }
  };

  return (
    <div style={styles.page}>
      <Container>
        <Card style={styles.card}>
          <h2 style={styles.title}>Vendor Menu Management</h2>
          <Row className="mb-4">
            <Col md={4}>
              <Form.Control placeholder="Item Name" value={newItem.name} style={styles.input}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
            </Col>
            <Col md={2}>
              <Form.Control type="number" placeholder="Price" value={newItem.price} style={styles.input}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Description" value={newItem.description} style={styles.input}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
            </Col>
            <Col md={2}>
              <Button style={{ ...styles.button, ...styles.addButton }} className="w-100" onClick={handleAddItem}>
                ➕ Add
              </Button>
            </Col>
          </Row>

          <Table bordered hover responsive>
            <thead>
              <tr style={styles.tableHeader}>
                <th>#</th><th>Name</th><th>Price (৳)</th><th>Description</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  {editingId === item.id ? (
                    <>
                      <td><Form.Control value={editItem.name} style={styles.input}
                        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} /></td>
                      <td><Form.Control type="number" value={editItem.price} style={styles.input}
                        onChange={(e) => setEditItem({ ...editItem, price: e.target.value })} /></td>
                      <td><Form.Control value={editItem.description} style={styles.input}
                        onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} /></td>
                      <td>
                        <Button variant="primary" size="sm" className="me-2" onClick={handleUpdateItem}>💾 Save</Button>
                        <Button variant="secondary" size="sm" onClick={() => setEditingId(null)}>✖ Cancel</Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item.name}</td><td>{item.price}</td><td>{item.description}</td>
                      <td>
                        <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleEditItem(item)}>✏️ Edit</Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteItem(item.id)}>🗑 Delete</Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {menu.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No items added yet. Start creating your menu! 🍱</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
};

export default VendorMenu;
