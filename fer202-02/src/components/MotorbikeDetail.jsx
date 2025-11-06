import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

function MotorbikeDetail() {
  const [motorbike, setMotorbike] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchMotorbike = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/motorbikes/${id}`);
        setMotorbike(response.data);
      } catch (error) {
        setError(true);
      }
    };

    fetchMotorbike();
  }, [id]);

  const handleAddToCart = async () => {
    if (motorbike) {
      try {
        await axios.patch(`http://localhost:3000/motorbikes/${id}`, {
          stock: motorbike.stock - 1
        });
        dispatch({ type: 'ADD_TO_CART', payload: motorbike });
        navigate('/cart');
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  if (error) {
    return (
      <Container className="my-4">
        <h2>404 - Motorbike Not Found</h2>
        <p>The motorbike you're looking for does not exist.</p>
        <Button onClick={() => navigate('/motorbikes')}>Back to List</Button>
      </Container>
    );
  }

  if (!motorbike) return <div>Loading...</div>;

  return (
    <Container className="my-4">
      <Card>
        <Card.Img variant="top" src={motorbike.image} />
        <Card.Body>
          <Card.Title>{motorbike.brand} {motorbike.model}</Card.Title>
          <Card.Text>
            <strong>Year:</strong> {motorbike.year}<br />
            <strong>Price:</strong> ${motorbike.price}<br />
            <strong>Stock:</strong> {motorbike.stock}
          </Card.Text>
          <div className="d-flex gap-2">
            <Button 
              variant="success" 
              onClick={handleAddToCart}
              disabled={motorbike.stock <= 0}
            >
              Add to Cart
            </Button>
            <Button variant="secondary" onClick={() => navigate('/motorbikes')}>
              Back to List
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MotorbikeDetail;