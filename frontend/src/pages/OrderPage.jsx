import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/axiosConfig';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await apiClient.get(`/orders/${orderId}`, config);
      setOrder(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchOrder();
    }
  }, [orderId, userInfo]);

  const deliverHandler = async () => {
    try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await apiClient.put(`/orders/${orderId}/deliver`, {}, config);
        fetchOrder();
    } catch (error) {
        console.error('Failed to mark as delivered', error);
    }
  };

  return loading ? (
    <p>Loading...</p>
  ) : order ? (
    <Container className="mt-4">
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p><strong>Name: </strong> {order.user.name}</p>
                <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
                {order.isDelivered ? 
                    <div className="alert alert-success">Delivered on {order.deliveredAt}</div> : 
                    <div className="alert alert-danger">Not Delivered</div>
                }
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p><strong>Method: </strong>{order.paymentMethod}</p>
                {order.isPaid ? 
                    <div className="alert alert-success">Paid on {order.paidAt}</div> : 
                    <div className="alert alert-danger">Not Paid</div>
                }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                        <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                        <Col md={4}>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item><h2>Order Summary</h2></ListGroup.Item>
              <ListGroup.Item><Row><Col>Items</Col><Col>${order.totalPrice}</Col></Row></ListGroup.Item>
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" className="w-100 btn-custom" onClick={deliverHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <p>Order not found.</p>
  );
};

export default OrderPage;