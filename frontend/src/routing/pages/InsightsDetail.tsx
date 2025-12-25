import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import SkeletonCard from '@/components/ui/skeleton-card';
import useApi from '@/hooks/useApi';

const DomainDetail = () => {
  const { id } = useParams();
  const { loading, execute } = useApi();

  const getList = async () => {
    const response = await execute({
      method: 'GET',
      url: '/insight/get_by_id',
      params: {
        insight_id: id,
      },
    });
  };

  useEffect(() => {
    getList();
  }, []);

  if (loading) return <SkeletonCard />;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </>
  );
};
export default DomainDetail;
