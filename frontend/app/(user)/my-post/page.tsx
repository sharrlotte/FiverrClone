'use client';

import { getPost } from '@/api/post.apit';
import PageSelector from '@/components/common/PageSelector';
import PostCard from '@/components/post/PostCard';
import { searchParamsSchema } from '@/schema/pagination.schema';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const params = useSearchParams();
  const page = searchParamsSchema.parse(Object.fromEntries(params)).page;

  const { data, isFetching } = useQuery({
    queryKey: ['my-posts', page],
    queryFn: () => getPost({ page, size: 20 }),
  });

  return (
    <div className="p-4 h-full flex justify-between flex-col overflow-hidden">
      <div className="h-full overflow-y-auto flex flex-col gap-4">
        <div className="flex justify-end w-full">
          <Link className="bg-blue-500 text-white border p-2 rounded-md" href="/new-post">
            Tạo bài mới
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {isFetching && <div className="w-full text-center">Đang tải</div>}
          {data && data.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </div>

      <PageSelector className="justify-end" defaultPage={1} maxPage={100} enabled={!isFetching} />
    </div>
  );
}
