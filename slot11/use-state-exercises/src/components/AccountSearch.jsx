import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const accounts = [
  { id: 1, username: 'john_doe', password: 'password123', avatar: '👨' },
  { id: 2, username: 'jane_smith', password: 'mypassword', avatar: '👩' },
  { id: 3, username: 'admin', password: 'admin123', avatar: '👤' },
  { id: 4, username: 'user123', password: 'userpass', avatar: '🧑' },
  { id: 5, username: 'test_user', password: 'test123', avatar: '👨‍💻' },
];

function AccountSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc accounts dựa trên username
  const filteredAccounts = accounts.filter(account =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Tìm kiếm Account</h3>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nhập username để tìm kiếm..."
                />
              </div>
              
              <Row>
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map(account => (
                    <Col md={6} key={account.id} className="mb-3">
                      <Card className="h-100">
                        <Card.Body className="text-center">
                          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            {account.avatar}
                          </div>
                          <Card.Title>{account.username}</Card.Title>
                          <Card.Text>
                            <small className="text-muted">ID: {account.id}</small>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col md={12}>
                    <div className="text-center py-4">
                      <p className="text-muted">Không tìm thấy kết quả</p>
                    </div>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountSearch;
