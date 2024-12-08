import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from '@/components/ui/pagination';
import useQueryState from '@/hook/use-query-state';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

type Props = {
  className?: string;
  defaultPage: number;
  maxPage: number;
  enabled: boolean;
  currentSize: number;
  size: number;
};

export default function PageSelector({ className, defaultPage, maxPage, enabled, size, currentSize }: Props) {
  const [page, setPage] = useQueryState('page', '' + defaultPage);
  const [goTo, setGoTo] = useState(0);
  const [open, setOpen] = useState(false);

  maxPage = size === currentSize ? maxPage : +page;

  const previousPage = +page <= 1 ? 1 : +page - 1;
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
          <PaginationPrevious onClick={() => handlePageChange(previousPage)} />
        </PaginationItem>
        {+page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(previousPage)}>{previousPage}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive>
            <span className="text-xs">{page}</span>
          </PaginationLink>
        </PaginationItem>
        {nextPage !== +page && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(nextPage)}>
              <span className="text-xs">{nextPage}</span>
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <PaginationEllipsis />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Đi đến trang</DialogTitle>
              <Input type="number" value={goTo} onChange={(event) => setGoTo(event.currentTarget.valueAsNumber)} />
              <div className="flex justify-end">
                <Button
                  className="min-w-20"
                  onClick={() => {
                    handlePageChange(goTo);
                    setOpen(false);
                  }}
                >
                  Đi
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(nextPage)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
