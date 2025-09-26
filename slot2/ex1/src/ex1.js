// EX1: Arrow function cơ bản – double & isEven
// Mục tiêu: Nắm cú pháp arrow function, return tường minh/ngầm định

// Viết double(n) trả về n * 2
const double = (n) => n * 2;

// Viết isEven(n) trả về true/false
const isEven = (n) => n % 2 === 0;

// In kết quả: double(7), isEven(10), isEven(7)
console.log("=== EX1: Arrow function cơ bản ===");
console.log("double(7):", double(7)); // 14
console.log("isEven(10):", isEven(10)); // true
console.log("isEven(7):", isEven(7)); // false

// Cách viết khác với explicit return
const double2 = (n) => {
    return n * 2;
};

const isEven2 = (n) => {
    return n % 2 === 0;
};

console.log("\nCách viết với explicit return:");
console.log("double2(7):", double2(7)); // 14
console.log("isEven2(10):", isEven2(10)); // true
console.log("isEven2(7):", isEven2(7)); // false
