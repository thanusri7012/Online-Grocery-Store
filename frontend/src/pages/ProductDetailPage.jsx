import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Container, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import apiClient from '../api/axiosConfig';

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errorReview, setErrorReview] = useState('');
  const [successReview, setSuccessReview] = useState(false);

  const fetchProduct = async () => {
    const { data } = await apiClient.get(`/products/${productId}`);
    setProduct(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [productId, successReview]);

  const addToCartHandler = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await apiClient.post(`/products/${productId}/reviews`, { rating, comment }, config);
        setSuccessReview(true);
        setRating(0);
        setComment('');
    } catch (error) {
        setErrorReview(error.response?.data?.message || 'Error submitting review');
    }
  };

  return (
    <Container className="mt-4">
      <Link className="btn btn-light my-3" to="/products">Go Back</Link>
      {loading ? (<p>Loading...</p>) : (
          <>
            <Row>
              <Col md={5}><Image src={product.image} alt={product.name} fluid rounded /></Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                  <ListGroup.Item><p><strong>Rating:</strong> {product.rating} from {product.numReviews} reviews</p></ListGroup.Item>
                  <ListGroup.Item><strong>Price:</strong> ${product.price}</ListGroup.Item>
                  <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item><Row><Col>Price:</Col><Col><strong>${product.price}</strong></Col></Row></ListGroup.Item>
                    <ListGroup.Item><Row><Col>Status:</Col><Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col></Row></ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row><Col>Qty:</Col><Col><Form.Control as="select" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                            {[...Array(product.countInStock).keys()].map((x) => (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                        </Form.Control></Col></Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item><Button onClick={addToCartHandler} className="w-100 btn-custom" type="button" disabled={product.countInStock === 0}>Add To Cart</Button></ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Alert variant='info'>No Reviews</Alert>}
                <ListGroup variant='flush'>
                  {product.reviews.map(review => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <p>Rating: {review.rating}</p>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {userInfo ? (
                      <Form onSubmit={submitReviewHandler}>
                        <Form.Group controlId='rating' className='my-2'><Form.Label>Rating</Form.Label><Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value=''>Select...</option><option value='1'>1 - Poor</option><option value='2'>2 - Fair</option><option value='3'>3 - Good</option><option value='4'>4 - Very Good</option><option value='5'>5 - Excellent</option>
                        </Form.Control></Form.Group>
                        <Form.Group controlId='comment' className='my-2'><Form.Label>Comment</Form.Label><Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control></Form.Group>
                        {errorReview && <Alert variant='danger'>{errorReview}</Alert>}
                        <Button type='submit' variant='primary' className='btn-custom'>Submit</Button>
                      </Form>
                    ) : (
                      <Alert>Please <Link to='/login'>sign in</Link> to write a review</Alert>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
      )}
    </Container>
  );
};

export default ProductDetailPage;