import AppPagination from '@/components/AppPagination';
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
import { useEffect, useState } from 'react';

const Domains = () => {
  const { data, loading: loading, error: _err, execute } = useApi();
  const [page, setPage] = useState<number>(1);

  const getList = async () => {
    await execute({
      method: 'GET',
      url: '/crawler/get_domains',
      params: {
        page: page,
        per_page: 10,
      },
    });
  };

  useEffect(() => {
    getList();
  }, [page]);

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
          <div>
            <DomainsTable tableData={data?.data || []} nocaption />
            <AppPagination
              page={data?.page || 0}
              totalPages={data?.total_pages || 0}
              setPage={setPage}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default Domains;
