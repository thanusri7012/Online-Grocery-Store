import React, { useState, useEffect } from 'react';
// Corrected import statement on the line below
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
} from 'react-bootstrap';
import apiClient from '../api/axiosConfig';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await apiClient.get(`/products/${productId}`);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const addToCartHandler = () => {
    addToCart(product, qty);
  };

  return (
    <Container className="mt-4">
      <Link className="btn btn-light my-3" to="/products">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid rounded />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Brand:</strong> {product.brand}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Category:</strong> {product.category}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row className="align-items-center">
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="w-100 btn-custom"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailPage;