import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import movieApi from '../api/movieAPI';

const MovieForm = ({ onMovieAdded }) => {
  const [movieData, setMovieData] = useState({
    title: '',
    year: '',
    nation: '',
    genre: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await movieApi.post('/movies', movieData);
      onMovieAdded();
      setMovieData({
        title: '',
        year: '',
        nation: '',
        genre: '',
      });
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={movieData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nation</Form.Label>
          <Form.Control
            type="text"
            name="nation"
            value={movieData.nation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Movie
        </Button>
      </Form>
    </div>
  );
};

export default MovieForm;