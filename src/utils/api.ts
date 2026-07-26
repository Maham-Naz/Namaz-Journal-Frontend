import axios from 'axios';

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000/api',

  withCredentials: true,

  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      console.error('Network Error');
    } else if (error.response.status >= 500) {
      console.error('Server Error');
    }

    return Promise.reject(error);
  }
);

export default api;
