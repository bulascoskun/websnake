import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import SkeletonCard from '@/components/ui/skeleton-card';
import useApi from '@/hooks/useApi';

const DomainDetail = () => {
  const { id } = useParams();
  const { data, loading, execute } = useApi();

  const initPage = async () => {
    await execute({
      method: 'GET',
      url: '/insight/get_by_id',
      params: {
        insight_id: id,
      },
    });
  };

  useEffect(() => {
    initPage();
  }, []);

  if (loading) return <SkeletonCard />;

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <span className="truncate">{data?.url}</span>
        </CardTitle>

        <Badge variant="secondary" className="w-fit gap-1">
          <Sparkles className="h-3 w-3" />
          AI Insight
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 text-sm relative">
        <div className="rounded-md border bg-muted/50 p-3">
          <p className="text-muted-foreground text-xs mb-1">Question</p>
          <p className="font-medium">{data?.found_insight?.input}</p>
        </div>

        <Separator />

        <div>
          <p className="text-muted-foreground text-xs mb-1">Answer</p>
          <p className="leading-relaxed">{data?.found_insight?.answer}</p>
        </div>

        {data?.found_insight?.source_hint && (
          <div className="pt-2 border-t text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Source:</span>{' '}
            {data?.found_insight?.source_hint}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default DomainDetail;
