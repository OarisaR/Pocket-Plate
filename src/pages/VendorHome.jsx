import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const VendorHome = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "Dipannit Paul Orni",
      customerInitials: "D",
      orderTime: "10 mins ago",
      items: "Chicken Burger, Fries, Coke",
      total: 24.99,
      status: "pending",
    },
    {
      id: 2,
      customerName: "Oarisa Rebayet",
      customerInitials: "O",
      orderTime: "15 mins ago",
      items: "Veggie Pizza, Garlic Bread",
      total: 18.5,
      status: "pending",
    },
    {
      id: 3,
      customerName: "Tamima Hoque",
      customerInitials: "T",
      orderTime: "20 mins ago",
      items: "Pasta Carbonara, Tiramisu",
      total: 32.75,
      status: "pending",
    },
    {
      id: 4,
      customerName: "Sanjida Eva",
      customerInitials: "E",
      orderTime: "25 mins ago",
      items: "Sushi Platter, Green Tea",
      total: 45.0,
      status: "pending",
    },
  ]);

  // Calculate order counts
  const orderCounts = {
    pending: orders.filter((order) => order.status === "pending").length,
    accepted: orders.filter((order) => order.status === "accepted").length,
    cancelled: orders.filter((order) => order.status === "cancelled").length,
  };

  // Filter orders based on active filter
  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter((order) => order.status === activeFilter.toLowerCase());

  // Handle order actions
  const handleAcceptOrder = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "accepted" } : order
      )
    );
  };

  const handleCancelOrder = (orderId) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  const filterButtons = ["All", "Pending", "Accepted", "Cancelled"];

  return (
    <>
      <style>
        {`
          /* CSS Variables for Pink Theme */
          :root {
            --blush-pink: #ffc1cc;
            --dusty-rose: #d4a5a5;
            --soft-pink: #fdf2f8;
            --light-pink: #fce7f3;
            --medium-pink: #f9a8d4;
            --accent-pink: #ec4899;
            --deep-pink: #be185d;
            
            --white: #ffffff;
            --text-primary: #374151;
            --text-secondary: #6b7280;
            --text-muted: #9ca3af;
            
            --shadow-light: rgba(236, 72, 153, 0.1);
            --shadow-medium: rgba(236, 72, 153, 0.15);
            --border-light: rgba(236, 72, 153, 0.1);
            
            --success-light: #d1fae5;
            --success-medium: #10b981;
            --error-light: #fee2e2;
            --error-medium: #ef4444;
          }

          .vendor-dashboard {
            min-height: 100vh;
            background: linear-gradient(135deg, var(--soft-pink) 0%, var(--light-pink) 100%);
            padding: 3rem 0 2rem 0;
            font-family: 'Poppins', sans-serif;
            padding-left: 60px;
            padding-right:60px;
          }

          /* Dashboard Header */
          .dashboard-header {
            margin-bottom: 3rem;
            padding: 0 1rem;
          }

          .dashboard-title {
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            font-size: 2.5rem;
            color: var(--text-primary);
            margin-top: 4rem;
            padding: 0 0.5rem;
          }

          /* Summary Cards */
          .summary-cards {
            margin-bottom: 4rem;
            padding: 0 1rem;
          }

          .summary-card {
            border: none;
            border-radius: 20px;
            box-shadow: 0 8px 30px var(--shadow-light);
            transition: all 0.3s ease;
            overflow: hidden;
            height: 100%;
            margin-bottom: 1.5rem;
          }

          .summary-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 45px var(--shadow-medium);
          }

          .summary-card .card-body {
            padding: 2.5rem 2rem !important;
          }

         .pending-card {
  background: linear-gradient(135deg, #fce4ec, #f8bbd0); /* soft pink tones */
  border-left: 5px solid #ec407a; /* accent pink */
 box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}


         .accepted-card {
  background: linear-gradient(135deg, #e6f4ea, #d0f0dd); /* soft mint gradient */
  border-left: 5px solid #34a853; /* Google-style green */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}


         .cancelled-card {
  background: linear-gradient(135deg, #fdecea, #f9d3cd); /* soft muted red */
  border-left: 5px solid #e57373; /* medium red accent */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}


          .summary-icon {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 2rem;
            font-size: 1.6rem;
            flex-shrink: 0;
          }

          .pending-icon {
            background: var(--accent-pink);
            color: var(--white);
          }

          .accepted-icon {
            background: var(--success-medium);
            color: var(--white);
          }

          .cancelled-icon {
            background: var(--error-medium);
            color: var(--white);
          }

          .summary-content {
            flex: 1;
            padding: 0.5rem 0;
          }

          .summary-title {
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 1.1rem;
            color: var(--text-secondary);
            margin-bottom: 0.75rem;
            line-height: 1.3;
          }

          .summary-count {
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            font-size: 2.8rem;
            color: var(--text-primary);
            line-height: 1;
          }

          /* Recent Orders Section */
          .recent-orders-section {
            margin-bottom: 3rem;
            padding: 0 1rem;
           
          }

          .section-title {
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            font-size: 1.9rem;
            color: var(--text-primary);
            margin-bottom: 2.5rem;
            padding: 0 0.5rem;
          }

          .orders-card {
            border: none;
            border-radius: 20px;
            background: var(--white);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
          }

          .orders-card .card-body {
            padding: 3rem 2.5rem !important;
          }

          /* Orders Header */
          .orders-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 3rem;
            flex-wrap: wrap;
            gap: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-light);
          }

          .orders-table-title {
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 1.4rem;
            color: var(--text-primary);
            margin: 0;
          }

          /* Filter Buttons */
          .filter-buttons {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
          }

          .filter-btn {
            border-radius: 25px !important;
            padding: 0.7rem 1.5rem !important;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 0.9rem;
            border: 2px solid var(--border-light) !important;
            color: var(--text-secondary) !important;
            background: transparent !important;
            transition: all 0.3s ease;
            min-width: 80px;
          }

          .filter-btn:hover {
            background: var(--soft-pink) !important;
            border-color: var(--medium-pink) !important;
            color: var(--accent-pink) !important;
            transform: translateY(-1px);
          }

          .filter-btn.active {
            background: linear-gradient(135deg, var(--blush-pink), var(--dusty-rose)) !important;
            border-color: var(--accent-pink) !important;
            color: var(--white) !important;
          }

          .filter-btn.active:hover {
            background: linear-gradient(135deg, var(--medium-pink), var(--accent-pink)) !important;
            color: var(--white) !important;
          }

          /* Orders Table */
          .orders-table {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .order-row {
            display: flex;
            align-items: center;
            padding: 2rem 1rem;
            background: var(--white);
            border-radius: 18px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            border: 1px solid var(--border-light);
            margin-bottom: 0.5rem;
          }

          .order-row:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px var(--shadow-medium);
            border-color: var(--medium-pink);
          }

          /* Customer Info */
          .order-customer {
            display: flex;
            align-items: center;
            flex: 0 0 220px;
            margin-right: 2.5rem;
            padding-right: 1rem;
        
          }

          .customer-avatar {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--blush-pink), var(--dusty-rose));
            color: var(--white);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            font-size: 1.3rem;
            margin-right: 1.2rem;
            flex-shrink: 0;
          }

          .customer-info {
            flex: 1;
            min-width: 0;
          }

          .customer-name {
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 1.05rem;
            color: var(--text-primary);
            margin-bottom: 0.4rem;
            line-height: 1.3;
          }

          .order-time {
            font-family: 'Poppins', sans-serif;
            font-size: 0.9rem;
            color: var(--text-muted);
            line-height: 1.2;
          }

          /* Order Details */
          .order-details {
            flex: 1;
            margin-right: 2.5rem;
            padding: 0 1rem;
            min-width: 0;
          }

          .order-items {
            display: flex;
            flex-direction: column;
          }

          .items-label {
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 0.95rem;
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
          }

          .items-text {
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            color: var(--text-primary);
            line-height: 1.5;
            word-wrap: break-word;
          }

          /* Order Total */
          .order-total {
            flex: 0 0 140px;
            margin-right: 2.5rem;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding: 0 1rem;
          }

          .total-label {
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 0.95rem;
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
          }

          .total-amount {
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            font-size: 1.3rem;
            color: var(--accent-pink);
            line-height: 1.2;
          }

          /* Order Actions */
          .order-actions {
            flex: 0 0 220px;
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            padding-left: 1rem;
          }

          .action-btn {
            border-radius: 25px !important;
            padding: 0.7rem 1.5rem !important;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            border: none !important;
            min-width: 85px;
          }

          .accept-btn {
            background: linear-gradient(135deg, var(--blush-pink), var(--dusty-rose)) !important;
            color: var(--white) !important;
            box-shadow: 0 4px 15px var(--shadow-light);
          }

          .accept-btn:hover {
            background: linear-gradient(135deg, var(--medium-pink), var(--accent-pink)) !important;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px var(--shadow-medium);
            color: var(--white) !important;
          }

          .cancel-btn {
            border: 2px solid var(--border-light) !important;
            color: var(--text-secondary) !important;
            background: transparent !important;
          }

          .cancel-btn:hover {
            background: var(--error-light) !important;
            border-color: var(--error-medium) !important;
            color: var(--error-medium) !important;
            transform: translateY(-2px);
          }

          /* Status Badges */
          .status-badge {
            padding: 0.7rem 1.2rem;
            border-radius: 20px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 0.85rem;
            min-width: 100px;
            text-align: center;
          }

          .accepted-badge {
            background: var(--success-light);
            color: var(--success-medium);
          }

          .cancelled-badge {
            background: var(--error-light);
            color: var(--error-medium);
          }

          /* No Orders */
          .no-orders {
            text-align: center;
            padding: 4rem 2rem;
            color: var(--text-muted);
          }

          .no-orders p {
            font-family: 'Poppins', sans-serif;
            font-size: 1.2rem;
            margin: 0;
            line-height: 1.5;
          }

          /* Responsive Design */
          @media (max-width: 1200px) {
            .order-row {
              flex-wrap: wrap;
              gap: 1.5rem;
              padding: 1.8rem 1.3rem;
            }
            
            .order-customer {
              flex: 0 0 auto;
              margin-right: 0;
              padding-right: 0;
            }
            
            .order-details {
              flex: 1;
              margin-right: 0;
              min-width: 250px;
              padding: 0;
            }
            
            .order-total {
              flex: 0 0 auto;
              margin-right: 0;
              align-items: flex-start;
              padding: 0;
            }
            
            .order-actions {
              flex: 0 0 auto;
              width: 100%;
              justify-content: flex-start;
              padding-left: 0;
              margin-top: 0.5rem;
            }
          }

          @media (max-width: 768px) {
            .vendor-dashboard {
              padding: 2rem 0 3rem 0;
            }
            
            .dashboard-header {
              margin-bottom: 3rem;
              padding: 0 0.5rem;
            }
            
            .dashboard-title {
              font-size: 2.2rem;
              padding: 0;
            }
            
            .summary-cards {
              margin-bottom: 3rem;
              padding: 0 0.5rem;
            }
            
            .recent-orders-section {
              padding: 0 0.5rem;
            }
            
            .section-title {
              padding: 0;
            }
            
            .orders-card .card-body {
              padding: 2rem 1.5rem !important;
            }
            
            .orders-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 1.5rem;
              margin-bottom: 2.5rem;
            }
            
            .filter-buttons {
              width: 100%;
              justify-content: flex-start;
            }
            
            .order-row {
              flex-direction: column;
              align-items: flex-start;
              padding: 1.5rem;
              gap: 1.2rem;
            }
            
            .order-customer {
              width: 100%;
              margin-bottom: 0.5rem;
            }
            
            .order-details {
              width: 100%;
              margin-bottom: 0.5rem;
            }
            
            .order-total {
              width: 100%;
              align-items: flex-start;
              margin-bottom: 0.5rem;
            }
            
            .order-actions {
              width: 100%;
              margin-top: 0;
            }
          }

          @media (max-width: 576px) {
            .vendor-dashboard {
              padding: 1.5rem 0 2.5rem 0;
            }
            
            .dashboard-header {
              margin-bottom: 2.5rem;
            }
            
            .dashboard-title {
              font-size: 1.9rem;
            }
            
            .summary-cards {
              margin-bottom: 2.5rem;
            }
            
            .summary-card .card-body {
              padding: 2rem 1.5rem !important;
            }
            
            .summary-icon {
              width: 55px;
              height: 55px;
              font-size: 1.4rem;
              margin-right: 1.5rem;
            }
            
            .summary-count {
              font-size: 2.3rem;
            }
            
            .orders-card .card-body {
              padding: 1.5rem 1rem !important;
            }
            
            .orders-table {
              gap: 1.5rem;
            }
            
            .order-row {
              padding: 1.2rem;
            }
            
            .filter-btn {
              padding: 0.6rem 1.2rem !important;
              font-size: 0.85rem;
            }
            
            .action-btn {
              padding: 0.6rem 1.2rem !important;
              font-size: 0.85rem;
              min-width: 75px;
            }
            
            .customer-avatar {
              width: 50px;
              height: 50px;
              font-size: 1.1rem;
            }
          }

          /* Focus States for Accessibility */
          .filter-btn:focus,
          .action-btn:focus {
            outline: 3px solid var(--accent-pink);
            outline-offset: 2px;
          }
        `}
      </style>

      <div className="vendor-dashboard">
        <Container fluid className="px-4">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
          </div>

          {/* Summary Cards */}
          <Row className="summary-cards mb-5">
            <Col lg={4} md={6} className="mb-4">
              <Card className="summary-card pending-card">
                <Card.Body className="d-flex align-items-center">
                  <div className="summary-icon pending-icon">
                    <i className="icon-clock">🕒</i>
                  </div>
                  <div className="summary-content">
                    <h3 className="summary-title">Pending Orders</h3>
                    <div className="summary-count">{orderCounts.pending}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={6} className="mb-4">
              <Card className="summary-card accepted-card">
                <Card.Body className="d-flex align-items-center">
                  <div className="summary-icon accepted-icon">
                    <i className="icon-check">✓</i>
                  </div>
                  <div className="summary-content">
                    <h3 className="summary-title">Accepted Orders</h3>
                    <div className="summary-count">{orderCounts.accepted}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4} md={6} className="mb-4">
              <Card className="summary-card cancelled-card">
                <Card.Body className="d-flex align-items-center">
                  <div className="summary-icon cancelled-icon">
                    <i className="icon-close">✕</i>
                  </div>
                  <div className="summary-content">
                    <h3 className="summary-title">Cancelled Orders</h3>
                    <div className="summary-count">{orderCounts.cancelled}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Orders Section */}
          <div className="recent-orders-section">
            <h2 className="section-title">Recent Orders</h2>

            <Card className="orders-card">
              <Card.Body>
                <div className="orders-header">
                  <h3 className="orders-table-title">Order Details</h3>

                  {/* Filter Buttons */}
                  <div className="filter-buttons">
                    {filterButtons.map((filter) => (
                      <Button
                        key={filter}
                        variant={
                          activeFilter === filter
                            ? "primary"
                            : "outline-secondary"
                        }
                        className={`filter-btn ${
                          activeFilter === filter ? "active" : ""
                        }`}
                        onClick={() => setActiveFilter(filter)}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Orders Table */}
                <div className="orders-table">
                  {filteredOrders.length === 0 ? (
                    <div className="no-orders">
                      <p>No orders found for the selected filter.</p>
                    </div>
                  ) : (
                    filteredOrders.map((order) => (
                      <div key={order.id} className="order-row">
                        <div className="order-customer">
                          <div className="customer-avatar">
                            {order.customerInitials}
                          </div>
                          <div className="customer-info">
                            <div className="customer-name" style={{fontSize : "1rem",width:"200px"}}>
                              {order.customerName}
                            </div>
                            <div className="order-time">{order.orderTime}</div>
                          </div>
                        </div>

                        <div className="order-details">
                          <div className="order-items">
                            <span className="items-label">Items</span>
                            <span className="items-text">{order.items}</span>
                          </div>
                        </div>

                        <div className="order-total">
                          <span className="total-label">Total</span>
                          <span className="total-amount">
                            Tk. {order.total.toFixed(2)}
                          </span>
                        </div>

                        <div className="order-actions">
                          {order.status === "pending" && (
                            <>
                              <Button
                                className="action-btn accept-btn"
                                onClick={() => handleAcceptOrder(order.id)}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outline-secondary"
                                className="action-btn cancel-btn"
                                onClick={() => handleCancelOrder(order.id)}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {order.status === "accepted" && (
                            <Badge className="status-badge accepted-badge">
                              Accepted
                            </Badge>
                          )}
                          {order.status === "cancelled" && (
                            <Badge className="status-badge cancelled-badge">
                              Cancelled
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
};

export default VendorHome;
