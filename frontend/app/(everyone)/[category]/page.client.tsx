'use client';

import { PostCategory } from '@/api/post-category.api';
import { getPosts } from '@/api/post.api';
import Loading from '@/app/loading';
import PageSelector from '@/components/common/PageSelector';
import PostCard from '@/components/post/PostCard';
import { searchParamsSchema } from '@/schema/pagination.schema';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {
  category: PostCategory;
};

export default function PageClient({ category: { id, name } }: Props) {
  const params = useSearchParams();
  const page = searchParamsSchema.parse(Object.fromEntries(params)).page;

  const { data, isPending, isError, error } = useQuery({ queryKey: ['posts', { id }], queryFn: () => getPosts({ categoryId: id, page, size: 20 }) });

  return (
    <div className="flex flex-col h-full justify-between overflow-hidden gap-2">
      <h2>{name}</h2>
      <div className="flex h-full overflow-y-auto">
        {isPending ? ( //
          <Loading className="m-auto" />
        ) : isError ? (
          <div className="m-auto">Lỗi {error.message}</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-2 lg:grid-cols-3 sm:grid-cols-1 h-fit xl:grid-cols-4"> {data?.map((item) => <PostCard key={item.id} post={item} />)}</div>
        )}
      </div>
      <PageSelector className="justify-end" defaultPage={1} maxPage={100} size={20} currentSize={data ? data.length : 0} enabled={!isPending} />
    </div>
  );
}
