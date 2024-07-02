'use client';

import React from 'react';
import { Carousel, CarouselAutoScroll, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/api/post.api';
import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';
import Link from 'next/link';

export default function PopularServices() {
  const { data, isPending } = useQuery({
    queryKey: ['posts', 'popular-service', 0],
    queryFn: () => getPosts({ page: 1, size: 12, sort: 'favorites' }),
  });

  return (
    <div>
      <Carousel className="w-full">
        <CarouselContent className="relative">
          {isPending
            ? new Array(12).fill(1).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 sm:basis-full hover:opacity-80">
                  <PostCardSkeleton />
                </CarouselItem>
              ))
            : data?.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3 sm:basis-full hover:opacity-80">
                  <PostCard post={post} />
                </CarouselItem>
              ))}
          <CarouselAutoScroll />
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Link className="w-full text-center flex justify-center" href="/posts?sort=popular">
        Xem thêm
      </Link>
    </div>
  );
}
