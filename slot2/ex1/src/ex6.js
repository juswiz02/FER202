// EX6: Sort + slice – doanh nghiệp theo năm kết thúc
// Mục tiêu: Thao tác sort bất biến (không mutate), cắt mảng

// Cho companies (name, category, start, end)
const companies = [
    { name: "TechCorp", category: "Technology", start: 2010, end: 2023 },
    { name: "FoodInc", category: "Food", start: 2015, end: 2020 },
    { name: "AutoLtd", category: "Automotive", start: 2008, end: 2019 },
    { name: "RetailCo", category: "Retail", start: 2012, end: 2022 },
    { name: "HealthCorp", category: "Healthcare", start: 2016, end: 2021 }
];

// Tạo bản sao đã sắp xếp theo end tăng dần
const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);

// In 3 công ty đầu theo định dạng "Company - EndYear"
console.log("=== EX6: Sort + slice – doanh nghiệp theo năm kết thúc ===");
console.log("Top 3 companies by end year:");
sortedCompanies
    .slice(0, 3)
    .forEach(company => console.log(`${company.name} - ${company.end}`));

// Kết quả mong đợi:
// FoodInc - 2020
// HealthCorp - 2021
// RetailCo - 2022

console.log("\nOriginal companies array unchanged:");
console.log(companies.map(c => `${c.name} - ${c.end}`));
