// EX2: Rest parameter – tính tổng và trung bình
// Mục tiêu: Nhận số lượng tham số bất kỳ bằng ...args

// Viết sum(...nums) trả về tổng các số hợp lệ (bỏ NaN, string không số)
const sum = (...nums) => {
    return nums
        .filter(num => typeof num === 'number' && !isNaN(num))
        .reduce((total, num) => total + num, 0);
};

// Viết avg(...nums) trả về trung bình (2 chữ số thập phân), nếu rỗng trả 0
const avg = (...nums) => {
    const validNums = nums.filter(num => typeof num === 'number' && !isNaN(num));
    if (validNums.length === 0) return 0;
    
    const total = validNums.reduce((sum, num) => sum + num, 0);
    return Math.round((total / validNums.length) * 100) / 100;
};

// In: sum(1,2,3), sum(1,'x',4), avg(1,2,3,4), avg()
console.log("=== EX2: Rest parameter ===");
console.log("sum(1,2,3):", sum(1, 2, 3)); // 6
console.log("sum(1,'x',4):", sum(1, 'x', 4)); // 5
console.log("avg(1,2,3,4):", avg(1, 2, 3, 4)); // 2.5
console.log("avg():", avg()); // 0
