import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/axiosConfig';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await apiClient.get('/products');
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchProducts();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await apiClient.delete(`/products/${id}`, config);
        fetchProducts(); // Refetch products after deletion
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await apiClient.post('/products', {}, config);
            // navigate(`/admin/product/${data._id}/edit`); // We will build this page next
             alert('Sample product created!');
             fetchProducts();
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    }
  };

  return (
    <Container className="mt-4">
      <Row className='align-items-center'>
        <Col><h1>Products</h1></Col>
        <Col className='text-end'>
            <Button className='my-3 btn-custom' onClick={createProductHandler}>
                <i className='fas fa-plus'></i> Create Product
            </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant="light" className="btn-sm mx-1"><i className="fas fa-edit"></i></Button>
                </LinkContainer>
                <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}><i className="fas fa-trash"></i></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductListPage;