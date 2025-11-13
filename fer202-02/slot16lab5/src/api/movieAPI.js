import movieApi from './api';

export const getMovies = async () => {
  try {
    const response = await movieApi.get('/movies');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};

export const addMovie = async (movieData) => {
  try {
    const response = await movieApi.post('/movies', movieData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add movie');
  }
};

export const updateMovie = async (id, movieData) => {
  try {
    const response = await movieApi.put(`/movies/${id}`, movieData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update movie');
  }
};

export const deleteMovie = async (id) => {
  try {
    await movieApi.delete(`/movies/${id}`);
  } catch (error) {
    throw new Error('Failed to delete movie');
  }
};
