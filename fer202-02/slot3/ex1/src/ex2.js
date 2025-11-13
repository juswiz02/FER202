// Hàm sum
const sum = (...nums) => {
    return nums.reduce((total, num) => {
        // Kiểm tra số hợp lệ (là số và không phải NaN)
        if (typeof num === 'number' && !isNaN(num)) {
            return total + num;
        }
        return total;
    }, 0);
};

// Hàm avg
const avg = (...nums) => {
    if (nums.length === 0) return 0; // Nếu không có tham số, trả 0

    const total = sum(...nums); // Sử dụng hàm sum để tính tổng
    return parseFloat((total / nums.length).toFixed(2)); // Tính trung bình và làm tròn
};

// In kết quả
console.log(sum(1, 2, 3));         // Should print 6
console.log(sum(1, 'x', 4));       // Should print 5
console.log(avg(1, 2, 3, 4));      // Should print 2.50
console.log(avg());                 // Should print 0