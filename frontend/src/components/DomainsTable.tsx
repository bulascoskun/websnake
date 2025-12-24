import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  capitalizeFirstLetter,
  formatDate,
  formatOnlyHour,
} from '@/utils/helpers';
import type { Domain } from '@/types';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const statusColors: any = {
  failed: 'bg-red-500',
  completed: 'bg-green-600',
  processing: 'bg-orange-400',
};

const DomainsTable = ({
  tableData,
  nocaption = false,
}: {
  tableData: Domain[];
  nocaption?: boolean;
}) => {
  return (
    <Table>
      {!nocaption && (
        <TableCaption>A list of your recent crawlings.</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead className="w-30">Status</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Crawl Time</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((domain: Domain) => (
          <TableRow key={domain.id}>
            <TableCell className="w-25">
              <div className="flex gap-2 items-center">
                <div
                  className={`size-4 rounded-full ${
                    domain.status && statusColors[domain.status]
                  }`}
                ></div>
                <div className="text-xs">
                  {capitalizeFirstLetter(domain.status)}
                </div>
              </div>
            </TableCell>
            <TableCell className="font-medium">{domain.url}</TableCell>
            <TableCell>
              <div>
                <span className="mr-1 text-xs">
                  {formatDate(domain.created_at)}
                </span>
                <span className="font-medium">
                  {formatOnlyHour(domain.created_at)}
                </span>
                <span className="p-2">-</span>
                <span className="mr-1 text-xs">
                  {formatDate(domain.updated_at)}
                </span>
                <span className="font-medium">
                  {formatOnlyHour(domain.updated_at)}
                </span>
              </div>
            </TableCell>
            <TableCell className=" text-right">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={`/domains/${domain.id}`}>
                    <Button size="icon" aria-label="View Detail">
                      <ArrowRightIcon />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="py-1">View Detail</div>
                </TooltipContent>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default DomainsTable;
