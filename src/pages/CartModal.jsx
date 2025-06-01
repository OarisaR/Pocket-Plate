import React from 'react';
import { Modal, Button, ListGroup, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const CartModal = ({ cartItems, show, handleClose, onProceedToPay }) => {
  // Calculate total items count
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);

  return (
    <>
      <style>
        {`
          .cart-modal-header {
            background-color: #fce7f3 !important;
            border-bottom: none !important;
          }

          .cart-modal-title {
            color: #374151 !important;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            font-size: 1.5rem;
          }

          .cart-modal-body {
            padding: 2rem !important;
            background-color: #ffffff !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
          }

          .cart-item {
            padding: 1.5rem !important;
            border: 1px solid #f9a8d4 !important;
            border-radius: 10px !important;
            margin-bottom: 1rem !important;
            background-color: #fdf2f8 !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
          }

          .cart-item-name {
            color: #374151 !important;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
          }

          .cart-item-price {
            color: #ec4899 !important;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
          }

          .cart-modal-footer {
            background-color: #fce7f3 !important;
            border-top: none !important;
          }

          .close-button {
            background-color: #d4a5a5 !important;
            border: none !important;
            transition: background-color 0.3s !important;
          }

          .close-button:hover {
            background-color: #ec4899 !important;
          }

          .proceed-button {
            background-color: #10b981 !important;
            border: none !important;
            transition: background-color 0.3s !important;
          }

          .proceed-button:hover {
            background-color: #059669 !important;
          }
        `}
      </style>

      {/* Floating Cart Button */}
      <Button 
        variant="primary" 
        onClick={handleClose} // We'll handle open/close from parent, so this toggles modal
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          zIndex: 1050,
          display: totalCount > 0 ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          backgroundColor: '#ec4899', // Accent pink
          border: 'none',
          boxShadow: '0 4px 15px rgba(236, 72, 153, 0.2)',
        }}
        aria-label="Open cart"
      >
        <FaShoppingCart />
        <Badge 
          pill 
          bg="danger" 
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            fontSize: '0.8rem',
          }}
        >
          {totalCount}
        </Badge>
      </Button>

      {/* Cart Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="cart-modal-header">
          <Modal.Title className="cart-modal-title">
            Your Cart ({totalCount} item{totalCount !== 1 ? 's' : ''})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="cart-modal-body">
          {cartItems.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280' }}>Your cart is empty.</p>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item 
                  key={item.id} 
                  className="cart-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong className="cart-item-name">{item.name}</strong> <br />
                    <small style={{ color: '#6b7280' }}>Price: ${item.price.toFixed(2)}</small> <br />
                    <small style={{ color: '#6b7280' }}>Quantity: {item.quantity}</small>
                  </div>
                  <div>
                    <strong className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        {cartItems.length > 0 && (
          <Modal.Footer className="cart-modal-footer">
            <div className="me-auto">
              <strong style={{ color: '#374151' }}>Total: ${totalPrice}</strong>
            </div>
            <Button 
              variant="secondary" 
              onClick={handleClose}
              className="close-button"
            >
              Close
            </Button>
            <Button 
              variant="success" 
              disabled={cartItems.length === 0} 
              onClick={() => {
                onProceedToPay();
                handleClose();
              }}
              className="proceed-button"
            >
              Proceed to Pay
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default CartModal;