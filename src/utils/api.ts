import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Send cookies with requests
});

// Interceptor to handle network and server errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If it's a network error (no response) or a 500 error, redirect to /500
    if (!error.response || error.response.status >= 500) {
      if (window.location.pathname !== '/500') {
        window.location.href = '/500';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
