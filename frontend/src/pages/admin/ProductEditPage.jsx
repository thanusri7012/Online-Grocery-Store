import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/axiosConfig';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await apiClient.get(`/products/${productId}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product', error);
      }
    };
    fetchProduct();
  }, [productId]);
  
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await apiClient.post('/upload', formData, config);
        setImage(data.image);
    } catch (error) {
        console.error('Image upload failed', error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await apiClient.put(`/products/${productId}`, {
        name, price, image, brand, category, countInStock, description
      }, config);
      navigate('/admin/productlist');
    } catch (error) {
      console.error('Failed to update product', error);
    }
  };

  return (
    <Container className="mt-4">
      <Link to="/admin/productlist" className="btn btn-light my-3">Go Back</Link>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Edit Product</h1>
          {loading ? (<p>Loading...</p>) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-2"><Form.Label>Name</Form.Label><Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}></Form.Control></Form.Group>
              <Form.Group controlId="price" className="my-2"><Form.Label>Price</Form.Label><Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control></Form.Group>
              
              <Form.Group controlId="image" className="my-2"><Form.Label>Image</Form.Label><Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
              <Form.Control type="file" label="Choose file" onChange={uploadFileHandler} />
              </Form.Group>

              <Form.Group controlId="brand" className="my-2"><Form.Label>Brand</Form.Label><Form.Control type="text" value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control></Form.Group>
              <Form.Group controlId="countInStock" className="my-2"><Form.Label>Count In Stock</Form.Label><Form.Control type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control></Form.Group>
              <Form.Group controlId="category" className="my-2"><Form.Label>Category</Form.Label><Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control></Form.Group>
              <Form.Group controlId="description" className="my-2"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control></Form.Group>
              
              <Button type="submit" variant="primary" className="btn-custom mt-3">Update</Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductEditPage;