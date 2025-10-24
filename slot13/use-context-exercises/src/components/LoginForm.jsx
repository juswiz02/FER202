import React, { useReducer } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const mockAccounts = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: '123456', role: 'admin', status: 'active' },
  { id: 2, username: 'user1', email: 'user1@example.com', password: '123456', role: 'user', status: 'active' },
  { id: 3, username: 'user2', email: 'user2@example.com', password: '123456', role: 'user', status: 'locked' }
];

const initialState = { username: '', password: '', error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'field':
      return { ...state, [action.field]: action.value };
    case 'error':
      return { ...state, error: action.error };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, login, logout } = useAuth();

  const validateAndLogin = (e) => {
    e.preventDefault();
    const { username, password } = state;
    if (!username || !password) {
      dispatch({ type: 'error', error: 'Please enter username and password' });
      return;
    }

    const found = mockAccounts.find((a) => a.username === username && a.password === password);
    if (!found) {
      dispatch({ type: 'error', error: 'Invalid credentials' });
      return;
    }
    if (found.role !== 'admin') {
      dispatch({ type: 'error', error: 'Only admin is allowed to login in this exercise' });
      return;
    }
    if (found.status !== 'active') {
      dispatch({ type: 'error', error: 'Account is not active' });
      return;
    }

    login({ id: found.id, username: found.username, role: found.role });
    dispatch({ type: 'reset' });
  };

  return (
    <div style={{ padding: 20, border: '1px solid #ccc', marginTop: 10 }}>
      <h3>Login (mock)</h3>
      {user ? (
        <div>
          <p>Đăng nhập với: <strong>{user.username}</strong> ({user.role})</p>
          <Button variant="danger" onClick={logout}>Logout</Button>
        </div>
      ) : (
        <Form onSubmit={validateAndLogin}>
          <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={state.username} onChange={(e) => dispatch({ type: 'field', field: 'username', value: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={state.password} onChange={(e) => dispatch({ type: 'field', field: 'password', value: e.target.value })} />
          </Form.Group>
          {state.error && <div style={{ color: 'red', marginBottom: 10 }}>{state.error}</div>}
          <Button type="submit" variant="primary">Login</Button>
        </Form>
      )}
    </div>
  );
}

export default LoginForm;
