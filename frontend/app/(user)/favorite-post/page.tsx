'use client';

import { getMyFavoritePost } from '@/api/post.api';
import PageSelector from '@/components/common/PageSelector';
import PostCard from '@/components/post/PostCard';
import { searchParamsSchema } from '@/schema/pagination.schema';
import { useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const params = useSearchParams();
  const page = searchParamsSchema.parse(Object.fromEntries(params)).page;

  const { data, isLoading } = useQuery({
    queryKey: ['my-favorite-posts', 'posts', page],
    queryFn: () => getMyFavoritePost({ page, size: 40 }),
  });

  return (
    <div className="p-4 h-full flex justify-between flex-col overflow-hidden">
      <div className="flex items-center ">
      <Heart className="h-5 w-5 text-red-500" />
      <span className="px-4 text-3xl font-bold">Yêu thích</span>
      <div className="flex-grow border-t border-muted"></div>
    </div>

      <div className="h-full overflow-y-auto flex flex-col gap-4">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-2">{data && data.map((post) => <PostCard key={post.id} post={post} />)}</div>
        {isLoading && <div className="w-full text-center">Đang tải</div>}
      </div>

      <PageSelector className="justify-end" defaultPage={1} maxPage={100} size={40} currentSize={data ? data.length : 0} enabled={!isLoading} />
    </div>
  );
}
