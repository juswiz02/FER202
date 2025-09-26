// EX4: Destructuring array + skip + default
// Mục tiêu: Bỏ qua phần tử, đặt mặc định

const ages = [33, 12, 20, 16];

// Dùng destructuring để lấy first, bỏ qua phần tử thứ 2, lấy third (mặc định 0 nếu không tồn tại), và restAges cho phần còn lại
const [first, , third = 0, ...restAges] = ages;

// In: first, third, restAges
console.log("=== EX4: Destructuring array + skip + default ===");
console.log("First:", first); // 33
console.log("Third:", third); // 20
console.log("Rest ages:", restAges); // [16]

// Test với array ngắn hơn
const shortAges = [10, 20];
const [first2, , third2 = 0, ...restAges2] = shortAges;

console.log("\nShort array [10, 20]:");
console.log("First:", first2); // 10
console.log("Third:", third2); // 0 (default)
console.log("Rest ages:", restAges2); // []
