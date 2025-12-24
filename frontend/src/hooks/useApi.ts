import { useState, useCallback } from 'react';
import { type AxiosRequestConfig } from 'axios';
import useAxios from '@/hooks/useAxios';

type UseApiResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (config: AxiosRequestConfig) => Promise<T>;
};

function useApi<T = any>(): UseApiResult<T> {
  const api = useAxios();

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (config: AxiosRequestConfig): Promise<T> => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.request<T>(config);
        setData(response.data);
        return response.data;
      } catch (err: any) {
        const message =
          err?.response?.data?.detail || err?.message || 'There was an error';

        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  return { data, loading, error, execute };
}

export default useApi;
