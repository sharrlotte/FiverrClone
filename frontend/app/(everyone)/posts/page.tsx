'use client';

import { getPosts } from '@/api/post.api';
import PageSelector from '@/components/common/PageSelector';
import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import { searchParamsSchema } from '@/schema/pagination.schema';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const params = useSearchParams();
  const page = searchParamsSchema.parse(Object.fromEntries(params)).page;

  const { data, isPending } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => getPosts({ page, size: 20 }),
  });

  return (
    <div className="p-4 h-full flex justify-between flex-col overflow-hidden mt-6">
      <div className="h-full overflow-y-auto flex flex-col gap-4">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-2">
          {data && data.map((post) => <PostCard key={post.id} post={post} />)}
          {isPending && new Array(20).fill(1).map((_, index) => <PostCardSkeleton key={index} />)}
          {data && data.length === 0 && !isPending && <div className="col-span-full text-center">Không có kết quả</div>}
        </div>
      </div>

      <PageSelector className="justify-end" defaultPage={1} maxPage={100} enabled={!isPending} />
    </div>
  );
}
