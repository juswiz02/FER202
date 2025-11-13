const companies = [
    { name: 'Company A', category: 'Tech', start: 2000, end: 2010 },
    // ...thêm các công ty khác nếu cần
];

// Tạo company0New với start += 1 mà không làm đổi companies[0]
const company0New = { ...companies[0], start: companies[0].start + 1 };

// Hàm concatAll
const concatAll = (...arrays) => {
    return [].concat(...arrays);
};

// In kết quả
console.log(companies[0]); // Kết quả: { name: 'Company A', category: 'Tech', start: 2000, end: 2010 }
console.log(company0New);  // Kết quả: { name: 'Company A', category: 'Tech', start: 2001, end: 2010 }
console.log(concatAll([1, 2], [3], [4, 5])); // Kết quả: [1, 2, 3, 4, 5]