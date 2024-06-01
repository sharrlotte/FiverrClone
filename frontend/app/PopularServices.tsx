'use client';

import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/api/post.api';
import PostCard from '@/components/post/PostCard';
import PostCardSkeleton from '@/components/post/PostCardSkeleton';

export default function PopularServices() {
  const { data, isLoading } = useQuery({
    queryKey: ['posts', 'popular-service', 0],
    queryFn: () => getPosts({ page: 1, size: 12, sort: 'favorites' }),
  });

  return (
    <main>
      <Carousel className="w-full">
        <CarouselContent className="relative">
          {isLoading
            ? new Array(12).fill(1).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5 sm:basis-1/2 hover:opacity-80">
                  <PostCardSkeleton />
                </CarouselItem>
              ))
            : data?.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/5 sm:basis-1/2 hover:opacity-80">
                  <PostCard post={post} />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
