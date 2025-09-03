// Create this file: frontend/src/pages/OrderPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/axiosConfig';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await apiClient.get(`/orders/${orderId}`, config);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (userInfo) {
      fetchOrder();
    }
  }, [orderId, userInfo]);

  return loading ? (
    <p>Loading...</p>
  ) : order ? (
    <Container className="mt-4">
      <h1>Order {order._id}</h1>
      {/* Add layout here to display order details, similar to PlaceOrderPage */}
    </Container>
  ) : (
    <p>Order not found.</p>
  );
};

export default OrderPage;