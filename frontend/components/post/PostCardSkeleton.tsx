import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { StarIcon } from 'lucide-react';
import React from 'react';

export default function PostCardSkeleton() {
  return (
    <div className="space-y-2 relative p-2">
      <Skeleton className="aspect-[3/2] w-full object-cover rounded-lg overflow-hidden" />
      <div className="space-y-2">
        <div>
          <div className="flex gap-2 items-end">
            <Avatar>
              <AvatarImage className="rounded-full h-10 w-10" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Skeleton className="w-32 h-6" />
          </div>
        </div>
        <h3 className="text-wrap overflow-hidden w-full text-ellipsis">
          <Skeleton className="w-40 h-6" />
        </h3>
        <div className="flex text-lg gap-1">
          <StarIcon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

type Props = {
  item: number;
};

export function PostCardSkeletonList({ item }: Props) {
  return new Array(item).fill(1).map((_, index) => <PostCardSkeleton key={index} />);
}
