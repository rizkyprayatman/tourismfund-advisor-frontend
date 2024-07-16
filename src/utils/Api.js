import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;