const ages = [33, 12, 20, 16];

// Destructuring để lấy first, bỏ qua phần tử thứ 2, lấy third (mặc định 0 nếu không tồn tại), và restAges
const [first, , third = 0, ...restAges] = ages;

// In kết quả
console.log(`First: ${first}`);   // Kết quả: First: 33
console.log(`Third: ${third}`);     // Kết quả: Third: 20
console.log(`Rest Ages: ${restAges}`); // Kết quả: Rest Ages: 16