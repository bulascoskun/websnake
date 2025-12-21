import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("access_token");

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorMessage = error?.response?.data?.detail;
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      toast.error('There was an error');
    }

    // TODO: if token not available -> logout & clear store

    return Promise.reject(error);
  }
);

export default api;
