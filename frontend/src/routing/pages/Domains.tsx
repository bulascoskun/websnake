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
import useGetTableData from '@/hooks/useGetTableData';

const Domains = () => {
  const {
    data,
    loading,
    error: _,
    page,
    setPage,
  } = useGetTableData('/crawler/get_domains');

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
              page={page || 0}
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
