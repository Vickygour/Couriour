import axios from 'axios';
import { toast } from 'react-toastify';

// Base URL - Change according to your backend
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

// Create Axios Instance
const API = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Automatically add token
API.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('📤 API Request:', config.method.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  },
);

// Response Interceptor - Handle errors globally
API.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('📥 API Response:', response.config.url, response.data);
    }

    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          toast.error(data.message || 'Bad Request');
          break;
        case 401:
          toast.error('Unauthorized! Please login again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/logins';
          break;
        case 403:
          toast.error('Access Denied!');
          break;
        case 404:
          toast.error(data.message || 'Resource not found');
          break;
        case 500:
          toast.error('Server Error! Please try again later.');
          break;
        default:
          toast.error(data.message || 'Something went wrong!');
      }

      // Log error in development
      if (import.meta.env.DEV) {
        console.error('❌ API Error:', status, data);
      }
    } else if (error.request) {
      // Request made but no response
      toast.error('Network Error! Please check your connection.');
      console.error('❌ Network Error:', error.request);
    } else {
      // Something else happened
      toast.error('Request Failed!');
      console.error('❌ Error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default API;
