import React, { useState } from 'react';

const Exercise3 = () => {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState('');
    const [theme, setTheme] = useState('light');

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        setCount(prevCount => prevCount - 1);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const styles = {
        container: {
            padding: '20px',
            border: '1px solid #ccc',
            margin: '10px',
            borderRadius: '8px',
            backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
            color: theme === 'light' ? '#000000' : '#ffffff'
        },
        counter: {
            marginBottom: '20px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '4px'
        },
        message: {
            marginBottom: '20px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '4px'
        },
        theme: {
            marginBottom: '20px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '4px'
        },
        button: {
            margin: '0 5px',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer'
        },
        input: {
            margin: '10px 0',
            padding: '8px',
            width: '100%',
            maxWidth: '300px'
        }
    };

    return (
        <div style={styles.container}>
            <h2>Exercise 3: State Management</h2>

            {/* Counter Section */}
            <div style={styles.counter}>
                <h3>Counter: {count}</h3>
                <button 
                    onClick={handleIncrement}
                    style={{...styles.button, backgroundColor: '#4CAF50', color: 'white'}}
                >
                    Increment
                </button>
                <button 
                    onClick={handleDecrement}
                    style={{...styles.button, backgroundColor: '#f44336', color: 'white'}}
                >
                    Decrement
                </button>
            </div>

            {/* Message Section */}
            <div style={styles.message}>
                <h3>Message Input</h3>
                <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Type a message..."
                    style={styles.input}
                />
                <p>Message: {message}</p>
            </div>

            {/* Theme Toggle Section */}
            <div style={styles.theme}>
                <h3>Theme Toggle</h3>
                <button 
                    onClick={toggleTheme}
                    style={{
                        ...styles.button,
                        backgroundColor: theme === 'light' ? '#2196F3' : '#FFC107',
                        color: theme === 'light' ? 'white' : 'black'
                    }}
                >
                    Toggle Theme (Current: {theme})
                </button>
            </div>
        </div>
    );
};

export default Exercise3;