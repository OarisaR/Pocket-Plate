import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form, InputGroup } from 'react-bootstrap';
import StudentNavBar from '../components/StudentNavBar';
import './StudentHome.css';

const StudentHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock restaurant data
  const mockRestaurants = [
    {
      id: 1,
      name: "Bella's Italian Kitchen",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      isOpen: true,
      cuisine: "Italian",
      rating: 4.5,
      deliveryTime: "25-35 min",
      featured: true
    },
    {
      id: 2,
      name: "Dragon Palace",
      image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop",
      isOpen: true,
      cuisine: "Chinese",
      rating: 4.2,
      deliveryTime: "30-40 min",
      featured: false
    },
    {
      id: 3,
      name: "Taco Fiesta",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      isOpen: false,
      cuisine: "Mexican",
      rating: 4.7,
      deliveryTime: "20-30 min",
      featured: true
    },
    {
      id: 4,
      name: "Burger Junction",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      isOpen: true,
      cuisine: "American",
      rating: 4.3,
      deliveryTime: "15-25 min",
      featured: false
    },
    {
      id: 5,
      name: "Sakura Sushi",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      isOpen: true,
      cuisine: "Japanese",
      rating: 4.8,
      deliveryTime: "35-45 min",
      featured: true
    },
    {
      id: 6,
      name: "Mediterranean Delight",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      isOpen: false,
      cuisine: "Mediterranean",
      rating: 4.4,
      deliveryTime: "25-35 min",
      featured: false
    },
    {
      id: 7,
      name: "Spice Garden",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      isOpen: true,
      cuisine: "Indian",
      rating: 4.6,
      deliveryTime: "30-40 min",
      featured: false
    },
    {
      id: 8,
      name: "Fresh & Green",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      isOpen: true,
      cuisine: "Healthy",
      rating: 4.1,
      deliveryTime: "20-30 min",
      featured: false
    }
  ];

  useEffect(() => {
    setRestaurants(mockRestaurants);
    setFilteredRestaurants(mockRestaurants);
  }, []);

  useEffect(() => {
    const filtered = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchTerm, restaurants]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const RestaurantCard = ({ restaurant }) => (
    <Col lg={3} md={4} sm={6} xs={12} className="mb-4">
      <Card className="restaurant-card h-100">
        <div className="restaurant-image-container">
          <Card.Img 
            variant="top" 
            src={restaurant.image} 
            alt={restaurant.name}
            className="restaurant-image"
          />
          <div className="restaurant-status-overlay">
            <Badge 
              className={`status-badge ${restaurant.isOpen ? 'open' : 'closed'}`}
            >
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
              <span className="rating">
                ⭐ {restaurant.rating}
              </span>
              <span className="delivery-time">
                🕒 {restaurant.deliveryTime}
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <>
      <StudentNavBar onSearch={handleSearch} />
      <div className="student-home">
        <Container fluid className="px-4">
          <div className="welcome-section">
            <Row className="align-items-center mb-4">
              <Col>
                <h1 className="page-title">Good afternoon! 👋</h1>
                <p className="page-subtitle">What would you like to eat today?</p>
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
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
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
    </>
  );
};

export default StudentHome;