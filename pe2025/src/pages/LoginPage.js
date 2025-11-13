import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        if (!username || !password) {
            setError("Username and password are required");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        // Redirect to the home page on successful login
        navigate('/home');
    };

    const handleCancel = () => {
        setUsername('');
        setPassword('');
        setError('');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '400px' }}>
                <h2 className="text-center">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input 
                            type="text" 
                            className={`form-control ${error && !username ? 'is-invalid' : ''}`} 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className={`form-control ${error && password.length < 6 ? 'is-invalid' : ''}`} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter password"
                        />
                        {error && password.length < 6 && (
                            <small className="text-danger">Password must be at least 6 characters</small>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                    <button type="button" className="btn btn-secondary w-100 mt-2" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;