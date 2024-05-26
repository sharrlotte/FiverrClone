'use client';

import { getMyPostBrowsingHistory } from '@/api/post.api';
import PageSelector from '@/components/common/PageSelector';
import PostCard from '@/components/post/PostCard';
import { searchParamsSchema } from '@/schema/pagination.schema';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const params = useSearchParams();
  const page = searchParamsSchema.parse(Object.fromEntries(params)).page;

  const { data, isLoading } = useQuery({
    queryKey: ['post-browsing-history', page],
    queryFn: () => getMyPostBrowsingHistory({ page, size: 40 }),
  });

  return (
    <div className="p-4 h-full flex justify-between flex-col overflow-hidden">
      <div className="h-full overflow-y-auto flex flex-col gap-4">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(400px,100%),1fr))] gap-2">{data && data.map((post) => <PostCard key={post.id} post={post} />)}</div>
        {isLoading && <div className="w-full text-center">Đang tải</div>}
      </div>

      <PageSelector className="justify-end" defaultPage={1} maxPage={100} enabled={!isLoading} />
    </div>
  );
}
