// EX3: Destructuring object lồng nhau – lấy địa chỉ
// Mục tiêu: Lấy thuộc tính lồng nhau + giá trị mặc định

// Cho person object
const person = {
    name: "John Doe",
    age: 30,
    address: {
        street: "123 Main St",
        city: "Ho Chi Minh City",
        country: "Vietnam"
    }
};

// Dùng destructuring để lấy street, city (mặc định "Unknown City" nếu không có)
const { address: { street, city = "Unknown City" } } = person;

// In: street, city
console.log("=== EX3: Destructuring object lồng nhau ===");
console.log("Street:", street); // "123 Main St"
console.log("City:", city); // "Ho Chi Minh City"

// Test với person không có address
const personNoAddress = {
    name: "Jane Doe",
    age: 25
};

// Destructuring với default cho cả address và city
const { address: { street: street2 = "Unknown Street", city: city2 = "Unknown City" } = {} } = personNoAddress;

console.log("\nPerson without address:");
console.log("Street:", street2); // "Unknown Street"
console.log("City:", city2); // "Unknown City"
