import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useApi from '@/hooks/useApi';

const DomainDetail = () => {
  const { id } = useParams();
  const { loading, error, execute } = useApi();

  const [pageData, setPageData] = useState([]);

  const getList = async () => {
    const { data } = await execute({
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
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg p-4 flex gap-1 flex-col bg-neutral-800">
          {pageData.slice(0, 10).map((item, index) => (
            <code key={index} className="text-sm text-white flex gap-2">
              <span className="w-5">{index + 1}</span>
              <span>{item}</span>
            </code>
          ))}
          <code className="text-sm text-white flex gap-2">
            <span>...</span>
          </code>
        </div>
      </CardContent>
    </Card>
  );
};
export default DomainDetail;
