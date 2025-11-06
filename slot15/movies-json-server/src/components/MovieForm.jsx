import React from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { initialMovieState } from '../reducers/movieReducers';

const genreOptions = [
    { id: 1, name: "Sci-Fi" },
    { id: 2, name: "Comedy" },
    { id: 3, name: "Drama" },
    { id: 4, name: "Horror" },
    { id: 5, name: "Romance" },
    { id: 6, name: "Action" },
    { id: 7, name: "Thriller" }
];

// Component con tái sử dụng cho các trường input
const MovieFields = ({ currentMovie, handleInputChange, handleFileChange }) => (
    <>
        <Row className="mb-3">
            <Col md={12}>
                <Form.Group controlId="formAvatar">
                    <Form.Label>Ảnh Avatar Phim</Form.Label>
                    <Form.Control 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mb-2"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Hoặc nhập URL hình ảnh"
                        name="poster"
                        value={currentMovie.poster || ''}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            </Col>
        </Row>

        <Row className="mb-3">
            <Col md={12}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Tên Phim</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={currentMovie.title || ''}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
            </Col>
        </Row>

        <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="formGenre">
                    <Form.Label>Danh mục</Form.Label>
                    <Form.Select
                        name="genreId"
                        value={currentMovie.genreId || ''}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Chọn danh mục</option>
                        {genreOptions.map(genre => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group controlId="formDuration">
                    <Form.Label>Thời lượng (phút)</Form.Label>
                    <Form.Control
                        type="number"
                        name="duration"
                        value={currentMovie.duration || ''}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group controlId="formYear">
                    <Form.Label>Năm</Form.Label>
                    <Form.Control
                        type="number"
                        name="year"
                        value={currentMovie.year || ''}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
            </Col>
        </Row>
    </>
);

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal } = state;

  const handleInputChange = (e) => {
    const value = e.target.type === 'number' ? 
      parseInt(e.target.value) || '' : 
      e.target.value;
      
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { name: e.target.name, value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateOrUpdate(currentMovie, isEditing !== null, isEditing);
  };

  const handleCloseEditModal = () => {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
  };

  // Logic cho Form Thêm mới (khi isEditing là null)
  const isCreating = isEditing === null;
  const createFormProps = {
    currentMovie: isCreating ? initialMovieState.currentMovie : currentMovie,
    handleInputChange: isCreating ? handleInputChange : () => {}
  };

  return (
    <>
      {/* FORM THÊM MỚI */}
      <Container className="p-3 mb-4 border rounded">
        <h3 className="mb-3">Thêm Phim Mới</h3>
        <Form onSubmit={handleSubmit}>
            <MovieFields 
                currentMovie={currentMovie} 
                handleInputChange={handleInputChange}
            />
            <div className="d-flex gap-2 mt-3">
                <Button variant="success" type="submit">
                    Thêm Phim
                </Button>
            </div>
        </Form>
      </Container>
      
      {/* MODAL CHỈNH SỬA */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa Phim ID: {isEditing}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <MovieFields 
                    currentMovie={currentMovie}
                    handleInputChange={handleInputChange}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditModal}>
                    Hủy
                </Button>
                <Button variant="warning" type="submit">
                    Lưu Thay Đổi
                </Button>
            </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;