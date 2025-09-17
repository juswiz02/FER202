const person = {
    name: 'John Doe',
    age: 30,
    address: {
        street: '123 Main St',
        // city: 'New York' // Uncomment để thử nghiệm với city
    }
};

// Destructuring để lấy street và city
const {
    address: {
        street = 'Unknown Street', // Giá trị mặc định
        city = 'Unknown City'       // Giá trị mặc định
    }
} = person;

// In kết quả
console.log(`Street: ${street}`); // Kết quả: Street: 123 Main St
console.log(`City: ${city}`);     // Kết quả: City: Unknown City