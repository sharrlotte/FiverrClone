'use client';

import { getMyPostOrder, OrderStatus, orderStatuses } from '@/api/order.api';
import CancelOrderButton from '@/app/(user)/my-order/CancelOrderButton';
import PageSelector from '@/components/common/PageSelector';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { translateOrderStatus } from '@/lib/utils';
import { searchParamsSchema } from '@/schema/pagination.schema';
import { useQuery } from '@tanstack/react-query';
import { SquareArrowOutUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function Page() {
  const params = useSearchParams();
  const page = searchParamsSchema.parse(Object.fromEntries(params)).page;
  const [filter, setFilter] = useState<OrderStatus[]>(['PENDING']);

  const { data, isLoading } = useQuery({
    queryKey: ['orders', 'posts', page, filter],
    queryFn: () => getMyPostOrder({ page, size: 20, status: filter }),
  });

  function handleFilter(data: OrderStatus[]) {
    const newParams = new URLSearchParams(params);
    newParams.delete('status');
    data.forEach((key) => newParams.append('status', key));
    window.history.replaceState({}, '', `?${newParams.toString()}`);
    setFilter(data);
  }

  return (
    <div className="p-4 h-full flex justify-between flex-col overflow-hidden mt-6">
      <div className="h-full overflow-y-auto flex flex-col gap-4">
        <ToggleGroup className="justify-start border rounded-md divide-x gap-0 w-fit" type="multiple" value={filter} onValueChange={handleFilter}>
          {orderStatuses.map((status) => (
            <ToggleGroupItem className="data-[state=on]:bg-blue-500 rounded-none data-[state=on]:text-white" key={status} value={status}>
              {translateOrderStatus(status)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bài viết</TableHead>
              <TableHead>Tác giả</TableHead>
              <TableHead>Gói</TableHead>
              <TableHead>Hạn chót</TableHead>
              <TableHead>Tình trạng</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link className="flex gap-1" href={`/posts/${order.post.id}`}>
                      {order.post.title}
                      <SquareArrowOutUpRightIcon className="h-4 w-4" />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link className="flex gap-1 items-center" href={`/posts/${order.post.id}`}>
                      <Avatar>
                        <AvatarImage src={order.user.avatar} />
                      </Avatar>
                      {order.post.user.username}
                      <SquareArrowOutUpRightIcon className="h-4 w-4" />
                    </Link>
                  </TableCell>
                  <TableCell>{order.packageData.title}</TableCell>
                  <TableCell>{order.status === 'ACCEPTED' ? new Date(order.deliveryTime).toLocaleString() : ''}</TableCell>
                  <TableCell>{translateOrderStatus(order.status)}</TableCell>
                  <TableCell>{order.status === 'PENDING' ? <CancelOrderButton order={order} /> : ''}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading && <div className="w-full text-center">Đang tải</div>}
      </div>
      <PageSelector className="justify-end" defaultPage={page ?? 1} maxPage={100} enabled={!isLoading} />
    </div>
  );
}
