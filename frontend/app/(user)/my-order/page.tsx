'use client';

import { getMyPostOrder } from '@/api/post.api';
import CancelOrderButton from '@/app/(user)/my-order/CancelOrderButton';
import PageSelector from '@/components/common/PageSelector';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { translateOrderStatus } from '@/lib/utils';
import { searchParamsSchema } from '@/schema/pagination.schema';
import { useQuery } from '@tanstack/react-query';
import { SquareArrowOutUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const params = useSearchParams();
  const page = searchParamsSchema.parse(Object.fromEntries(params)).page;

  const { data, isLoading } = useQuery({
    queryKey: ['orders', 'posts', page],
    queryFn: () => getMyPostOrder({ page, size: 20 }),
  });

  return (
    <div className="p-4 h-full flex justify-between flex-col overflow-hidden mt-6">
      <div className="h-full overflow-y-auto flex flex-col gap-4">
        <div>
        </div>
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
                    <Link className="flex gap-1" href={`/posts/${order.post.id}`}>
                      {order.post.user.username}
                      <SquareArrowOutUpRightIcon className="h-4 w-4" />
                    </Link>
                  </TableCell>
                  <TableCell>{order.package.title}</TableCell>
                  <TableCell>{order.status === 'Accepted' ? new Date(order.deliveryTime).toLocaleString() : ''}</TableCell>
                  <TableCell>{translateOrderStatus(order.status)}</TableCell>
                  <TableCell>{order.status === 'Pending' ? <CancelOrderButton order={order} /> : ''}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading && <div className="w-full text-center">Đang tải</div>}
      </div>
      <PageSelector className="justify-end" defaultPage={1} maxPage={100} enabled={!isLoading} />
    </div>
  );
}
