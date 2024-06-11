import { Post } from '@/api/post.api';
import FavoriteButton from '@/components/post/FavoriteButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { calculateStar } from '@/lib/utils';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  post: Post;
};

export default function PostCard({ post: { id, title, isFavorite, user, starsCount, totalStars, images } }: Props) {
  return (
    <div className="flex flex-col gap-2 relative rounded-2xl overflow-hidden border shadow-md hover:shadow-xl m-2">
      <FavoriteButton postId={id} isFavorite={isFavorite} />
      <Image className="aspect-[3/2] w-full object-cover overflow-hidden" width={300} height={200} src={images[0]} alt={title} />
      <Link href={`/posts/${id}`} className="space-y-2 p-2">
        <div>
          <div className="flex gap-2 items-end">
            <Avatar>
              <AvatarImage className="rounded-full h-10 w-10" src={user.avatar + '.png'} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{user.username}</span>
          </div>
        </div>
        <h3 className="text-wrap overflow-hidden w-full text-ellipsis">{title}</h3>
        <div className="flex text-lg gap-1">
          <StarIcon className="w-6 h-6" />
          <span className="font-bold">{calculateStar(starsCount, totalStars)}</span>
          <span>({starsCount})</span>
        </div>
      </Link>
    </div>
  );
}
