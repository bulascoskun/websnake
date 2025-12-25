import { useEffect, useState } from 'react';
import useApi from './useApi';

const useGetTableData = (url: string, filter: any) => {
  const { data, loading, error, execute } = useApi();
  const [page, setPage] = useState<number>(1);

  const getList = async () => {
    await execute({
      method: 'GET',
      url: url,
      params: {
        page: page,
        per_page: 10,
        ...filter,
      },
    });
  };

  const handleReset = () => {
    if (page === 1) {
      getList();
    } else {
      setPage(1);
    }
  };

  useEffect(() => {
    getList();
  }, [page]);

  return {
    data,
    loading,
    error,
    page,
    setPage,
    handleReset,
  };
};

export default useGetTableData;
