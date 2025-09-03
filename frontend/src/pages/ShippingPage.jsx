import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ShippingPage = () => {
  const { shippingAddress, saveShippingAddress } = useCart();
  const navigate = useNavigate();

  // Initialize state from cart context or with empty strings
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment');
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <div className="form-container">
            <h1 className="text-center mb-4">Shipping Address</h1>
            <Form onSubmit={submitHandler}>
              {/* Address Field */}
              <Form.Group controlId="address" className="form-group">
                <Form.Label className="form-label">Address</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* City Field */}
              <Form.Group controlId="city" className="form-group">
                <Form.Label className="form-label">City</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* Postal Code Field */}
              <Form.Group controlId="postalCode" className="form-group">
                <Form.Label className="form-label">Postal Code</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder="Enter postal code"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* Country Field */}
              <Form.Group controlId="country" className="form-group">
                <Form.Label className="form-label">Country</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder="Enter country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" className="w-100 btn-custom mt-3">
                Continue to Payment
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingPage;