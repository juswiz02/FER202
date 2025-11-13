import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice'; 
import { authService } from '../services/expenseService';

const LoginPage = () => {
  const [username, setUsername] = useState('anhnv');
  // FIXED: Mật khẩu mặc định là 'admin123'
  const [password, setPassword] = useState('admin123'); 
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation: Kiểm tra trường rỗng
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    // Validation: Kiểm tra mật khẩu tối thiểu 6 ký tự
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Xử lý Đăng nhập
    const loginResult = await authService.login(username, password);

    if (loginResult) {
      dispatch(loginSuccess(loginResult));
      navigate('/home'); 
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '25rem' }} className="p-4 shadow">
        <h2 className="text-center mb-4">Login</h2> 
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* Username Field */}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted">(at least 6 characters)</Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;