import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Insight } from '@/types';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { formatDateAndHour } from '@/utils/helpers';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router';

const InsightsTable = ({
  tableData,
  nocaption = false,
}: {
  tableData: Insight[];
  nocaption?: boolean;
}) => {
  return (
    <Table>
      {!nocaption && (
        <TableCaption>A list of your recent crawlings.</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Source Hint</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((insight: Insight) => (
          <TableRow key={insight.id}>
            <TableCell className="w-0">
              {formatDateAndHour(insight.created_at)}
            </TableCell>

            <TableCell className="font-medium truncate max-w-60">
              {insight.source_hint}
            </TableCell>

            <TableCell className="text-right">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={`/insights/${insight.id}`}>
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
export default InsightsTable;
