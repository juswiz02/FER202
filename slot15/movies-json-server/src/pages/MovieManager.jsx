import React from 'react';
import { Container } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';

// Component con hiển thị nội dung, được bọc bởi Provider
const MovieManagerContent = () => {
    return (
        <Container>
            <h1 className="mt-4 mb-4">🎬 Quản lý Phim (Context + useReducer + Axios)</h1>
            <div>
                <h3 className="mb-3">👾 Thêm Phim Mới</h3>
                <MovieForm />
            </div>
            <MovieTable />
        </Container>
    );
}

// Component chính cung cấp Context
const MovieManager = () => (
    <MovieProvider>
        <MovieManagerContent />
    </MovieProvider>
);

export default MovieManager;