import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import Paginate from '../components/common/Paginate';
import apiClient from '../api/axiosConfig';

const ProductsPage = () => {
  const { keyword, pageNumber } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await apiClient.get(`/products?keyword=${keyword || ''}&pageNumber=${pageNumber || 1}`);
      setProducts(data.products);
      setPage(data.page);
      setPages(data.pages);
    };

    fetchProducts();
  }, [keyword, pageNumber]);

  return (
    <Container className="mt-4">
      <h1>Fresh Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
      </div>
    </Container>
  );
};

export default ProductsPage;