import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getMovies, addMovie, updateMovie, deleteMovie } from '../api/movieAPI';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';

// Contexts
const MovieStateContext = createContext();
const MovieDispatchContext = createContext();

// Provider component
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  // Load movies on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // Actions
  const fetchMovies = async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const movies = await getMovies();
      dispatch({ type: 'SET_MOVIES', payload: movies });
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  const createMovie = async (movieData) => {
    dispatch({ type: 'START_LOADING' });
    try {
      await addMovie(movieData);
      await fetchMovies();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const editMovie = async (id, movieData) => {
    dispatch({ type: 'START_LOADING' });
    try {
      await updateMovie(id, movieData);
      await fetchMovies();
      dispatch({ type: 'CLEAR_EDITING_MOVIE' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const removeMovie = async (id) => {
    dispatch({ type: 'START_LOADING' });
    try {
      await deleteMovie(id);
      await fetchMovies();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const setEditingMovie = (movie) => {
    dispatch({ type: 'SET_EDITING_MOVIE', payload: movie });
  };

  const clearEditingMovie = () => {
    dispatch({ type: 'CLEAR_EDITING_MOVIE' });
  };

  const dispatchValue = {
    createMovie,
    editMovie,
    removeMovie,
    setEditingMovie,
    clearEditingMovie
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};

// Custom hooks
export const useMovieState = () => {
  const context = useContext(MovieStateContext);
  if (context === undefined) {
    throw new Error('useMovieState must be used within a MovieProvider');
  }
  return context;
};

export const useMovieDispatch = () => {
  const context = useContext(MovieDispatchContext);
  if (context === undefined) {
    throw new Error('useMovieDispatch must be used within a MovieProvider');
  }
  return context;
};
