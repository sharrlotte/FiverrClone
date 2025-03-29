'use client';

import { getMyPost } from '@/api/post.api';
import PageSelector from '@/components/common/PageSelector';
import PostCard from '@/components/post/PostCard';
import { searchParamsSchema } from '@/schema/pagination.schema';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const params = useSearchParams();
  const page = searchParamsSchema.parse(Object.fromEntries(params)).page;

  const { data, isLoading } = useQuery({
    queryKey: ['posts', 'my-posts', page],
    queryFn: () => getMyPost({ page, size: 40 }),
  });

  return (
    <div className="p-4 h-full flex justify-between flex-col overflow-hidden">
      <div className="h-full overflow-y-auto flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="text-3xl font-bold flex-nowrap text-nowrap text-end align-bottom">Bài đăng của bạn</span>
          <div className="flex-grow border-t border-muted"></div>
          <Link className="bg-blue-500 flex gap-1 justify-center items-center text-white border p-2 rounded-md" href="/new-post">
            <Plus className="size-7" strokeWidth={2} />
            Tạo bài mới
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-2">{data && data.map((post) => <PostCard key={post.id} post={post} />)}</div>
        {isLoading && <span className="w-full text-center">Đang tải</span>}
        {!isLoading && data && data.length === 0 && <span className="w-full text-center">Không có kết quả</span>}
      </div>
      <PageSelector className="justify-end" defaultPage={1} maxPage={100} size={40} currentSize={data ? data.length : 0} enabled={!isLoading} />
    </div>
  );
}
