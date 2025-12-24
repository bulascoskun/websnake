import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { useMemo } from 'react';
import { toast } from 'sonner';

const useApi = () => {
  const token = useAuthStore((state) => state?.user?.token);

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

        if (typeof error?.response?.data?.detail === 'string') {
          errorMessage = error?.response?.data?.detail;
        } else {
          errorMessage = 'There was an error';
        }
        toast.error(errorMessage);

        // TODO: if 401 logout

        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  return api;
};
export default useApi;
