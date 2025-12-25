import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useApi from '@/hooks/useApi';
import type { Domain } from '@/types';
import { getStatusColors } from '@/lib/utils';
import { capitalizeFirstLetter } from '@/utils/helpers';
import SkeletonCard from '@/components/ui/skeleton-card';
import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DomainDetail = () => {
  const { id } = useParams();
  const { loading, execute } = useApi();

  const [domainData, setDomainData] = useState<Domain>();
  const [pageData, setPageData] = useState([]);

  const getList = async () => {
    const { data, domain_data: domainData } = await execute({
      method: 'GET',
      url: 'crawler/get_list',
      params: {
        page: 1,
        per_page: 10,
        input_job_id: id,
      },
    });

    const urlArr = data.map((domain: { url: string }) => domain.url);

    setPageData(urlArr);
    setDomainData(domainData);
  };

  useEffect(() => {
    getList();
  }, []);

  if (loading) return <SkeletonCard />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between">
            <div>{domainData?.url}</div>
            <div className="flex gap-2 items-center">
              <div
                className={`size-4 rounded-full ${
                  domainData?.status &&
                  getStatusColors(domainData?.status || '')
                }`}
              ></div>
              <div className="text-xs">
                {capitalizeFirstLetter(domainData?.status)}
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {domainData?.status === 'completed' && (
          <div className="border rounded-lg p-4 flex gap-1 flex-col bg-neutral-800">
            {pageData.slice(0, 10).map((item, index) => (
              <code key={index} className="text-sm text-white flex gap-2">
                <div className="w-5">{index + 1}</div>
                <div className="w-full truncate" title={item}>
                  {item}
                </div>
              </code>
            ))}
            <code className="text-sm text-white flex gap-2">
              <div>...</div>
            </code>
          </div>
        )}

        {domainData?.status === 'failed' && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Unable to crawl {domainData?.url}.</AlertTitle>
            <AlertDescription>
              <p>
                We are unable crawl {domainData?.url} it because the site
                doesn't allow it.
              </p>
            </AlertDescription>
          </Alert>
        )}

        {domainData?.status === 'processing' && (
          <Alert className="text-orange-800">
            <AlertCircleIcon />
            <AlertTitle>Processing...</AlertTitle>
            <AlertDescription className="text-orange-800">
              <p>We are currently crawling {domainData?.url} please wait.</p>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
export default DomainDetail;
