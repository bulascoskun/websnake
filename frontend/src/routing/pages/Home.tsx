import HomeDomainTable from '@/components/HomeDomainTable';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useApi from '@/hooks/useApi';
import { useEffect } from 'react';

const Home = () => {
  const api = useApi();

  const getList = async () => {
    try {
      const { data } = await api.get('/crawler/get_list', {
        params: {
          input_job_id: 3,
          page: 1,
          per_page: 20,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getList();
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Web Intelligence Dashboard</CardTitle>
          <CardDescription>
            Crawled domains and AI-extracted insights
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p>TODO:</p>
        </CardContent>
      </Card>

      <div className="mt-4 lg:mt-6 grid grid-cols-12 gap-4 lg:gap-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Total Domains</CardTitle>
            <CardDescription> 12 </CardDescription>
          </CardHeader>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Last crawl</CardTitle>
            <CardDescription> 2h ago </CardDescription>
          </CardHeader>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Avg confidence</CardTitle>
            <CardDescription> 0.78 </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="mt-4 lg:mt-6">
        <CardHeader>
          <CardTitle>Recent Domains</CardTitle>
          <HomeDomainTable />
        </CardHeader>
      </Card>
    </>
  );
};
export default Home;
