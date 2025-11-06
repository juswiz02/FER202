import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import MotorbikeList from './components/MotorbikeList';
import MotorbikeDetail from './components/MotorbikeDetail';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';

function App() {
  const [user, setUser] = useState(null);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm setUser={setUser} />} />
          <Route 
            path="/motorbikes" 
            element={
              <ProtectedRoute>
                <MotorbikeList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/view/:id" 
            element={
              <ProtectedRoute>
                <MotorbikeDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;