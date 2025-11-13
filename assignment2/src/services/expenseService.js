import axios from 'axios';

const API_URL = 'http://localhost:5000';

// API Calls (CRUD)
export const fetchExpenses = (userId) => {
  return axios.get(`${API_URL}/expenses?userId=${userId}`);
};

export const addExpense = (expense) => {
  return axios.post(`${API_URL}/expenses`, expense);
};

export const updateExpense = (id, expense) => {
  return axios.put(`${API_URL}/expenses/${id}`, expense);
};

export const deleteExpense = (id) => {
  return axios.delete(`${API_URL}/expenses/${id}`);
};

// Login API
export const authService = {
  login: async (username, password) => {
    try {
        const response = await axios.get(`${API_URL}/users?username=${username}&password=${password}`);
        
        if (response.data.length > 0) {
            const user = response.data[0];
            return { 
                token: `mock-token-${user.id}`, 
                user: { id: user.id, fullName: user.fullName, username: user.username } 
            };
        }
        return null;
    } catch (error) {
        console.error("Login failed:", error);
        return null;
    }
  }
};

// Helper Functions
export const formatVND = (amount) => {
  if (amount === null || amount === undefined) return '0 ₫';
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

// CHỈNH SỬA: Chuyển đổi định dạng lưu trữ YYYY-MM-DD sang hiển thị DD-MM-YYYY (0.25 mark)
export const formatDateDisplay = (dateString) => {
  if (!dateString || dateString.indexOf('-') === -1) return dateString;
  
  // Dữ liệu JSON Server lưu YYYY-MM-DD
  const [year, month, day] = dateString.split('-'); 
  return `${day}-${month}-${year}`;
};

export const getUniqueCategories = (expenses) => {
    const categories = new Set();
    expenses.forEach(expense => categories.add(expense.category));
    return ['All categories', ...Array.from(categories).filter(c => c)];
};