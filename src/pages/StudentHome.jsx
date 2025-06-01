import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './StudentHome.css';
import { useNavigate } from 'react-router-dom';

const StudentHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const mockRestaurants = [
    {
      id: 1,
      name: "Placeholder 1",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      isOpen: true,
      cuisine: "Italian",
      rating: 4.5,
      deliveryTime: "25-35 min",
      featured: true
    },
    {
      id: 2,
      name: "Placeholder 2",
      image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop",
      isOpen: true,
      cuisine: "Chinese",
      rating: 4.2,
      deliveryTime: "30-40 min",
      featured: false
    },
    {
      id: 3,
      name: "Placeholder 3",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      isOpen: false,
      cuisine: "Mexican",
      rating: 4.7,
      deliveryTime: "20-30 min",
      featured: true
    },
    {
      id: 4,
      name: "Placeholder 4",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      isOpen: true,
      cuisine: "American",
      rating: 4.3,
      deliveryTime: "15-25 min",
      featured: false
    },
    {
      id: 5,
      name: "Placeholder 5",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      isOpen: true,
      cuisine: "Japanese",
      rating: 4.8,
      deliveryTime: "35-45 min",
      featured: true
    },
    {
      id: 6,
      name: "Placeholder 6",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      isOpen: false,
      cuisine: "Mediterranean",
      rating: 4.4,
      deliveryTime: "25-35 min",
      featured: false
    },
    {
      id: 7,
      name: "Placeholder 7",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      isOpen: true,
      cuisine: "Indian",
      rating: 4.6,
      deliveryTime: "30-40 min",
      featured: false
    },
    {
      id: 8,
      name: "Placeholder 8",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      isOpen: true,
      cuisine: "Healthy",
      rating: 4.1,
      deliveryTime: "20-30 min",
      featured: false
    }
  ];

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const vendorNames = [];

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.role === 'vendor') {
            vendorNames.push(data.name);
          }
        });

        const updatedRestaurants = mockRestaurants.map((restaurant, index) => ({
          ...restaurant,
          name: vendorNames[index] || restaurant.name,
        }));

        setRestaurants(updatedRestaurants);
        setFilteredRestaurants(updatedRestaurants);
      } catch (error) {
        console.error('Error fetching vendors:', error.message);
        setRestaurants(mockRestaurants);
        setFilteredRestaurants(mockRestaurants);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    const filtered = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchTerm, restaurants]);

  const RestaurantCard = ({ restaurant, index }) => (
    <Col lg={3} md={4} sm={6} xs={12} className="mb-4">
      <Card
        className="restaurant-card h-100"
        onClick={() => navigate(`/student/restaurant/${index}`)}
        style={{ cursor: 'pointer' }}
      >
        <div className="restaurant-image-container">
          <Card.Img
            variant="top"
            src={restaurant.image}
            alt={restaurant.name}
            className="restaurant-image"
          /> 
          <div className="restaurant-status-overlay">
            <Badge className={`status-badge ${restaurant.isOpen ? 'open' : 'closed'}`} >
              {restaurant.isOpen ? 'Open' : 'Closed'}
            </Badge>
          </div>
          {restaurant.featured && (
            <div className="featured-badge">
              <Badge className="featured-label">Featured</Badge>
            </div>
          )}
        </div>
        <Card.Body className="restaurant-card-body">
          <Card.Title className="restaurant-name">{restaurant.name}</Card.Title>
          <div className="restaurant-details">
            <span className="cuisine-type">{restaurant.cuisine}</span>
            <div className="restaurant-meta">
              <span className="rating">⭐ {restaurant.rating}</span>
              <span className="delivery-time">🕒 {restaurant.deliveryTime}</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div className="student-home">
      <Container fluid className="px-4">
        <div className="welcome-section">
          <Row className="align-items-center mb-4">
            <Col>
              <h1 className="page-title mt-5">Food cravings? We’ve got you covered! 🍽️</h1>
              <p className="page-subtitle mt-3">What would you like to eat today?</p>
            </Col>
          </Row>
        </div>

        <div className="restaurants-section">
          <Row className="mb-3">
            <Col>
              <h2 className="section-title">Popular Restaurants</h2>
              <p className="section-subtitle">
                {filteredRestaurants.length} restaurants available
              </p>
            </Col>
          </Row>

          <Row>
            {filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} index={index} />
            ))}
          </Row>

          {filteredRestaurants.length === 0 && (
            <Row>
              <Col className="text-center py-5">
                <div className="no-results">
                  <h3>No restaurants found</h3>
                  <p>Try searching for a different cuisine or restaurant name</p>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </div>
  );
};

export default StudentHome;

