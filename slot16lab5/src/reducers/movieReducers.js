export const initialMovieState = {
  movies: [],
  loading: false,
  error: null,
  editingMovie: null
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload, loading: false, error: null };

    case 'START_LOADING':
      return { ...state, loading: true, error: null };

    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'SET_EDITING_MOVIE':
      return { ...state, editingMovie: action.payload };

    case 'CLEAR_EDITING_MOVIE':
      return { ...state, editingMovie: null };

    default:
      return state;
  }
};
