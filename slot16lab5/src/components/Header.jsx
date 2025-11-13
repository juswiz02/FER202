import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, isAuthenticated } = useAuthState();
  const { logout } = useAuthDispatch();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">🎬 Movie Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {isAuthenticated ? (
              <>
                <Navbar.Text className="me-3">
                  Welcome, {user.fullName} ({user.role})
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
