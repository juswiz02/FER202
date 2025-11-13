import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light p-3 mt-auto border-top">
      <Container fluid>
        <Row>
          <Col className="text-muted text-start">
            © 2025 PersonalBudget Demo
          </Col>
          <Col className="text-muted text-end">
            Built with React, Redux Toolkit & JSON Server
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;