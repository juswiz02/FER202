import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast } from 'react-bootstrap';

function RegistrationForm() {
  // State là một object gồm username, email, password, confirmPassword
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Validation functions
  const validateUsername = (username) => {
    if (username.trim().length < 3) {
      return 'Username phải có ít nhất 3 ký tự';
    }
    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
      return 'Username chỉ được chứa chữ, số, _ hoặc .';
    }
    if (username !== username.trim()) {
      return 'Username không được có khoảng trắng đầu/cuối';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email không đúng định dạng';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password phải có ít nhất 8 ký tự';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password phải có chữ thường';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password phải có chữ hoa';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password phải có chữ số';
    }
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
      return 'Password phải có ký tự đặc biệt';
    }
    return '';
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return 'Confirm password không khớp';
    }
    return '';
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate real-time
    let error = '';
    switch (name) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(formData.password, value);
        break;
      default:
        break;
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  // Kiểm tra form có hợp lệ không
  const isFormValid = () => {
    return (
      formData.username.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      Object.keys(errors).length === 0 &&
      validateUsername(formData.username) === '' &&
      validateEmail(formData.email) === '' &&
      validatePassword(formData.password) === '' &&
      validateConfirmPassword(formData.password, formData.confirmPassword) === ''
    );
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate tất cả fields
    const newErrors = {};
    newErrors.username = validateUsername(formData.username);
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    newErrors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);

    // Loại bỏ các error rỗng
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key] === '') {
        delete newErrors[key];
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  // Reset form
  const handleCancel = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  // Đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    handleCancel();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Form Đăng Ký Tài Khoản</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Nhập username (≥3 ký tự, chỉ chữ, số, _, .)"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Nhập email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Nhập password (≥8 ký tự, có hoa, thường, số, ký tự đặc biệt)"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                    placeholder="Nhập lại password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="flex-fill"
                    disabled={!isFormValid()}
                  >
                    Submit
                  </Button>
                  <Button 
                    variant="secondary" 
                    type="button" 
                    className="flex-fill"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast thông báo */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1050,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal hiển thị thông tin đã submit */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <h5>Thông tin tài khoản:</h5>
              <p><strong>Username:</strong> {formData.username}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Password:</strong> {'*'.repeat(formData.password.length)}</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegistrationForm;
