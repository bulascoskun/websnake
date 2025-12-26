import AppPagination from '@/components/AppPagination';
import InsightsTable from '@/components/InsightsTable';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SkeletonTable from '@/components/ui/skeleton-table';
import useGetTableData from '@/hooks/useGetTableData';

const Home = () => {
  const { data, loading, page, setPage } = useGetTableData('/insight/get_list');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
        <CardDescription>You can view AI-extracted insights</CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <SkeletonTable count={10} />
        ) : (
          <>
            <InsightsTable tableData={data?.data || []} nocaption />
            <AppPagination
              page={page || 0}
              totalPages={data?.total_pages || 0}
              setPage={setPage}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default Home;
