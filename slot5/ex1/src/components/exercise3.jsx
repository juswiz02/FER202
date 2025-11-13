import React from 'react';

const Exercise3 = () => {
    // Pre-defined data
    const count = 42;
    const message = "Welcome to React State Management!";

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px', borderRadius: '8px' }}>
            <h2>Exercise 3: State Management</h2>
            
            <div style={{ marginBottom: '20px' }}>
                <h3>Counter</h3>
                <p><strong>Count:</strong> {count}</p>
            </div>

            <div>
                <h3>Message</h3>
                <p><strong>Current message:</strong> {message}</p>
            </div>
        </div>
    );
};

export default Exercise3;
