const people = [
    { name: 'Ann', age: 19 },
    { name: 'Tom', age: 15 },
    { name: 'Jane', age: 22 },
    { name: 'Bob', age: 13 },
];

// Lọc và map
const teens = people
    .filter(person => person.age >= 13 && person.age <= 19)
    .map(person => `${person.name} (${person.age})`);

// In từng dòng
teens.forEach(teen => console.log(teen));