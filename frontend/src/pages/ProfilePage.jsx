// Create this file: frontend/src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/axiosConfig';

const ProfilePage = () => {
    const [orders, setOrders] = useState([]);
    const { userInfo } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await apiClient.get('/orders/myorders', config);
            setOrders(data);
        };
        fetchOrders();
    }, [userInfo]);

    return (
        <Container>
            <Row>
                <Col md={9}>
                    <h2>My Orders</h2>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? 'Yes' : 'No'}</td>
                                    <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm" variant="light">Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;