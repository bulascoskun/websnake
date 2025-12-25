import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect } from 'react';
import useApi from '@/hooks/useApi';

const Home = () => {
  const { data, loading: loading, error: _err, execute } = useApi();
  const getList = async () => {
    await execute({
      method: 'GET',
      url: '/crawler/get_domains',
      params: {
        page: 1,
        per_page: 5,
      },
    });
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
        <CardDescription>You can view AI-extracted insights</CardDescription>
      </CardHeader>

      <CardContent>
        <p>TODO:</p>
      </CardContent>
    </Card>
  );
};
export default Home;
