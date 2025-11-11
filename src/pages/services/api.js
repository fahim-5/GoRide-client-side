import axios from 'axios';
import { auth } from '../utils/firebase'; // Import your firebase config

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

API.interceptors.request.use(
  async (config) => {
    // Get the current user from Firebase auth
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        // Get fresh token for each request
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Error getting Firebase token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Minimal response interceptor - no redirects
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Just log the error, don't handle redirects
    console.error('API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default API;