import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';

const mockAccounts = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: '123456', role: 'admin', status: 'active' },
  { id: 2, username: 'user1', email: 'user1@example.com', password: '123456', role: 'user', status: 'active' },
  { id: 3, username: 'user2', email: 'user2@example.com', password: '123456', role: 'user', status: 'locked' }
];

const initialState = {
  user: { username: '', password: '' },
  errors: {},
  showModal: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        user: { ...state.user, [action.field]: action.value }
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message }
      };
    case 'CLEAR_ERRORS':
      {
        const { [action.field]: _removed, ...rest } = state.errors;
        return { ...state, errors: rest };
      }
    case 'SET_SHOW_MODAL':
      return { ...state, showModal: true };
    case 'CLOSE_MODAL':
      return { ...state, showModal: false, user: { username: '', password: '' }, errors: {} };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
    if (value.trim() === '') {
      dispatch({ type: 'SET_ERRORS', field: name, message: `${name.charAt(0).toUpperCase() + name.slice(1)} is required` });
    } else {
      dispatch({ type: 'CLEAR_ERRORS', field: name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (state.user.username.trim() === '') newErrors.username = 'Username is required';
    if (state.user.password.trim() === '') newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      for (const field in newErrors) {
        dispatch({ type: 'SET_ERRORS', field, message: newErrors[field] });
      }
      return;
    }

    const found = mockAccounts.find((a) => a.username === state.user.username && a.password === state.user.password);
    if (!found) {
      dispatch({ type: 'SET_ERRORS', field: 'username', message: 'Invalid credentials' });
      return;
    }
    if (found.role !== 'admin') {
      dispatch({ type: 'SET_ERRORS', field: 'username', message: 'Only admin is allowed to login in this exercise' });
      return;
    }
    if (found.status !== 'active') {
      dispatch({ type: 'SET_ERRORS', field: 'username', message: 'Account is not active' });
      return;
    }

    // success -> show modal
    dispatch({ type: 'SET_SHOW_MODAL' });
  };

  const handleCloseModal = () => dispatch({ type: 'CLOSE_MODAL' });

  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login Form with useReducer</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={state.user.username}
                    onChange={handleChange}
                    isInvalid={!!state.errors.username}
                  />
                  <Form.Control.Feedback type="invalid">{state.errors.username}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={state.user.password}
                    onChange={handleChange}
                    isInvalid={!!state.errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">{state.errors.password}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" className="flex-fill">Login</Button>
                  <Button variant="secondary" type="button" className="flex-fill" onClick={() => dispatch({ type: 'RESET_FORM' })}>Cancel</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={state.showModal}
        title="Login Successful"
        message={`Welcome, ${state.user.username}! You have successfully logged in!`}
        onConfirm={handleCloseModal}
        onHide={handleCloseModal}
      />
    </Container>
  );
}

export default LoginForm;
