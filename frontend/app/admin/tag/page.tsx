'use client';

import * as React from 'react';
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Tag, getTag } from '@/api/tag.api';
import { useSearchParams } from 'next/navigation';
import { searchParamsSchema } from '@/schema/pagination.schema';
import UpdateTagButton from './UpdateTagButton';
import DeleteTagButton from './DeleteTagButton';
import AddTagButton from './AddTagButton';
import PageSelector from '@/components/common/PageSelector';

const columns: ColumnDef<Tag>[] = [
  {
    id: 'select',
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button className="p-0" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tên thể loại
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'description',
    header: () => <div>Mô tả</div>,
    cell: ({ row }) => {
      return <div className="font-medium px-0">{row.getValue('description')}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const tag = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <UpdateTagButton tag={tag} />
            <DeleteTagButton tag={tag} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function Page() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const params = useSearchParams();
  const page = searchParamsSchema.parse(Object.fromEntries(params)).page;

  const { data, isPending } = useQuery({
    queryKey: ['tags', page],
    queryFn: () => getTag({ size: 20, page }),
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="rounded-md border w-full h-full flex flex-col p-4 shadow-xl">
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex items-center py-4 gap-2">
          <div className="font-bold flex justify-between w-full">
            <h2>Quản lý thể loại kỹ năng</h2>
          </div>
          <div>
            <AddTagButton />
          </div>
        </div>
        {isPending ? (
          <div className="w-full text-center">Đang tải</div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="px-4">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Không có nội dung
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground text-nowrap">
          Đã chọn {table.getFilteredSelectedRowModel().rows.length} trên {table.getFilteredRowModel().rows.length} dòng.
        </div>
        <PageSelector className="justify-end" defaultPage={1} maxPage={100} enabled={!isPending} />
      </div>
    </div>
  );
}
