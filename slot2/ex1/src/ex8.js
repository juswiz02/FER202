// EX8: Reduce nâng cao – thống kê tuổi
// Mục tiêu: Tính tổng, min, max, và đếm theo nhóm bằng reduce

const ages = [25, 17, 19, 13, 22, 15, 30, 18, 16, 20];

// Với ages (mảng số), tính: total, min, max và buckets: { teen: count(13–19), adult: count(>=20) }
const ageStats = ages.reduce((stats, age) => {
    // Tính total
    stats.total += age;
    
    // Tính min
    if (stats.min === null || age < stats.min) {
        stats.min = age;
    }
    
    // Tính max
    if (stats.max === null || age > stats.max) {
        stats.max = age;
    }
    
    // Đếm theo nhóm
    if (age >= 13 && age <= 19) {
        stats.buckets.teen++;
    } else if (age >= 20) {
        stats.buckets.adult++;
    }
    
    return stats;
}, {
    total: 0,
    min: null,
    max: null,
    buckets: { teen: 0, adult: 0 }
});

// In dạng: Total: X, Min: Y, Max: Z và Buckets: { teen: a, adult: b }
console.log("=== EX8: Reduce nâng cao – thống kê tuổi ===");
console.log(`Total: ${ageStats.total}, Min: ${ageStats.min}, Max: ${ageStats.max}`);
console.log(`Buckets: { teen: ${ageStats.buckets.teen}, adult: ${ageStats.buckets.adult} }`);

// Kết quả mong đợi:
// Total: 195, Min: 13, Max: 30
// Buckets: { teen: 6, adult: 4 }

// Bonus: Tính trung bình
const average = Math.round((ageStats.total / ages.length) * 100) / 100;
console.log(`Average: ${average}`);
