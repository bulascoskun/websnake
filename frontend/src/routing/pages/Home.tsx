import RecentDomainsTable from '@/components/RecentDomainsTable';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RefreshCcw } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import useApi from '@/hooks/useApi';

const Home = () => {
  const api = useApi();

  const [tableData, setTableData] = useState([]);

  const getList = async () => {
    try {
      const { data } = await api.get('/crawler/get_domains', {
        params: {
          page: 1,
          per_page: 5,
        },
      });
      setTableData(data.data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getList();
  }, []);

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
            <CardDescription> TODO: </CardDescription>
          </CardHeader>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Last crawl</CardTitle>
            <CardDescription> TODO: </CardDescription>
          </CardHeader>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Avg confidence</CardTitle>
            <CardDescription> TODO: </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="mt-4 lg:mt-6">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <div>Recent Domains</div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={getList}
                    variant="outline"
                    size="icon"
                    aria-label="Refresh"
                  >
                    <RefreshCcw />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="py-1">View Detail</div>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardTitle>
          <Separator />
          <RecentDomainsTable tableData={tableData} />
        </CardHeader>
      </Card>
    </>
  );
};
export default Home;
