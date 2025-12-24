import DomainsTable from '@/components/DomainsTable';
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
import { useEffect } from 'react';
import useApi from '@/hooks/useApi';
import SkeletonTable from '@/components/ui/skeleton-table';

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
                    disabled={loading}
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
          {loading ? (
            <SkeletonTable />
          ) : (
            <DomainsTable tableData={data?.data || []} />
          )}
        </CardHeader>
      </Card>
    </>
  );
};
export default Home;
