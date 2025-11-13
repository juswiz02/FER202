import React from 'react';

const Exercise1 = () => {
    // Declare arrays as requested
    const integerArray = [25, 17, 19, 13, 22, 15, 30, 18, 16, 20];
    const nameArray = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry"];
    const personArray = [
        { name: "Alice", age: 25 },
        { name: "Bob", age: 17 },
        { name: "Charlie", age: 19 },
        { name: "Diana", age: 13 },
        { name: "Eve", age: 22 },
        { name: "Frank", age: 15 },
        { name: "Grace", age: 30 },
        { name: "Henry", age: 18 }
    ];

    // Calculate sum of integers
    const sumOfIntegers = integerArray.reduce((sum, num) => sum + num, 0);

    // Sort integer array
    const sortedIntArray = [...integerArray].sort((a, b) => a - b);

    // Sort name array by first letter, then by length
    const sortedNameArray = [...nameArray].sort((a, b) => {
        // First by first letter
        if (a[0] !== b[0]) {
            return a[0].localeCompare(b[0]);
        }
        // Then by length
        return a.length - b.length;
    });

    // Filter people whose age is 13-19, count and sum age
    const filteredPeople = personArray.filter(person => person.age >= 13 && person.age <= 19);
    const teenCount = filteredPeople.length;
    const teenAgeSum = filteredPeople.reduce((sum, person) => sum + person.age, 0);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px', borderRadius: '8px' }}>
            <h2>Exercise 1: Array Operations</h2>
            
            {/* 1. Display arrays as <ul> */}
            <div style={{ marginBottom: '20px' }}>
                <h3>1. Display Arrays as &lt;ul&gt;</h3>
                
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div>
                        <h4>Integer Array:</h4>
                        <ul>
                            {integerArray.map((num, index) => (
                                <li key={index}>{num}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h4>Name Array:</h4>
                        <ul>
                            {nameArray.map((name, index) => (
                                <li key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h4>Person Array:</h4>
                        <ul>
                            {personArray.map((person, index) => (
                                <li key={index}>{person.name} - {person.age}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* 2. Calculate sum of integer in <p> */}
            <div style={{ marginBottom: '20px' }}>
                <h3>2. Sum of Integers</h3>
                <p><strong>Sum of integer array:</strong> {sumOfIntegers}</p>
            </div>

            {/* 3. Sort the int array and display */}
            <div style={{ marginBottom: '20px' }}>
                <h3>3. Sort Integer Array</h3>
                <p><strong>Sorted integer array:</strong> [{sortedIntArray.join(', ')}]</p>
            </div>

            {/* 4. Sort the name array by first letter, then by length */}
            <div style={{ marginBottom: '20px' }}>
                <h3>4. Sort Name Array (by first letter, then by length)</h3>
                <p><strong>Sorted name array:</strong> [{sortedNameArray.join(', ')}]</p>
            </div>

            {/* 5. Filter people whose age is 13-19, count and sum age */}
            <div style={{ marginBottom: '20px' }}>
                <h3>5. Filter People (age 13-19)</h3>
                
                <p><strong>Teenagers (age 13-19):</strong></p>
                <ul>
                    {filteredPeople.map((person, index) => (
                        <li key={index}>{person.name} - {person.age}</li>
                    ))}
                </ul>
                
                <p><strong>Count of teenagers:</strong> {teenCount}</p>
                <p><strong>Sum of teenager ages:</strong> {teenAgeSum}</p>
            </div>

            {/* Summary */}
            <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px' }}>
                <h3>Summary</h3>
                <p>• Integer array sum: {sumOfIntegers}</p>
                <p>• Sorted integers: [{sortedIntArray.join(', ')}]</p>
                <p>• Sorted names: [{sortedNameArray.join(', ')}]</p>
                <p>• Teenagers count: {teenCount}</p>
                <p>• Teenagers age sum: {teenAgeSum}</p>
            </div>
        </div>
    );
};

export default Exercise1; 