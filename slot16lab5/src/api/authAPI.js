import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  try {
    const response = await authApi.get(`/users?username=${username}`);
    const user = response.data[0];

    if (user && user.password === password) {
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default authApi;
