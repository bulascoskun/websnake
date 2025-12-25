import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { capitalizeFirstLetter } from '@/utils/helpers';
import { getStatusColors } from '@/lib/utils';
import { AlertCircleIcon } from 'lucide-react';
import { AddInsight } from '@/components/AddInsight';
import type { Domain } from '@/types';
import SkeletonCard from '@/components/ui/skeleton-card';
import useApi from '@/hooks/useApi';

const DomainDetail = () => {
  const { id } = useParams();
  const { loading, execute } = useApi();

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
