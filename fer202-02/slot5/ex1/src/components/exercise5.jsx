import React from 'react';

const Exercise5 = () => {
    // Pre-defined shopping cart data
    const items = [
        { id: 1, name: 'Apple', price: 1.50 },
        { id: 2, name: 'Banana', price: 0.80 },
        { id: 3, name: 'Orange', price: 2.00 },
        { id: 4, name: 'Grape', price: 3.50 },
        { id: 5, name: 'Strawberry', price: 4.00 }
    ];

    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px', borderRadius: '8px' }}>
            <h2>Exercise 5: Shopping Cart</h2>
            
            <div>
                <h3>Shopping Cart</h3>
                <ul>
                    {items.map(item => (
                        <li key={item.id} style={{ marginBottom: '10px' }}>
                            {item.name} - ${item.price.toFixed(2)}
                        </li>
                    ))}
                </ul>
                <p><strong>Total: ${totalPrice.toFixed(2)}</strong></p>
            </div>
        </div>
    );
};

export default Exercise5;
