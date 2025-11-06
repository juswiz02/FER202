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
                                <li key={index}>{person.name} - {person.age} years old</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* 2. Sum of integers */}
            <div style={{ marginBottom: '20px' }}>
                <h3>2. Sum of Integers</h3>
                <p>The sum of all integers is: {sumOfIntegers}</p>
            </div>

            {/* 3. Sort arrays */}
            <div style={{ marginBottom: '20px' }}>
                <h3>3. Sorted Arrays</h3>
                
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div>
                        <h4>Sorted Integer Array:</h4>
                        <ul>
                            {sortedIntArray.map((num, index) => (
                                <li key={index}>{num}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4>Sorted Name Array:</h4>
                        <ul>
                            {sortedNameArray.map((name, index) => (
                                <li key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* 4. Filter and Stats */}
            <div>
                <h3>4. Teenager Statistics (13-19 years old)</h3>
                <p>Number of teenagers: {teenCount}</p>
                <p>Sum of teenager ages: {teenAgeSum}</p>
                <div>
                    <h4>Teenager List:</h4>
                    <ul>
                        {filteredPeople.map((person, index) => (
                            <li key={index}>{person.name} - {person.age} years old</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Exercise1;