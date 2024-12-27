'use client';

import { getPosts } from '@/api/post.api';
import Loading from '@/app/loading';
import PageSelector from '@/components/common/PageSelector';
import PostCard from '@/components/post/PostCard';
import { searchParamsSchema } from '@/schema/pagination.schema';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {
  categoryId: number;
};

export default function PageClient({ categoryId }: Props) {
  const params = useSearchParams();
  const page = searchParamsSchema.parse(Object.fromEntries(params)).page;

  const { data, isPending, isError, error } = useQuery({ queryKey: ['posts', { categoryId }], queryFn: () => getPosts({ categoryId, page, size: 20 }) });

  return (
    <div className="flex flex-col h-full justify-between overflow-hidden gap-4">
      <div className="flex h-full overflow-y-auto">
        {isPending ? ( //
          <Loading className="m-auto" />
        ) : isError ? (
          <div className="m-auto">Lỗi {error.message}</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-2 lg:grid-cols-3 sm:grid-cols-1 xl:grid-cols-4"> {data?.map((item) => <PostCard key={item.id} post={item} />)}</div>
        )}
      </div>
      <PageSelector className="justify-end" defaultPage={1} maxPage={100} size={20} currentSize={data ? data.length : 0} enabled={!isPending} />
    </div>
  );
}
