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
import { RefreshCcw, Globe, Brain, Clock } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import useApi from '@/hooks/useApi';
import SkeletonTable from '@/components/ui/skeleton-table';
import type { RecentDomains } from '@/types';
import { formatDateAndHour } from '@/utils/helpers';
import { Link, useNavigate } from 'react-router';
import { AddDomain } from '@/components/AddDomain';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
  const navigate = useNavigate();
  const { loading: loading, error: _err, execute } = useApi();

  const [data, setData] = useState<RecentDomains | null>(null);
  const [pageData, setPageData] = useState<{
    total_insights: string;
    last_crawl: string;
  }>({
    total_insights: '',
    last_crawl: '',
  });

  const initPage = async () => {
    const data = await execute({
      method: 'GET',
      url: '/home/get_stats',
    });
    setPageData(data);
  };
  const getList = async () => {
    const data = await execute({
      method: 'GET',
      url: '/crawler/get_domains',
      params: {
        page: 1,
        per_page: 5,
      },
    });
    setData(data);
  };

  useEffect(() => {
    initPage();
    getList();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Web Intelligence Dashboard</CardTitle>
          <CardDescription>
            Monitor crawled domains, track AI-generated insights, and keep your
            web intelligence up to date.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex gap-2">
              <AddDomain
                buttonSize="sm"
                getList={() => {
                  navigate('/domains');
                }}
              />
              <Link to="/domains">
                <Button size="sm" variant="outline">
                  View All Domains
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 lg:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Domains */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="w-full">
                <p className="text-sm text-muted-foreground">Domains</p>
                {loading ? (
                  <Skeleton className="h-6 w-full" />
                ) : (
                  <p className="text-xl font-bold">{data?.total || 0}</p>
                )}
              </div>
              <Globe className="h-8 w-8 text-muted-foreground ml-4" />
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="w-full">
                <p className="text-sm text-muted-foreground">AI Insights</p>
                {loading ? (
                  <Skeleton className="h-6 w-full" />
                ) : (
                  <p className="text-xl font-bold">
                    {pageData?.total_insights || 0}
                  </p>
                )}
              </div>
              <Brain className="h-8 w-8 text-muted-foreground ml-4" />
            </div>
          </CardContent>
        </Card>

        {/* Last Crawl */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="w-full">
                <p className="text-sm text-muted-foreground">Last Crawl</p>
                {loading ? (
                  <Skeleton className="h-6 w-full" />
                ) : (
                  <p className="text-xl font-bold">
                    {formatDateAndHour(pageData?.last_crawl) || '-'}
                  </p>
                )}
              </div>
              <Clock className="h-8 w-8 text-muted-foreground ml-4" />
            </div>
          </CardContent>
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
