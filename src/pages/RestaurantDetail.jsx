import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Modal, ListGroup } from 'react-bootstrap';
import { BsCartFill } from 'react-icons/bs';
import { db, auth } from '../firebase';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import './RestaurantDetail.css';

const mockRestaurants = [
  { id: 0, name: "Bacha Baba", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop", isOpen: true, cuisine: "Italian", rating: 4.5, deliveryTime: "25-35 min", featured: true }, 
  { id: 1, name: "Chadpur Hotel", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop", isOpen: true, cuisine: "Chinese", rating: 4.2, deliveryTime: "30-40 min", featured: false },
  { id: 2, name: "Aimin Restaurant", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop", isOpen: true, cuisine: "Chinese", rating: 4.2, deliveryTime: "30-40 min", featured: false },
  { id: 3, name: "Deshi Restaurant", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop", isOpen: true, cuisine: "Chinese", rating: 4.2, deliveryTime: "30-40 min", featured: false },
  { id: 4, name: "Habibi Bistro", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop", isOpen: true, cuisine: "Chinese", rating: 4.2, deliveryTime: "30-40 min", featured: false },
  { id: 5, name: "TSC Cafeteria", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop", isOpen: true, cuisine: "Bengali", rating: 4.2, deliveryTime: "30-40 min", featured: false },
  { id: 6, name: "Carbon", image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop", isOpen: true, cuisine: "Chinese", rating: 4.2, deliveryTime: "30-40 min", featured: false }
];

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = mockRestaurants[parseInt(id)];

  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const vendorsSnapshot = await getDocs(query(collection(db, 'users'), where('name', '==', restaurant.name)));
        if (!vendorsSnapshot.empty) {
          const vendorDoc = vendorsSnapshot.docs[0];
          const menuSnapshot = await getDocs(collection(db, 'users', vendorDoc.id, 'menu'));
          const menuList = menuSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setMenuItems(menuList);
        }
      } catch (error) {
        console.error("Error fetching menu:", error.message);
      }
    };

    fetchMenu();
  }, [restaurant.name]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(ci => ci.id === item.id);
      return existing
        ? prev.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci)
        : [...prev, { ...item, quantity: 1 }];
    });
  };

  const saveCartToDatabase = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please sign in first!");

    try {
      await Promise.all(cartItems.map(item => 
        addDoc(collection(db, 'users', user.uid, 'cart'), {
          ...item,
          restaurant: restaurant.name,
          createdAt: new Date()
        })
      ));
      alert("Cart saved to database!");
    } catch (error) {
      console.error("Error saving cart:", error.message);
    }
  };

  const categories = [...new Set(menuItems.map(item => item.category))];
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="restaurant-detail" style={{ position: 'relative', minHeight: '100vh' }}>
      <Container fluid className="px-4">
        <Button variant="outline-secondary" onClick={() => navigate('/student-home')} className="mb-4">
          ← Back to Restaurants
        </Button>

        <Row>
          <Col lg={5}>
            <Card>
              <Card.Img src={restaurant.image} />
              <Card.Body>
                <h2>{restaurant.name}</h2>
                <p>{restaurant.cuisine} Cuisine</p>
                <p>⭐ {restaurant.rating}</p>
                <p>🕒 {restaurant.deliveryTime}</p>
                <Badge bg={restaurant.isOpen ? "success" : "secondary"}>
                  {restaurant.isOpen ? "Open" : "Closed"}
                </Badge>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>
            <h3>Menu</h3>
            {categories.map(cat => (
              <div key={cat}>
                <h5>{cat}</h5>
                {menuItems.filter(i => i.category === cat).map(item => (
                  <Card key={item.id} className="mb-2">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6>{item.name}</h6>
                          <p>{item.description}</p>
                        </div>
                        <div>
                          <strong>${item.price}</strong>
                          <Button size="sm" className="ms-2" onClick={() => addToCart(item)}>
                            Add
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ))}
          </Col>
        </Row>
      </Container>

      <Button
        onClick={() => setShowCart(true)}
        style={{
          position: 'fixed', bottom: '20px', right: '20px', borderRadius: '50%',
          width: '60px', height: '60px', backgroundColor: '#ff4081', color: '#fff',
          fontSize: '28px', zIndex: 1050
        }}
      >
        <BsCartFill />
        {cartItems.length > 0 && (
          <span style={{
            position: 'absolute', top: '5px', right: '5px',
            backgroundColor: '#e91e63', color: 'white', borderRadius: '50%',
            padding: '2px 6px', fontSize: '12px'
          }}>
            {cartItems.length}
          </span>
        )}
      </Button>

      <Modal show={showCart} onHide={() => setShowCart(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ListGroup>
              {cartItems.map(item => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                  <div>{item.name} (x{item.quantity})</div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        {cartItems.length > 0 && (
          <Modal.Footer>
            <strong>Total: ${totalPrice}</strong>
            <Button onClick={saveCartToDatabase}>Pay</Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default RestaurantDetail;


