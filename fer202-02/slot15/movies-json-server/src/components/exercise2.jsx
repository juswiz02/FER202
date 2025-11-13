import React, { useState } from 'react';

const Exercise2 = () => {
    // State for movie list and form
    const [movies, setMovies] = useState([
        { title: "The Shawshank Redemption", year: 1994, nation: "USA" },
        { title: "The Godfather", year: 1972, nation: "USA" },
        { title: "The Dark Knight", year: 2008, nation: "USA" },
        { title: "Parasite", year: 2019, nation: "South Korea" }
    ]);

    const [formData, setFormData] = useState({
        title: "",
        year: "",
        nation: ""
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.title || !formData.year || !formData.nation) {
            alert("Please fill in all fields");
            return;
        }
        // Add new movie
        setMovies(prevMovies => [...prevMovies, { ...formData }]);
        // Reset form
        setFormData({ title: "", year: "", nation: "" });
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px', borderRadius: '8px' }}>
            <h2>Exercise 2: Movie List and Form</h2>

            {/* Movie Form */}
            <div style={{ marginBottom: '30px' }}>
                <h3>Add New Movie</h3>
                <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Year:</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Nation:</label>
                        <input
                            type="text"
                            name="nation"
                            value={formData.nation}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Add Movie
                    </button>
                </form>
            </div>

            {/* Movie List */}
            <div>
                <h3>Movie List</h3>
                <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
                    {movies.map((movie, index) => (
                        <div 
                            key={index} 
                            style={{
                                padding: '15px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            <h4 style={{ margin: '0 0 10px 0' }}>{movie.title}</h4>
                            <p style={{ margin: '5px 0' }}>Year: {movie.year}</p>
                            <p style={{ margin: '5px 0' }}>Nation: {movie.nation}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Exercise2;