import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div style={{ minHeight: '100vh', transition: 'all 0.3s ease' }}>
          <h1>useContext Exercises</h1>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <CounterComponent />
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <LightSwitch />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <LoginForm />
          </div>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
