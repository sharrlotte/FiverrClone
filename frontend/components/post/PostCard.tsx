import { Post } from '@/api/post.api';
import FavoriteButton from '@/components/post/FavoriteButton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  post: Post;
};

export default function PostCard({ post: { id, title, thumbnail, isFavorite } }: Props) {
  return (
    <Link className="space-y-2 relative" href={`/posts/${id}`}>
      <Image className="w-full object-cover rounded-lg overflow-hidden" width={300} height={200} src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <FavoriteButton postId={id} isFavorite={isFavorite} />
      <p></p>
    </Link>
  );
}
