import React from 'react';

const Exercise2 = () => {
    // Pre-defined data instead of input
    const results = [
        "Hello World",
        "React is awesome",
        "JavaScript is fun",
        "Learning React components",
        "Building web applications"
    ];

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px', borderRadius: '8px' }}>
            <h2>Exercise 2: Form Handling</h2>
            
            <div>
                <h3>Pre-defined Results:</h3>
                <ul>
                    {results.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Exercise2;
