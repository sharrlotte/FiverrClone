'use client';

import * as React from 'react';
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { debounce } from 'lodash';
import { Authority, getAuthorities, getRoles, Role, updateAuthorities } from '@/schema/role.schema';

export default function Page() {
  return (
    <div className="rounded-md border w-full h-full flex flex-col p-4 shadow-xl">
      <div className="flex flex-col h-full overflow-hidden gap-2">
        <div className="flex items-center py-4 gap-2">
          <div className="font-bold flex justify-between w-full">
            <h2>Quản lý vai trò</h2>
          </div>
        </div>
        <RoleList />
      </div>
    </div>
  );
}

type RoleListProps = {};

function RoleList({}: RoleListProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles(),
  });

  const {
    data: authorities,
    isError: isAuthError,
    error: authError,
  } = useQuery({
    queryKey: ['authorities'],
    queryFn: () => getAuthorities(),
  });

  console.log(authorities);

  const columns: ColumnDef<Role>[] = [
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
            Tên
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'authorities',
      header: () => <div>Mô tả</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium px-0 flex gap-1">
            <RoleRolePicker role={row.original} authorities={authorities ?? []} />
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"></DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
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

  if (isError) {
    return error.message;
  }

  return isPending ? (
    <div className="w-full text-center">Đang tải</div>
  ) : (
    <div className="h-full w-full flex justify-between flex-col">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="px-2">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="h-full overflow-y-auto">
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
    </div>
  );
}

type RoleRolePickerProps = {
  role: Role;
  authorities: Authority[];
};

const debounced = debounce(async (id: number, authorities: number[], callback: () => void) => {
  await updateAuthorities(id, authorities);
  callback();
}, 1000);

function RoleRolePicker({ role, authorities }: RoleRolePickerProps) {
  const [filter, setFilter] = useState<Authority[]>(role.authorities);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async (data: number[]) =>
      debounced(role.id, data, () =>
        queryClient.invalidateQueries({
          queryKey: ['roles'],
          exact: false,
        }),
      ),
    onError: (error: any) => {
      switch (error.response.status) {
        default:
          toast({
            title: 'Lỗi',
            description: 'Có lỗi đã xảy ra, vui lòng thử lại sau',
            variant: 'destructive',
          });
          break;
      }
    },
  });

  function handleUpdateRole(data: Authority[]) {
    mutate(data.map((r) => r.id));
    setFilter(data);
  }

  return (
    <Dialog>
      <DialogTrigger className="flex gap-1">{role.authorities.length > 0 ? role.authorities.map((role) => <span key={role.name}>{role.name}</span>) : 'Không có quyền'}</DialogTrigger>
      <DialogContent className="w-full overflow-x-hidden overflow-y-auto">
        <ToggleGroup className="justify-start flex flex-wrap rounded-md divide-x gap-1 w-fit" type="multiple" value={filter.map((r) => r.name)} onValueChange={(values) => handleUpdateRole(authorities.filter((a) => values.includes(a.name)))}>
          {authorities.length > 0
            ? authorities.map((role) => (
                <ToggleGroupItem className="data-[state=on]:bg-blue-500 border rounded-none overflow-visible data-[state=on]:text-white" key={role.name} value={role.name}>
                  {role.name}
                </ToggleGroupItem>
              ))
            : 'Không có quyền'}
        </ToggleGroup>
      </DialogContent>
    </Dialog>
  );
}
