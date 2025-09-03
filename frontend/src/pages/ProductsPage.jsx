import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ProductCard from '../components/products/ProductCard';
import apiClient from '../api/axiosConfig';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await apiClient.get('/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <h1>Fresh Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsPage;