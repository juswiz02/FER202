// EX7: Spread vs. rest – bất biến & gộp mảng
// Mục tiêu: Phân biệt rest (định nghĩa hàm) và spread (sao chép/gộp)

const companies = [
    { name: "TechCorp", category: "Technology", start: 2010, end: 2023 },
    { name: "FoodInc", category: "Food", start: 2015, end: 2020 },
    { name: "AutoLtd", category: "Automotive", start: 2008, end: 2019 }
];

// Từ companies[0], tạo company0New với start += 1 mà không làm đổi companies[0]
const company0New = {
    ...companies[0],
    start: companies[0].start + 1
};

// Viết hàm concatAll(...arrays) trả về mảng gộp của mọi mảng truyền vào
const concatAll = (...arrays) => {
    return arrays.reduce((result, array) => [...result, ...array], []);
};

// In: companies[0] và company0New; kết quả concatAll([1,2],[3],[4,5])
console.log("=== EX7: Spread vs. rest – bất biến & gộp mảng ===");
console.log("Original companies[0]:", companies[0]);
console.log("Modified company0New:", company0New);
console.log("Companies[0] unchanged:", companies[0].start === 2010); // true

console.log("\nconcatAll([1,2],[3],[4,5]):", concatAll([1, 2], [3], [4, 5])); // [1, 2, 3, 4, 5]

// Test thêm với concatAll
console.log("concatAll(['a','b'],['c']):", concatAll(['a', 'b'], ['c'])); // ['a', 'b', 'c']
