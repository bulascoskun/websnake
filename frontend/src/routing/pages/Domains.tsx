import DomainsTable from '@/components/DomainsTable';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SkeletonTable from '@/components/ui/skeleton-table';
import useApi from '@/hooks/useApi';
import { useEffect } from 'react';

const Domains = () => {
  const { data, loading: loading, error: _err, execute } = useApi();

  const getList = async () => {
    await execute({
      method: 'GET',
      url: '/crawler/get_domains',
      params: {
        page: 1,
        per_page: 20,
      },
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Domains</CardTitle>
        <CardDescription>
          Here you can view the domains you've crawled, or add domains to crawl
          using the button on the side.
        </CardDescription>
        <CardAction>
          <Button>Add Domain</Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        {loading ? (
          <SkeletonTable count={10} />
        ) : (
          <DomainsTable tableData={data?.data || []} nocaption />
        )}
      </CardContent>
    </Card>
  );
};
export default Domains;
