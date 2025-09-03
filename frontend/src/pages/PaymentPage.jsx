import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { paymentMethod, savePaymentMethod } = useCart();

  // Default to 'PayPal' if no payment method is selected
  const [method, setMethod] = useState(paymentMethod || 'PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(method);
    navigate('/placeorder');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked={method === 'PayPal'}
                  onChange={(e) => setMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3 btn-custom">
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;