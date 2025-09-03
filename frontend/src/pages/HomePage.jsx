import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Add some specific styles for the homepage hero section
const heroStyles = {
  padding: '80px 0',
  textAlign: 'center',
  backgroundColor: '#E8F5E9', // A very light green
  borderRadius: '20px',
  margin: '30px 0',
};

const HomePage = () => {
  const { userInfo } = useAuth();

  return (
    <Container>
      <div style={heroStyles}>
        <Row className="justify-content-md-center">
          <Col lg={8}>
            <h1>Fresh Groceries, Delivered Fast.</h1>
            <p className="lead my-4" style={{ color: '#333' }}>
              Your one-stop shop for fresh produce, pantry staples, and more. Quality you can trust, delivered right to your doorstep.
            </p>
            {userInfo ? (
              <Link to="/products">
                <Button className="btn-custom">Start Shopping</Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button className="btn-custom">Join for Free</Button>
              </Link>
            )}
          </Col>
        </Row>
      </div>
      
      {/* You can add sections for featured products or categories here */}
      <h2 className="mt-5 text-center">Why Shop With Us?</h2>
      {/* Add feature cards below */}

    </Container>
  );
};

export default HomePage;