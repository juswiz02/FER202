import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

function MotorbikeList() {
  const [motorbikes, setMotorbikes] = useState([]);
  const [search, setSearch] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const { dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMotorbikes();
  }, []);

  const fetchMotorbikes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/motorbikes');
      setMotorbikes(response.data);
    } catch (error) {
      console.error('Error fetching motorbikes:', error);
    }
  };

  const handleAddToCart = async (motorbike) => {
    try {
      // Update stock in the server
      await axios.patch(`http://localhost:3000/motorbikes/${motorbike.id}`, {
        stock: motorbike.stock - 1
      });

      // Add to cart
      dispatch({ type: 'ADD_TO_CART', payload: motorbike });
      
      // Refresh motorbikes list
      fetchMotorbikes();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const filteredAndSortedMotorbikes = [...motorbikes]
    .filter(bike => 
      bike.model.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortPrice === 'low-to-high') return a.price - b.price;
      if (sortPrice === 'high-to-low') return b.price - a.price;
      return 0;
    });

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-3 flex-grow-1">
          <Form.Control
            type="text"
            placeholder="Search by model"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Form.Select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </Form.Select>
        </div>
        <Button variant="primary" onClick={() => navigate('/cart')}>
          View Cart
        </Button>
      </div>

      <Row xs={1} md={2} lg={4} className="g-4">
        {filteredAndSortedMotorbikes.map(motorbike => (
          <Col key={motorbike.id}>
            <Card>
              <Card.Img variant="top" src={motorbike.image} />
              <Card.Body>
                <Card.Title>{motorbike.brand} {motorbike.model}</Card.Title>
                <Card.Text>
                  Year: {motorbike.year}<br />
                  Price: ${motorbike.price}<br />
                  Stock: {motorbike.stock}
                </Card.Text>
                <div className="d-flex gap-2">
                  <Link to={`/view/${motorbike.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                  <Button 
                    variant="success" 
                    onClick={() => handleAddToCart(motorbike)}
                    disabled={motorbike.stock <= 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MotorbikeList;