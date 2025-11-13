import React from 'react';

const Exercise4 = () => {
    // Pre-defined data instead of fetching
    const data = [
        { id: 1, name: 'Product A', value: 150 },
        { id: 2, name: 'Product B', value: 250 },
        { id: 3, name: 'Product C', value: 350 },
        { id: 4, name: 'Product D', value: 450 }
    ];

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px', borderRadius: '8px' }}>
            <h2>Exercise 4: Data Display</h2>
            
            <div>
                <h3>Product Data:</h3>
                <ul>
                    {data.map(item => (
                        <li key={item.id}>
                            {item.name} - Value: ${item.value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Exercise4;
