import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { Dispatch, SetStateAction } from 'react';

const AppPagination = ({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const hasEllipsis = () => {
    if (page === 1) {
      return false;
    }
    return false;
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {totalPages > 1 && (
          <PaginationItem
            onClick={() => {
              if (page !== 1) {
                setPage(page - 1);
              }
            }}
          >
            <PaginationPrevious />
          </PaginationItem>
        )}

        {hasEllipsis() && (
          <>
            <PaginationItem>
              <PaginationLink>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {[...Array(totalPages || 0)].map((_, i) => (
          <PaginationItem
            key={i}
            onClick={() => {
              setPage(i + 1);
            }}
          >
            <PaginationLink isActive={page === i + 1}>{i + 1}</PaginationLink>
          </PaginationItem>
        ))}

        {hasEllipsis() && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{totalPages || 0}</PaginationLink>
            </PaginationItem>
          </>
        )}

        {totalPages > 1 && (
          <PaginationItem
            onClick={() => {
              if (page !== totalPages) {
                setPage(page + 1);
              }
            }}
          >
            <PaginationNext />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
export default AppPagination;
