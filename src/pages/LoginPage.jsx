import React, { useState, useContext } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ConfirmModal from '../components/ConfirmModal';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({});
  const [invalidAlert, setInvalidAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');

  const validate = () => {
    const e = {};
    if (!form.identifier.trim()) e.identifier = 'Username or Email is required.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    // optional: email format check if identifier contains '@'
    if (form.identifier.includes('@')) {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(form.identifier)) e.identifier = 'Email format is invalid.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInvalidAlert(false);
    if (!validate()) return;

    try {
      const res = await api.get('/accounts'); // fetch accounts
      const accounts = res.data;
      const found = accounts.find(acc =>
        (acc.username === form.identifier || acc.email === form.identifier) &&
        acc.password === form.password
      );
      if (!found) {
        setInvalidAlert(true);
        return;
      }
      // login success
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: found, token: 'fake-jwt-token' } });
      setWelcomeName(found.username || found.fullname || found.email);
      setShowModal(true);

      // show modal then redirect (e.g., 1.2s)
      setTimeout(() => {
        setShowModal(false);
        navigate('/home');
      }, 1200);

    } catch (err) {
      console.error(err);
      setInvalidAlert(true);
    }
  };

  return (
    <Container style={{ maxWidth: 700, marginTop: 40 }}>
      <h2 className="text-center mb-4">Login</h2>
      {invalidAlert && <Alert variant="danger">Invalid username/email or password!</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Username or email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username or email"
            value={form.identifier}
            isInvalid={!!errors.identifier}
            onChange={e => setForm({...form, identifier: e.target.value})}
          />
          <Form.Control.Feedback type="invalid">
            {errors.identifier}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={form.password}
            isInvalid={!!errors.password}
            onChange={e => setForm({...form, password: e.target.value})}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col>
            <Button type="submit" variant="primary" className="w-100">Login</Button>
          </Col>
          <Col>
            <Button variant="secondary" className="w-100" onClick={() => { setForm({identifier:'', password:''}); setErrors({}); }}>Cancel</Button>
          </Col>
        </Row>
      </Form>

      <div className="mt-3 text-center">
        <a href="/signup">Don't have an account? Sign up.</a>
      </div>

      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Login successful"
        message={`Welcome, ${welcomeName}! Login successful.`}
      />
    </Container>
  );
};

export default LoginPage;
