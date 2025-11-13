const companies = [
    { name: 'Company A', category: 'Tech', start: 2000, end: 2010 },
    { name: 'Company B', category: 'Finance', start: 2005, end: 2015 },
    { name: 'Company C', category: 'Retail', start: 2010, end: 2020 },
    { name: 'Company D', category: 'Tech', start: 2001, end: 2005 },
];

// Tạo bản sao đã sắp xếp theo end tăng dần
const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);

// In 3 công ty đầu
sortedCompanies.slice(0, 3).forEach(company => {
    console.log(`${company.name} - ${company.end}`);
});