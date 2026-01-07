import axios from 'axios';

// Base URL Laravel backend
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Fungsi untuk set auth token setelah login/register
export const setAuthToken = (token) => {
  if(token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
