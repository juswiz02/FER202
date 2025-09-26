// EX5: Map + filter – danh sách teen
// Mục tiêu: Kết hợp filter và map với arrow function

// Cho mảng people (name, age)
const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 17 },
    { name: "Charlie", age: 19 },
    { name: "Diana", age: 13 },
    { name: "Eve", age: 22 },
    { name: "Frank", age: 15 }
];

// Lọc những người tuổi 13–19 (bao gồm 13 và 19)
// Map sang chuỗi "Ann (19)"
const teens = people
    .filter(person => person.age >= 13 && person.age <= 19)
    .map(person => `${person.name} (${person.age})`);

// In ra từng dòng
console.log("=== EX5: Map + filter – danh sách teen ===");
console.log("Teenagers (age 13-19):");
teens.forEach(teen => console.log(teen));

// Kết quả mong đợi:
// Bob (17)
// Charlie (19)
// Diana (13)
// Frank (15)
