import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/axiosConfig';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  // Get clearCart function from the context
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useCart();
  const { userInfo } = useAuth();

  // --- Price Calculations ---
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Example shipping logic
  const taxPrice = 0.15 * itemsPrice; // Example 15% tax logic
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await apiClient.post(
        '/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          totalPrice: totalPrice.toFixed(2),
        },
        config
      );

      clearCart(); // Clear the cart from state and localStorage
      navigate(`/order/${data._id}`); // Redirect to the new order details page
    } catch (error) {
      console.error('Failed to place order:', error);
      alert(
        `Error placing order: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="align-items-center">
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total</strong>
                  </Col>
                  <Col>
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100 btn-custom"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderPage;