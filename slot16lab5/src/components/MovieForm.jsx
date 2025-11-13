import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieForm = () => {
    const { editingMovie, loading, error } = useMovieState();
    const { createMovie, editMovie, clearEditingMovie } = useMovieDispatch();

    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        year: ''
    });

    // Populate form when editing
    useEffect(() => {
        if (editingMovie) {
            setFormData({
                title: editingMovie.title,
                genre: editingMovie.genre,
                year: editingMovie.year
            });
        } else {
            setFormData({
                title: '',
                genre: '',
                year: ''
            });
        }
    }, [editingMovie]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.genre || !formData.year) {
            alert('Please fill in all fields');
            return;
        }

        try {
            if (editingMovie) {
                await editMovie(editingMovie.id, formData);
            } else {
                await createMovie(formData);
            }

            // Reset form
            setFormData({
                title: '',
                genre: '',
                year: ''
            });
        } catch (error) {
            console.error('Error saving movie:', error);
        }
    };

    const handleCancel = () => {
        clearEditingMovie();
        setFormData({
            title: '',
            genre: '',
            year: ''
        });
    };

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Enter movie title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                        type="text"
                        name="genre"
                        placeholder="Enter genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type="number"
                        name="year"
                        placeholder="Enter year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Saving...' : editingMovie ? 'Update Movie' : 'Add Movie'}
                </Button>

                {editingMovie && (
                    <Button variant="secondary" className="ms-2" onClick={handleCancel}>
                        Cancel
                    </Button>
                )}
            </Form>
        </>
    );
};

export default MovieForm;
