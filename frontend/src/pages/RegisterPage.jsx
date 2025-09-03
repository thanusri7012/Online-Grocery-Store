import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Add a class to the body to prevent scrolling
  useEffect(() => {
    document.body.classList.add('auth-page');
    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('auth-page');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await apiClient.post('/auth/register', { name, email, password });
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="split-screen-container">
      <div className="left-panel">
        <div className="left-panel-overlay">
          <h1>Start Your Journey</h1>
          <p>Create an account to get the best of fresh, organic groceries delivered to you.</p>
        </div>
      </div>

      <div className="right-panel">
        <div className="form-container">
          <h2 className="text-center mb-4">Create an Account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-group" controlId="name">
              <Form.Label className="form-label">Full Name</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="email">
              <Form.Label className="form-label">Email Address</Form.Label>
              <Form.Control
                className="form-control"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="password">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-custom mt-3">
              Sign Up
            </Button>
            
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;