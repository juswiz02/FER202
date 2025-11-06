import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import Header from './components/Header';
import Login from './components/Login';
import MovieManager from './components/MovieManager';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute>
                    <MovieManager />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/movies" replace />} />
            </Routes>
          </div>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
