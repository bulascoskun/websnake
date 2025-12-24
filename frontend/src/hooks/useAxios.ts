import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const useAxios = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state?.user?.token);
  const logout = useAuthStore((state) => state.logout);

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    });

    instance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        let errorMessage;

        if (error?.response?.status === 401) {
          logout();
          navigate('/auth/login');

          return Promise.reject(error);
        }

        if (typeof error?.response?.data?.detail === 'string') {
          errorMessage = error?.response?.data?.detail;
        } else {
          errorMessage = 'There was an error';
        }
        toast.error(errorMessage);

        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  return api;
};
export default useAxios;
