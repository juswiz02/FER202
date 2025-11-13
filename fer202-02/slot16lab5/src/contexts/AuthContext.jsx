import React, { createContext, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api/authAPI';

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  error: null
};

// Actions
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAILURE = 'AUTH_FAILURE';
const LOGOUT = 'LOGOUT';

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };
    case AUTH_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null
      };
    default:
      return state;
  }
};

// Contexts
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Actions
  const login = async (username, password) => {
    try {
      const result = await apiLogin(username, password);
      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('isAuthenticated', 'true');
        dispatch({ type: AUTH_SUCCESS, payload: result.user });
        navigate('/movies');
        return { success: true };
      } else {
        dispatch({ type: AUTH_FAILURE, payload: result.message });
        return { success: false, message: result.message };
      }
    } catch (error) {
      dispatch({ type: AUTH_FAILURE, payload: error.message });
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    dispatch({ type: LOGOUT });
    navigate('/login');
  };

  const dispatchValue = {
    login,
    logout
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatchValue}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// Custom hooks
export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return context;
};