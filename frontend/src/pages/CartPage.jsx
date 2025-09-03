import React from 'react';
// 1. Import useNavigate
import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate function
  const { cartItems, addToCart, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  // 3. Create the handler function to navigate
  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <Container className="mt-4">
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <p>
              Your cart is empty. <Link to="/products">Go Shopping</Link>
            </p>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCart(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal ({subtotal}) items</h2>
                ${totalPrice}
              </ListGroup.Item>
              <ListGroup.Item>
                {/* 4. Add the onClick handler to the button */}
                <Button
                  type="button"
                  className="w-100 btn-custom"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;