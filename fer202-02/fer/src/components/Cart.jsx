import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

function Cart() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const handleUpdateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      // Get current motorbike data
      const response = await axios.get(`http://localhost:3000/motorbikes/${item.id}`);
      const motorbike = response.data;

      // Calculate stock difference
      const stockDifference = item.quantity - newQuantity;
      const newStock = motorbike.stock + stockDifference;

      // Update stock in server
      await axios.patch(`http://localhost:3000/motorbikes/${item.id}`, {
        stock: newStock
      });

      // Update cart
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: item.id, quantity: newQuantity }
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemove = async (item) => {
    try {
      // Get current motorbike data
      const response = await axios.get(`http://localhost:3000/motorbikes/${item.id}`);
      const motorbike = response.data;

      // Restore stock
      await axios.patch(`http://localhost:3000/motorbikes/${item.id}`, {
        stock: motorbike.stock + item.quantity
      });

      // Remove from cart
      dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container className="my-4">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <div>
          <p>Your cart is empty</p>
          <Button onClick={() => navigate('/motorbikes')}>
            Back to Motorbikes
          </Button>
        </div>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Model</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item.id}>
                  <td>{item.brand} {item.model}</td>
                  <td>${item.price}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                <td colSpan="2"><strong>${total}</strong></td>
              </tr>
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => navigate('/motorbikes')}>
              Continue Shopping
            </Button>
            <Button variant="success">
              Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;