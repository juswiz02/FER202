import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/users');
      const user = response.data.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        setShowModal(true);
        setUser(user);
        setTimeout(() => {
          navigate('/motorbikes');
        }, 1500);
      } else {
        setError('Invalid username or password!');
      }
    } catch (err) {
      setError('Error checking credentials');
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button variant="secondary" type="button" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Welcome</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Welcome, {username} login successful!
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired
};

export default LoginForm;