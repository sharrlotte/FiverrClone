import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from '@/components/ui/pagination';
import useQueryState from '@/hook/use-query-state';
import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  className?: string;
  defaultPage: number;
  maxPage: number;
  enabled: boolean;
};

export default function PageSelector({ className, defaultPage, maxPage, enabled }: Props) {
  const [page, setPage] = useQueryState('page', '' + defaultPage);

  const previousPage = +page <= 0 ? 0 : +page - 1;
  const nextPage = +page >= maxPage ? +page : +page + 1;

  function handlePageChange(page: number) {
    if (enabled) {
      setPage('' + page);
    }
  }

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(previousPage)}>{previousPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(nextPage)}>{nextPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
