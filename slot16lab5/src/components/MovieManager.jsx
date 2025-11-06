import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MovieForm from './MovieForm';
import MovieTable from './MovieTable';

const MovieManager = () => {
    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">🎬 Quản lý Phim</h1>
            <Row>
                <Col md={4}>
                    <h3>Add/Edit Movie</h3>
                    <MovieForm />
                </Col>
                <Col md={8}>
                    <h2 className="mt-4">Danh sách Phim</h2>
                    <MovieTable />
                </Col>
            </Row>
        </Container>
    );
};

export default MovieManager;
