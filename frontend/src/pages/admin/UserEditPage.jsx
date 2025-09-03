import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/axiosConfig';

const UserEditPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await apiClient.get(`/users/${userId}`, config);
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };
    fetchUser();
  }, [userId, userInfo.token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await apiClient.put(`/users/${userId}`, { name, email, isAdmin }, config);
      navigate('/admin/userlist');
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  return (
    <Container className="mt-4">
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Edit User</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email" className="my-2">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="isadmin" className="my-3">
                <Form.Check
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              <Button type="submit" variant="primary" className="btn-custom">
                Update
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserEditPage;