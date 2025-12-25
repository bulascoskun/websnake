import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from './skeleton';

const SkeletonCard = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-10 w-full" />
      </CardHeader>

      <CardContent>
        <Skeleton className="h-60 w-full" />
      </CardContent>

      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};
export default SkeletonCard;
